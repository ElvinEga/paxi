import React, { Fragment, useEffect, useMemo, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Dialog, Disclosure, Transition } from '@headlessui/react';

import {
  useClosePollMutation,
  useGetPollListsQuery,
  useGetPollResponsesDetailsQuery,
} from '@/store/services/pollsApi';
import { toast } from 'react-toastify';
import { sendWebsocketMessage } from '@/helpers/websocket';
import { store } from '@/store';
import {
  DataMessage,
  DataMsgBodyType,
  DataMsgType,
} from '@/helpers/proto/plugnmeet_datamessage_pb';
import { ClosePollReq } from '@/helpers/proto/plugnmeet_polls_pb';
import { useTranslations } from 'next-intl';

interface IViewDetailsProps {
  onCloseViewDetails(): void;
  pollId: string;
}

const ViewDetails = ({ pollId, onCloseViewDetails }: IViewDetailsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const t = useTranslations('meet');
  const { post: poll } = useGetPollListsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      post: data?.polls.find((poll) => poll.id === pollId),
    }),
  });
  const { data: pollResponses } = useGetPollResponsesDetailsQuery(pollId);
  const [closePoll, { isLoading, data: closePollRes }] = useClosePollMutation();

  const respondents = useMemo(() => {
    const obj: Record<string, number[]> = {};
    if (
      pollResponses?.responses.all_respondents &&
      pollResponses?.responses.all_respondents !== ''
    ) {
      const respondents: Array<string> = JSON.parse(
        pollResponses?.responses.all_respondents
      );
      respondents.forEach((r) => {
        const data = r.split(':');
        if (typeof obj[data[1]] === 'undefined') {
          obj[data[1]] = [];
        }
        obj[data[1]].push(Number(data[2]));
      });
    }

    return obj;
  }, [pollResponses]);

  useEffect(() => {
    if (!isLoading && closePollRes) {
      if (closePollRes.status) {
        toast(t('polls.end-poll-success'), {
          type: 'info',
        });
      } else {
        //@ts-ignore
        toast(t(closePollRes.msg), {
          type: 'error',
        });
      }
    }
    //eslint-disable-next-line
  }, [isLoading, closePollRes]);

  const closeModal = () => {
    setIsOpen(false);
    onCloseViewDetails();
  };

  const endPoll = () => {
    closePoll(
      new ClosePollReq({
        pollId: pollId,
      })
    );
  };

  const getOptSelectedCount = (id: string | number) => {
    if (typeof pollResponses?.responses[id + '_count'] !== 'undefined') {
      return pollResponses?.responses[id + '_count'];
    } else {
      return 0;
    }
  };

  const getRespondentsById = (id: number) => {
    if (typeof respondents[id] !== 'undefined') {
      return respondents[id].map((r, i) => {
        return (
          <p
            className='mr-2 inline-block border-r border-solid border-black pr-2 leading-4 last:mr-0 last:border-none last:pr-0'
            key={i}
          >
            {r}
          </p>
        );
      });
    }

    return null;
  };

  const renderOptions = () => {
    return poll?.options.map((o) => {
      return (
        <div className='mb-1' key={o.id}>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className='flex w-full justify-between rounded-lg bg-secondaryColor px-4 py-2 text-left text-sm font-medium text-white outline-none transition ease-in hover:bg-primaryColor'>
                  <span>
                    {o.text} ({getOptSelectedCount(o.id)})
                  </span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={`${open ? 'rotate-180' : ''} size-5 text-white`}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </Disclosure.Button>
                <Disclosure.Panel className='px-4 py-2 text-sm text-gray-500 dark:text-darkText'>
                  {getRespondentsById(o.id)}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      );
    });
  };

  const publishPollResultByChat = () => {
    if (isLoading) {
      return;
    }
    const totalRes: any = pollResponses?.responses['total_resp'] ?? '0';
    const session = store.getState().session;
    const elm = ReactDOMServer.renderToString(
      <>
        <p>{poll?.question}</p>
        <p>
          {t('polls.total-responses', {
            count: totalRes,
          })}
        </p>
        {poll?.options.map((o) => {
          return <p key={o.id}>{`${o.text} (${getOptSelectedCount(o.id)})`}</p>;
        })}
      </>
    );

    const dataMsg = new DataMessage({
      type: DataMsgType.USER,
      roomSid: session.currentRoom.sid,
      roomId: session.currentRoom.room_id,
      body: {
        type: DataMsgBodyType.CHAT,
        from: {
          sid: session.currentUser?.sid ?? '',
          userId: session.currentUser?.userId ?? '',
          name: session.currentUser?.name,
        },
        msg: elm,
      },
    });

    sendWebsocketMessage(dataMsg.toBinary(), t);
    closeModal();
  };

  const renderModal = () => {
    return (
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 z-[9999] overflow-y-auto'
            onClose={() => false}
          >
            <div className='min-h-screen px-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
              </Transition.Child>

              <span
                className='inline-block h-screen align-middle'
                aria-hidden='true'
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <div className='my-8 inline-block w-full max-w-lg overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-darkPrimary'>
                  <button
                    className='close-btn absolute right-6 top-8 size-[25px] outline-none'
                    type='button'
                    onClick={() => closeModal()}
                  >
                    <span className='absolute left-0 top-0 inline-block h-[1px] w-[20px] rotate-45 bg-primaryColor dark:bg-darkText' />
                    <span className='absolute left-0 top-0 inline-block h-[1px] w-[20px] -rotate-45 bg-primaryColor dark:bg-darkText' />
                  </button>

                  <Dialog.Title
                    as='h3'
                    className='mb-2 text-left text-lg font-medium leading-6 text-gray-900 dark:text-white'
                  >
                    {t('polls.view-details-title')}
                  </Dialog.Title>
                  <hr />
                  <div className='mt-2'>
                    <div className='headline flex flex-wrap pb-5'>
                      <p className='mb-2 w-full border-b border-solid border-primaryColor/20 pb-1 text-lg font-bold capitalize text-black dark:border-darkText/20 dark:text-darkText'>
                        <span className='text-primaryColor dark:text-secondaryColor'>
                          Q:{' '}
                        </span>
                        {poll?.question}
                      </p>
                      <p className='w-full text-base dark:text-darkText'>
                        {t('polls.total-responses', {
                          count:
                            (pollResponses as any)?.responses['total_resp'] ??
                            0,
                        })}
                      </p>
                    </div>
                    <div className=''>
                      <p className='mb-2 block border-b border-solid border-primaryColor/20 pb-1 text-base text-black dark:border-darkText/20 dark:text-darkText'>
                        {t('polls.options')}
                      </p>
                      <div className='relative min-h-[75px]'>
                        {renderOptions()}
                        {isLoading ? (
                          <div className='loading absolute inset-x-0 top-1/2 z-[999] m-auto -translate-y-1/2 text-center'>
                            <div className='lds-ripple'>
                              <div className='border-secondaryColor' />
                              <div className='border-secondaryColor' />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className='pt-10 text-right'>
                      {poll?.isRunning ? (
                        <button
                          className='inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none'
                          onClick={endPoll}
                        >
                          {t('polls.end-poll')}
                        </button>
                      ) : (
                        <button
                          className='inline-flex justify-center rounded-md bg-primaryColor px-3 py-1 text-sm font-medium text-white hover:bg-secondaryColor focus:outline-none'
                          onClick={() => publishPollResultByChat()}
                        >
                          {t('polls.publish-result')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  };

  return <>{isOpen ? renderModal() : null}</>;
};

export default ViewDetails;

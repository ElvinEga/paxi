import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  useGetMyBreakoutRoomsQuery,
  useJoinRoomMutation,
} from '@/store/services/breakoutRoomApi';
import { store } from '@/store';
import Duration from '../list/room/duration';
import { JoinBreakoutRoomReq } from '@/helpers/proto/plugnmeet_breakout_room_pb';
import { useTranslations } from 'next-intl';

const MyBreakoutRooms = () => {
  const t = useTranslations('meet');
  const { data: myRooms, isLoading: isLoadingMyRooms } =
    useGetMyBreakoutRoomsQuery(undefined, {
      pollingInterval: 10000,
    });
  const [joinRoom, { isLoading, data }] = useJoinRoomMutation();
  const [token, setToken] = useState<string>('');
  const userId = store.getState().session.currentUser?.userId ?? '';

  useEffect(() => {
    if (!isLoading && data) {
      if (!data.status) {
        // @ts-ignore
        toast(t(data.msg), {
          type: 'error',
        });
        return;
      }
      setToken(data.token ?? '');
    }
    //eslint-disable-next-line
  }, [isLoading, data]);

  useEffect(() => {
    if (token !== '') {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('access_token', token);
      const url =
        location.protocol +
        '//' +
        location.host +
        window.location.pathname +
        '?' +
        searchParams.toString();

      window.open(url, '_blank');
    }
    //eslint-disable-next-line
  }, [token]);

  const join = () => {
    joinRoom(
      new JoinBreakoutRoomReq({
        breakoutRoomId: myRooms?.room?.id ?? '',
        userId: store.getState().session.currentUser?.userId ?? '',
      })
    );
  };

  const render = () => {
    if (!myRooms) {
      return null;
    }
    return (
      <div className='poll-item relative mb-4 overflow-hidden rounded-lg border border-solid border-primaryColor/70 px-2 py-8 transition ease-in hover:shadow-md dark:border-darkText/70'>
        <div className='poll-title text-md text-primaryColor dark:text-darkText'>
          {myRooms.room?.title}
        </div>
        <div className='total-vote absolute right-0 top-0 rounded-bl-lg bg-secondaryColor px-3 py-1 text-[10px] uppercase text-white'>
          <strong>{t('polls.total')}: </strong> {myRooms.room?.users.length}
        </div>

        {myRooms.room?.started ? (
          <div className='status absolute left-0 top-0 text-[10px] text-white'>
            <Duration
              duration={myRooms.room?.duration ?? 5}
              created={myRooms.room?.created ?? Date.now()}
            />
          </div>
        ) : (
          <div className='status absolute left-0 top-0 rounded-br-lg bg-secondaryColor px-3 py-1 text-[10px] uppercase text-white'>
            {t('breakout-room.not-started')}
          </div>
        )}

        <div className='btn'>
          <p className='absolute bottom-2 left-2 text-xs dark:text-secondaryColor'>
            {myRooms.room?.users.filter(
              (u) => u.joined === true && u.id === userId
            ).length
              ? t('breakout-room.user-joined')
              : t('breakout-room.not-joined')}
          </p>
          <button
            onClick={join}
            className='absolute bottom-0 right-0 rounded-tl-lg bg-primaryColor px-3 pb-[2px] pt-1 text-[10px] uppercase text-white transition ease-in hover:bg-secondaryColor'
            disabled={!!isLoading}
          >
            {t('breakout-room.join')}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`polls-list-wrapper scrollBar relative h-full overflow-auto px-2 pt-2 xl:pt-3`}
    >
      <div className='polls-list-wrap-inner'>
        {render()}
        {isLoadingMyRooms ? (
          <div className='loading absolute left-0 right-0 top-1/2 z-[999] m-auto -translate-y-1/2 text-center'>
            <div className='lds-ripple'>
              <div className='border-secondaryColor' />
              <div className='border-secondaryColor' />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MyBreakoutRooms;

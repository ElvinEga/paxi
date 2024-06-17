'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import CallModal2 from './call-modal2';
import { MdPhoneInTalk } from 'react-icons/md';
import { FaVideo, FaVideoSlash } from 'react-icons/fa';
import { HiOutlinePlus } from 'react-icons/hi';
import { MdCallEnd } from 'react-icons/md';
import { PiMicrophoneLight, PiMicrophoneSlash } from 'react-icons/pi';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Howl, Howler } from 'howler';

Howler.autoUnlock = true;

interface IceCandidate {
  candidate: string;
  sdpMid: string;
  sdpMLineIndex: number;
  usernameFragment: string;
}

interface SdpAnswerMessage {
  command: string;
  sessionA: string;
  sessionB: string;
  sdpAnswer: string;
  iceCandidates: IceCandidate[];
}

const PaxCallClient: React.FC = () => {
  const [session, setSession] = useState<string>('');
  const [sessionB, setSessionB] = useState<string>('');
  const [incomingCall, setIncomingCall] = useState<any>(null);
  const [peerConnection, setPeerConnection] =
    useState<RTCPeerConnection | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [callState, setCallState] = useState('calling');
  const [isMicrophone, setIsMicrophone] = useState(true);
  const [isWindowVisible, setIsWindowVisible] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const initWebSocket = async () => {
      const response = await fetch(
        'https://go.paxintrade.com/paxcall/create_session'
      );
      const data = await response.json();
      const session = data.session;
      setSession(session);

      ws.current = new WebSocket(
        `wss://go.paxintrade.com/paxcall/ws?paxcall_session=${session}`
      );
      ws.current.addEventListener('open', (event) => {
        console.log('WebSocket opened:', event);
      });

      ws.current.onmessage = (message) => {
        let msg;
        try {
          msg = JSON.parse(message.data);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          msg = message.data;
          return;
        }
        handleWebSocketMessage(msg);
      };
    };

    initWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);
  useEffect(() => {
    if (isWindowVisible && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [isWindowVisible]);

  const handleWebSocketMessage = (msg: any) => {
    switch (msg.command) {
      case 'coming_call':
        setIncomingCall(msg);
        break;
      case 'sdp_answer':
        handleSdpAnswer(msg);
        break;
      case 'ice_candidate':
        handleIceCandidate(msg);
        break;
      case 'start_video':
        handleStartVideo(msg);
        break;
      default:
        break;
    }
  };

  const handleStartVideo = async (msg: any) => {
    console.log('Handling SDP answer:', msg);

    if (peerConnection) {
      const sdpOffer = msg.sdpOffer;
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription({ sdp: sdpOffer, type: 'offer' })
      );

      // Создаем SDP Answer
      const sdpAnswer = await peerConnection.createAnswer();

      // Устанавливаем локальное описание
      await peerConnection.setLocalDescription(sdpAnswer);

      // Отправляем SDP Answer обратно отправителю
      const message = {
        command: 'video_answer',
        sessionA: session,
        sessionB: sessionB,
        sdpAnswer: sdpAnswer.sdp,
      };

      // Отправляем ответ через WebSocket
      sendMessage(message);
    }
  };

  const handleIncomingCall = async () => {
    if (!incomingCall) return;
    setSession(incomingCall.sessionA);
    setSessionB(incomingCall.sessionB);

    const pc = createPeerConnection();
    setPeerConnection(pc);

    const offer = new RTCSessionDescription({
      type: 'offer',
      sdp: incomingCall.sdpOffer,
    });
    await pc.setRemoteDescription(offer);

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    sendMessage({
      command: 'sdpAnswer',
      sessionA: incomingCall.sessionA,
      sessionB: incomingCall.sessionB,
      sdpAnswer: answer.sdp,
    });

    setIncomingCall(null); // Reset incoming call state
  };

  const handleSdpAnswer = async (msg: SdpAnswerMessage) => {
    console.log('Handling SDP answer:', msg);
    setCallState('closed');
    setIsWindowVisible(true);
    Howler.stop();
    if (peerConnection) {
      var stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      const answer = new RTCSessionDescription({
        type: 'answer',
        sdp: msg.sdpAnswer,
      });
      await peerConnection.setRemoteDescription(answer);

      msg.iceCandidates.forEach((candidate) => {
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      });
    }
  };

  const handleIceCandidate = (msg: any) => {
    console.log('Handling ICE candidate:', msg);
    if (peerConnection) {
      const candidate = new RTCIceCandidate(msg);
      peerConnection.addIceCandidate(candidate);
    }
  };

  const createPeerConnection = (): RTCPeerConnection => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    pc.onicecandidate = (event) => {
      console.log('Create candidate:', event);
      if (event.candidate) {
        sendMessage({
          command: 'ice_candidate',
          sessionA: session,
          sessionB: sessionB,
          iceCandidate: event.candidate.toJSON(),
        });
      }
    };

    pc.ontrack = (event) => {
      console.log('Received remote', event.streams);
      if (remoteVideoRef.current) {
        setRemoteStream(event.streams[0]);

        remoteVideoRef.current.srcObject = remoteStream;
      }
    };

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log('Got local stream:', stream);
        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
          // remoteVideoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing media devices.', error);
      });

    return pc;
  };

  const sendMessage = (msg: any) => {
    if (ws.current) {
      ws.current.send(JSON.stringify(msg));
    }
  };

  const startCall = async () => {
    const pc = createPeerConnection();
    setPeerConnection(pc);

    var stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });
    console.log('create Offer:', 'offer');

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    sendMessage({
      command: 'call',
      sessionA: session,
      sessionB: sessionB,
      sdpOffer: offer.sdp,
    });
  };

  const startVideoTransmission = async () => {
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
    try {
      if (peerConnection) {
        // Получаем медиа-устройства с видео
        const videoStream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: true,
        });

        // Получаем все локальные медиа-потоки
        // const senders = peerConnection.getSenders();

        // Заменяем старый медиа-поток на новый с видео
        videoStream.getTracks().forEach((newTrack) => {
          // const matchingSender = senders.find(
          //   (sender) => sender.track && sender.track.kind === newTrack.kind
          // );

          // if (matchingSender) {
          //   matchingSender.replaceTrack(newTrack);
          // } else {
          //   peerConnection.addTrack(newTrack, videoStream);
          // }
          peerConnection.addTrack(newTrack, videoStream);
        });

        // Создаем предложение для обновленных параметров медиа-потока
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        const message = {
          command: 'video_started',
          sessionA: session,
          sessionB: sessionB,
          sdpOffer: offer.sdp, // sdp SDP Offer
        };
        // Convert the message to JSON and send it over the WebSocket
        sendMessage(message);

        if (localVideoRef.current) {
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
              console.log('Got local stream:', stream);
              stream.getTracks().forEach((track) => {
                peerConnection.addTrack(track, stream);
              });
              if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = stream;
              }
            })
            .catch((error) => {
              console.error('Error accessing media devices.', error);
            });
        }
      }
    } catch (error) {
      console.error('Error enabling video');
    }
  };

  const endCall = () => {
    const message = {
      command: 'finish',
      sessionA: session,
      sessionB: sessionB,
    };
    sendMessage(JSON.stringify(message));
    sendMessage(JSON.stringify(message));
    setCallState('closed');
    setIsWindowVisible(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='rounded-full' size='icon'>
          <MdPhoneInTalk className='size-5' />
        </Button>
      </DialogTrigger>
      <DialogContent className='p-0 sm:max-w-7xl'>
        <div className='flex h-full flex-col'>
          <div>
            {!isWindowVisible && (
              <div className='flex items-center justify-center'>
                <p className='px-2'>Session : {session}</p>
                <input
                  className='p-2'
                  type='text'
                  placeholder='session B'
                  value={sessionB}
                  onChange={(e) => setSessionB(e.target.value)}
                />
                <CallModal2
                  handleIncomingCall={handleIncomingCall}
                  openDialog={false}
                  callState={callState}
                  callee={{
                    username: 'Session A',
                    avatar: '/public/avatar.png',
                    id: '1',
                  }}
                >
                  <Button onClick={startCall} className='mx-4'>
                    Call <MdPhoneInTalk className='ml-2 size-5' />
                  </Button>
                </CallModal2>
              </div>
            )}

            {incomingCall && (
              <CallModal2
                handleIncomingCall={handleIncomingCall}
                openDialog={true}
                callState='incoming'
                callee={{
                  username: 'Session A',
                  avatar: '/public/avatar.png',
                  id: '1',
                }}
              ></CallModal2>
            )}
          </div>
          {isWindowVisible && (
            <div className='flex flex-col'>
              <div className='flex flex-1 items-center justify-center p-4'>
                <div className=' mx-2 w-full overflow-hidden rounded-2xl shadow-lg '>
                  <div className='flex h-[500px]'>
                    <div className='flex flex-1 flex-col'>
                      <div className='relative flex-1 border'>
                        <video
                          className='h-full w-full object-cover'
                          ref={localVideoRef}
                          autoPlay
                          muted
                        />
                        <div className='absolute left-4 top-4 rounded-full bg-gray-800/50  px-3 py-1 text-sm text-white'>
                          Session A
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-1 flex-col border '>
                      <div className='relative flex-1'>
                        <video
                          className='h-full w-full object-cover'
                          ref={remoteVideoRef}
                          autoPlay
                        />
                        <div className='absolute left-4 top-4 rounded-full bg-gray-800/50 px-3 py-1 text-sm text-white'>
                          Session B
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2 flex w-full items-center justify-center gap-4 bg-secondary p-4 '>
                    <Button
                      variant='default'
                      size='icon'
                      className='size-10 rounded-full bg-green-500 hover:bg-green-500/70'
                      onClick={() => {
                        setIsVideoEnabled(!isVideoEnabled);
                        startVideoTransmission();
                      }}
                    >
                      {isVideoEnabled ? (
                        <FaVideo className='size-5' />
                      ) : (
                        <FaVideoSlash className='size-5' />
                      )}
                    </Button>
                    <Button
                      variant='default'
                      size='icon'
                      className='size-10 rounded-full bg-green-500 hover:bg-green-500/70'
                      onClick={() => setIsMicrophone(!isMicrophone)}
                    >
                      {isMicrophone ? (
                        <PiMicrophoneLight className='size-5' />
                      ) : (
                        <PiMicrophoneSlash className='size-5' />
                      )}
                    </Button>

                    <Button
                      variant='default'
                      size='icon'
                      className='size-10 rounded-full bg-red-500 hover:bg-red-500/70'
                      onClick={endCall}
                    >
                      <MdCallEnd className='size-5' />
                    </Button>
                    <Button
                      variant='default'
                      size='icon'
                      className='size-10 rounded-full bg-green-500 hover:bg-green-500/70'
                      // onClick={handleSubmit}
                    >
                      <HiOutlinePlus className='size-5' />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaxCallClient;

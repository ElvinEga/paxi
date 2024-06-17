'use client';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  LogOutIcon,
  MicIcon,
  MicOffIcon,
  MoveHorizontalIcon,
  PhoneIcon,
  RefreshCwIcon,
  SettingsIcon,
  ShareIcon,
  UserRoundX,
  VideoIcon,
} from 'lucide-react';
import peer from '@/lib/peer';
import { useSocket } from '@/provider/socketProvider';
import VideoPlayer from '@/components/common/videoPlayer';

const CallReceiver: React.FC = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isAudioMute, setIsAudioMute] = useState<boolean>(false);
  const [isVideoOnHold, setIsVideoOnHold] = useState<boolean>(false);
  const [callButton, setCallButton] = useState<boolean>(true);
  const [isSendButtonVisible, setIsSendButtonVisible] = useState<boolean>(true);

  const handleUserJoined = useCallback(
    ({ email, id }: { email: string; id: string }) => {
      setRemoteSocketId(id);
    },
    []
  );

  const handleIncomingCall = useCallback(
    async ({
      from,
      offer,
    }: {
      from: string;
      offer: RTCSessionDescriptionInit;
    }) => {
      if (socket) {
        setRemoteSocketId(from);
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setMyStream(stream);

        const ans = await peer.getAnswer(offer);
        socket.emit('call:accepted', { to: from, ans });
      }
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    if (myStream && peer.getPeer()) {
      for (const track of myStream.getTracks()) {
        peer.getPeer()!.addTrack(track, myStream);
      }
      setIsSendButtonVisible(false);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }: { from: string; ans: RTCSessionDescriptionInit }) => {
      if (peer.getPeer()) {
        peer.setLocalDescription(ans);
        sendStreams();
      }
    },
    [sendStreams]
  );

  const handleNegoNeededIncoming = useCallback(
    async ({
      from,
      offer,
    }: {
      from: string;
      offer: RTCSessionDescriptionInit;
    }) => {
      if (socket) {
        const ans = await peer.getAnswer(offer);
        socket.emit('peer:nego:done', { to: from, ans });
      }
    },
    [socket]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    if (socket && remoteSocketId) {
      socket.emit('peer:nego:needed', { offer, to: remoteSocketId });
    }
  }, [remoteSocketId, socket]);

  const handleNegoFinal = useCallback(
    async ({ ans }: { ans: RTCSessionDescriptionInit }) => {
      if (peer.getPeer()) {
        await peer.setLocalDescription(ans);
      }
    },
    []
  );

  useEffect(() => {
    if (peer.getPeer()) {
      peer.getPeer()!.addEventListener('negotiationneeded', handleNegoNeeded);

      return () => {
        peer
          .getPeer()!
          .removeEventListener('negotiationneeded', handleNegoNeeded);
      };
    }
  }, [handleNegoNeeded]);

  useEffect(() => {
    if (peer.getPeer()) {
      peer.getPeer()!.addEventListener('track', (ev: RTCTrackEvent) => {
        setRemoteStream(ev.streams[0]);
      });
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('user:joined', handleUserJoined);
      socket.on('incoming:call', handleIncomingCall);
      socket.on('call:accepted', handleCallAccepted);
      socket.on('peer:nego:needed', handleNegoNeededIncoming);
      socket.on('peer:nego:final', handleNegoFinal);

      return () => {
        socket.off('user:joined', handleUserJoined);
        socket.off('incoming:call', handleIncomingCall);
        socket.off('call:accepted', handleCallAccepted);
        socket.off('peer:nego:needed', handleNegoNeededIncoming);
        socket.off('peer:nego:final', handleNegoFinal);
      };
    }
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeededIncoming,
    handleNegoFinal,
  ]);

  useEffect(() => {
    if (socket) {
      socket.on('call:end', ({ from }: { from: string }) => {
        if (from === remoteSocketId && peer.getPeer()) {
          peer.getPeer()!.close();

          if (myStream) {
            myStream.getTracks().forEach((track) => track.stop());
            setMyStream(null);
          }

          setRemoteStream(null);
          setRemoteSocketId(null);
        }
      });

      return () => {
        socket.off('call:end');
      };
    }
  }, [remoteSocketId, myStream, socket]);

  useEffect(() => {
    if (socket) {
      socket.on('call:initiated', ({ from }: { from: string }) => {
        if (from === remoteSocketId) {
          setCallButton(false);
        }
      });

      return () => {
        socket.off('call:initiated');
      };
    }
  }, [socket, remoteSocketId]);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    if (isAudioMute) {
      stream.getAudioTracks().forEach((track) => (track.enabled = false));
    }

    if (isVideoOnHold) {
      stream.getVideoTracks().forEach((track) => (track.enabled = false));
    }

    const offer = await peer.getOffer();
    if (socket && remoteSocketId) {
      socket.emit('user:call', { to: remoteSocketId, offer });
      setMyStream(stream);
      setCallButton(false);
      socket.emit('call:initiated', { to: remoteSocketId });
    }
  }, [remoteSocketId, socket, isAudioMute, isVideoOnHold]);

  const handleToggleAudio = () => {
    peer.toggleAudio();
    setIsAudioMute(!isAudioMute);
  };

  const handleToggleVideo = () => {
    peer.toggleVideo();
    setIsVideoOnHold(!isVideoOnHold);
  };

  const handleEndCall = useCallback(() => {
    if (peer.getPeer()) {
      peer.getPeer()!.close();

      if (myStream) {
        myStream.getTracks().forEach((track) => track.stop());
        setMyStream(null);
      }

      setRemoteStream(null);

      if (socket && remoteSocketId) {
        socket.emit('call:end', { to: remoteSocketId });
      }
      setRemoteSocketId(null);
    }
  }, [myStream, remoteSocketId, socket]);

  const router = useRouter();

  return (
    <div className='flex h-screen w-full'>
      <div className='mx-auto grid h-[80vh] max-w-[1600px]  flex-1 grid-cols-8 gap-2 px-4'>
        <div className='col-span-6 mt-16 overflow-hidden rounded-xl bg-muted'>
            {myStream && (
                <VideoPlayer
                    stream={myStream}
                    name={'Remote Stream'}
                    isAudioMute={isAudioMute}
                />
            )}
          {remoteStream && (
            <VideoPlayer
              stream={remoteStream}
              name={'Remote Stream'}
              isAudioMute={isAudioMute}
            />
          )}
        </div>
        <div className='col-span-2 flex w-full flex-col gap-4 '>
          {myStream && (
            <VideoPlayer
              stream={myStream}
              name={'My Stream'}
              isAudioMute={isAudioMute}
            />
          )}
        </div>
      </div>
      <div className='flex w-72 flex-col bg-gray-950'>
        {remoteSocketId && (
          <div className='flex-1 space-y-4 overflow-y-auto p-4'>
            <div className='flex items-center gap-3'>
              <Avatar>
                <AvatarImage alt='John Doe' src='/placeholder-avatar.jpg' />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className='text-sm font-semibold text-white'>John Doe</div>
                <div className='text-sm text-gray-400'>Participant</div>
              </div>
              <div className='ml-auto flex items-center gap-2'>
                <Button
                  className='text-gray-400 hover:text-gray-50'
                  size='icon'
                  variant='ghost'
                >
                  <MicIcon className='h-5 w-5' />
                </Button>
                <Button
                  className='text-gray-400 hover:text-gray-50'
                  size='icon'
                  variant='ghost'
                >
                  <VideoIcon className='h-5 w-5' />
                </Button>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <Avatar>
                <AvatarImage alt='Jane Smith' src='/placeholder-avatar.jpg' />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div>
                <div className='text-sm font-semibold text-white'>
                  Jane Smith
                </div>
                <div className='text-sm text-gray-400'>Presenter</div>
              </div>
              <div className='ml-auto flex items-center gap-2'>
                <Button
                  className='text-gray-400 hover:text-gray-50'
                  size='icon'
                  variant='ghost'
                >
                  <MicOffIcon className='h-5 w-5' />
                </Button>
                <Button
                  className='text-gray-400 hover:text-gray-50'
                  size='icon'
                  variant='ghost'
                >
                  <ShareIcon className='h-5 w-5' />
                </Button>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <Avatar>
                <AvatarImage alt='Bob Johnson' src='/placeholder-avatar.jpg' />
                <AvatarFallback>BJ</AvatarFallback>
              </Avatar>
              <div>
                <div className='text-sm font-semibold text-white'>
                  Bob Johnson
                </div>
                <div className='text-sm text-gray-400'>Participant</div>
              </div>
              <div className='ml-auto flex items-center gap-2'>
                <Button
                  className='text-gray-400 hover:text-gray-50'
                  size='icon'
                  variant='ghost'
                >
                  <MicIcon className='h-5 w-5' />
                </Button>
                <Button
                  className='text-gray-400 hover:text-gray-50'
                  size='icon'
                  variant='ghost'
                >
                  <VideoIcon className='h-5 w-5' />
                </Button>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <Avatar>
                <AvatarImage alt='Sarah Lee' src='/placeholder-avatar.jpg' />
                <AvatarFallback>SL</AvatarFallback>
              </Avatar>
              <div>
                <div className='text-sm font-semibold text-white'>
                  Sarah Lee
                </div>
                <div className='text-sm text-gray-400'>Participant</div>
              </div>
              <div className='ml-auto flex items-center gap-2'>
                <Button
                  className='text-gray-400 hover:text-gray-50'
                  size='icon'
                  variant='ghost'
                >
                  <MicOffIcon className='h-5 w-5' />
                </Button>
                <Button
                  className='text-gray-400 hover:text-gray-50'
                  size='icon'
                  variant='ghost'
                >
                  <VideoIcon className='h-5 w-5' />
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className='flex-1 items-center justify-center space-y-4 p-4'>
          <h4 className='text-center  text-base font-bold text-gray-300'>
            {remoteSocketId ? 'Connected With Remote User!' : 'No One In Room'}
          </h4>
          {remoteStream && remoteSocketId && isSendButtonVisible && (
            <Button
              className='w-full rounded-full bg-blue-500 hover:bg-green-600'
              onClick={sendStreams}
            >
              <RefreshCwIcon className='mr-2 h-6 w-6' /> Connect
            </Button>
          )}
          {remoteSocketId && callButton && (
            <Button
              className=' w-full rounded-full bg-green-500 hover:bg-green-600'
              onClick={handleCallUser}
              style={{ display: !remoteStream ? 'flex' : 'none' }}
            >
              <PhoneIcon className='mr-2 h-6 w-6' /> Call
            </Button>
          )}
        </div>

        {/* {myStream && remoteStream && !isSendButtonVisible && (
          <div className='flex items-center justify-between bg-gray-800 p-4'>
            <CallHandleButtons
              isAudioMute={isAudioMute}
              isVideoOnHold={isVideoOnHold}
              onToggleAudio={handleToggleAudio}
              onToggleVideo={handleToggleVideo}
              onEndCall={handleEndCall}
            />
          </div>
        )} */}

        {!remoteStream && (
          <div className='flex items-center justify-between bg-gray-800 p-4'>
            <Button className='text-white' size='icon' variant='ghost'>
              <MicIcon className='h-6 w-6' />
            </Button>
            <Button className='text-white' size='icon' variant='ghost'>
              <VideoIcon className='h-6 w-6' />
            </Button>
            <Button className='text-white' size='icon' variant='ghost'>
              <ShareIcon className='h-6 w-6' />
            </Button>
            <Button className='text-white' size='icon' variant='ghost'>
              <MoveHorizontalIcon className='h-6 w-6' />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallReceiver;

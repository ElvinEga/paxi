'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useContext, useEffect, useState } from 'react';
import { FaPlus, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { HiOutlinePlus } from 'react-icons/hi';
import { MdCall, MdCallEnd } from 'react-icons/md';
import { PiMicrophoneLight, PiMicrophoneSlash } from 'react-icons/pi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Howl, Howler } from 'howler';
import { getInitials } from '@/lib/utils';

Howler.autoUnlock = true;

interface UserType {
  id: string;
  username: string;
  avatar: string;
}

interface CallModalProps {
  children?: React.ReactNode;
  callee: UserType;
  handleIncomingCall: () => void;
  openDialog: boolean;
  callState: string;
}

export default function CallModal2({
  children,
  callee,
  handleIncomingCall,
  openDialog = false,
  callState = 'calling',
}: CallModalProps) {
  const [open, setOpen] = useState(openDialog);
  const [isVideo, setIsVideo] = useState(true);
  const [isMicrophone, setIsMicrophone] = useState(true);

  const callSound = new Howl({
    src: ['/audio/call.mp3'],
    html5: true,
    loop: false,
    preload: true,
  });

  const incomingSound = new Howl({
    src: ['/audio/message-received.mp3'],
    html5: true,
    loop: true,
    preload: true,
  });

  const endSound = new Howl({
    src: ['/audio/end.mp3'],
    html5: true,
    loop: false,
    preload: true,
  });

  const busySound = new Howl({
    src: ['/audio/busy.mp3'],
    html5: true,
    loop: false,
    preload: true,
  });

  const onEndCall = () => {
    Howler.stop();

    endSound.play();
    setOpen(false);
  };
  const onAcceptCall = () => {
    Howler.stop();
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      if (callState === 'calling') {
        callSound.play();
      } else {
        incomingSound.play();
        callSound.stop();
      }
    } else {
      Howler.stop();
      callSound.stop();
      incomingSound.stop();
    }
  }, [open]);

  useEffect(() => {
    if (callState === 'closed') {
      Howler.stop();
      callSound.stop();
      incomingSound.stop();
      setOpen(false);
    }
  }, [callState]);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(true)}>
      <DialogTrigger asChild>
        {children ? children : <Button variant='outline'>Edit Profile</Button>}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <div className='my-8 flex justify-center gap-12'>
          <div className='relative flex flex-col items-center justify-center gap-2'>
            <div className='relative'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75 duration-1000'></span>
              <Avatar className='size-24'>
                <AvatarImage src={callee.avatar} alt={callee.username} />
                <AvatarFallback>{getInitials(callee.username)}</AvatarFallback>
              </Avatar>
            </div>
            <p className='line-clamp-1'>@{callee.username}</p>
          </div>
          <div className='flex flex-col items-center justify-center gap-2'>
            <Avatar className='size-24'>
              <AvatarImage src='' alt='Sesion B' />
              <AvatarFallback>{getInitials('Sesion B')}</AvatarFallback>
            </Avatar>
            <p className='line-clamp-1'>@Session B</p>
          </div>
        </div>
        <DialogFooter className='!flex-row !justify-center'>
          {/* <Button
            variant="default"
            size="icon"
            className="size-10 rounded-full bg-green-500 hover:bg-green-500/70"
            onClick={() => setIsVideo(!isVideo)}
          >
            {isVideo ? (
              <FaVideo className="size-5" />
            ) : (
              <FaVideoSlash className="size-5" />
            )}
          </Button>
          <Button
            variant="default"
            size="icon"
            className="size-10 rounded-full bg-green-500 hover:bg-green-500/70"
            onClick={() => setIsMicrophone(!isMicrophone)}
          >
            {isMicrophone ? (
              <PiMicrophoneLight className="size-5" />
            ) : (
              <PiMicrophoneSlash className="size-5" />
            )}
          </Button> */}

          {callState === 'incoming' && (
            <Button
              variant='default'
              size='icon'
              className='size-10 rounded-full bg-green-500 hover:bg-green-500/70'
              onClick={() => {
                handleIncomingCall();
                onAcceptCall();
              }}
            >
              <MdCall className='size-5' />
            </Button>
          )}

          <Button
            variant='default'
            size='icon'
            className='size-10 rounded-full bg-red-500 hover:bg-red-500/70'
            onClick={onEndCall}
          >
            <MdCallEnd className='size-5' />
          </Button>
          {/* <Button
            variant="default"
            size="icon"
            className="size-10 rounded-full bg-green-500 hover:bg-green-500/70"
            // onClick={handleSubmit}
          >
            <HiOutlinePlus className="size-5" />
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

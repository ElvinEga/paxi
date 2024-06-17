'use client'

import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<Socket | null>(null);

export const useSocket = (): Socket | null => {
  const socket = useContext(SocketContext);
  return socket;
};

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = useMemo(() => io('wss://go.paxintrade.com/paxcall/ws'), []);
  console.log('sdfsdfsdf', socket)
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;

import { createContext, useContext } from "react";

import React from "react";
import { Socket, io } from "socket.io-client";

interface ISocketContext {
  socket: Socket;
}

const SocketContext = createContext<ISocketContext>({} as ISocketContext);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  const socket = io("ws://localhost:3000", {
    transports: ["websocket"],
    reconnectionDelayMax: 10000,
    auth: {
      token,
    },
  });

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocket = () => useContext(SocketContext);

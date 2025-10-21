import type { ClientToServerEvents, ServerToClientEvents } from "@project/shared/events";
import { createContext, useState, useEffect, useContext } from "react";
import { io, type Socket } from "socket.io-client";

interface SocketContextValue {
	socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
}

const SokcetContext = createContext<SocketContextValue>({ socket: null });

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

	useEffect(() => {
		const s: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3000");
		setSocket(s);

		return () => {
			s.disconnect();
		}
	}, []);

	return <SokcetContext.Provider value={{ socket }}>{children}</SokcetContext.Provider>
}

export const useSocket = () => useContext(SokcetContext)
import { createContext, useState, useEffect, useContext } from "react";
import { io, type Socket } from "socket.io-client";

interface SocketContextValue {
	socket: Socket | null;
}

const SokcetContext = createContext<SocketContextValue>({ socket: null });

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const s = io("http://localhost:3000");
		setSocket(s);

		return () => {
			s.disconnect();
		}
	}, []);

	return <SokcetContext.Provider value={{ socket }}>{children}</SokcetContext.Provider>
}

export const useSocket = () => useContext(SokcetContext)
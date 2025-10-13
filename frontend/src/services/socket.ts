import { io, Socket } from "socket.io-client";

let socket: Socket;
export const connectSocket = () => {
	socket = io("http://localhost:3000");
	socket.on("connect", () => console.log("Connected", socket.id));
	socket.on("disconnect", () => console.log("Disconnected"));
	return socket;
}


export const disconnectSocket = () => {
	if (socket) {
		socket.disconnect();
		socket = undefined as unknown as Socket;
	}
}

export const getSocket = () => socket;
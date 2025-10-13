import { useSocket } from "../services/SocketContext";
import { EVENTS } from "@project/shared/events";

export function useLectureSocket() {
	const { socket } = useSocket();

	const createLecture = () => {
		socket?.emit(EVENTS.LECTURE.CREATE);
	}

	const onLectureCreated = (cb: (lectureId: string) => void) => {
		socket?.on(EVENTS.LECTURE.CREATED, (data: { lectureId: string }) => {
			cb(data.lectureId)
		})
	}

	return { createLecture, onLectureCreated };
}
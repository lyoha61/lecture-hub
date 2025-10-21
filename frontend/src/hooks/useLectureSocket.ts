import { useSocket } from "../services/SocketContext";
import { EVENTS } from "@project/shared/events";

export function useLectureSocket() {
	const { socket } = useSocket();

	const createLecture = () => {
		socket?.emit(EVENTS.LECTURE.CREATE);
	}

	const onLectureCreated = (cb: (lectureId: string) => void) => {
		socket?.on(EVENTS.LECTURE.CREATED, (data) => {
			cb(data.lectureId)
		})
	}

	const joinLecture = (lectureId: string) => {
		socket?.emit(EVENTS.LECTURE.JOIN, { lectureId }, (response) => {
			if (!response.success) alert(response.error ?? "Лекция не найдена")
		});
	}

	return { createLecture, onLectureCreated, joinLecture };
}
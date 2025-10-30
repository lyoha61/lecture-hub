import type { StudentJoinedCb, StudentsCallback } from "@project/shared/types";
import { useSocket } from "../services/SocketContext";
import { EVENTS } from '@project/shared/events';

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

	const connectedStudents = (lectureId: string, cb: StudentsCallback) => {
		socket?.emit(EVENTS.LECTURE.STUDENTS, { lectureId }, cb)
	}

	const onStudentJoined = ((cb: StudentJoinedCb) => {
		socket?.on(EVENTS.LECTURE.STUDENT_JOINED, (response) => {
			cb({ id: response.studentId });
		})
	})

	return { createLecture, onLectureCreated, joinLecture,  connectedStudents, onStudentJoined};
}
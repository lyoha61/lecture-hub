import { LectureEventData, Student, StudentJoinedData } from "./types";

export const EVENTS = {
	LECTURE: {
		CREATE: 'lecture:create',
		JOIN: 'lecture:join',
		CREATED: 'lecture:created',
		JOINED: 'lecture:joined',
		STUDENT_JOINED: 'lecture:student-joined',
		NOT_FOUND: 'lecture:not-found',
		STUDENTS: 'lecture:students',
	}
} as const;


export type ServerToClientEvents = {
	[EVENTS.LECTURE.CREATED]: (data: LectureEventData) => void;
	[EVENTS.LECTURE.NOT_FOUND]: (data: LectureEventData) => void;
	[EVENTS.LECTURE.STUDENTS]: (data: LectureEventData) => void;
	[EVENTS.LECTURE.STUDENT_JOINED]: (data: StudentJoinedData) => void;
}

export type ClientToServerEvents = {
	[EVENTS.LECTURE.CREATE]: () => void;
	[EVENTS.LECTURE.JOIN]: (
		data: { lectureId: string },
		callback: (response: { success: boolean, error?: string }) => void
	) => void;
	[EVENTS.LECTURE.STUDENTS]: (
		datа: { lectureId: string },
		callback: (response: { students: Student[] }) => void,
	) => void;
}

export type EventsArgs<T extends keyof ClientToServerEvents> = 
Parameters<ClientToServerEvents[T]>;
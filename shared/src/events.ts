export const EVENTS = {
	LECTURE: {
		CREATE: 'lecture:create',
		JOIN: 'lecture:join',
		CREATED: 'lecture:created',
		JOINED: 'lecture:joined',
		STUDENT_JOINED: 'lecture:student-joined',
		NOT_FOUND: 'lecture:not-found',
	}
} as const;


export type ServerToClientEvents = {
	[EVENTS.LECTURE.CREATED]: (data: { lectureId: string }) => void;
	[EVENTS.LECTURE.NOT_FOUND]: (data: { lectureId: string }) => void;
}

export type ClientToServerEvents = {
	[EVENTS.LECTURE.CREATE]: () => void;
	[EVENTS.LECTURE.JOIN]: (
		data: { lectureId: string },
		callback: (response: {success: boolean, error?: string}) => void
	) => void;
}
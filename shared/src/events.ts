export const EVENTS = {
	LECTURE: {
		CREATE: 'lecture:create',
		JOIN: 'lecture:join',
		CREATED: 'lecture:created',
		JOINED: 'lecture:joined'
	}
} as const;


export type ServerToClientEvents = {
	[EVENTS.LECTURE.CREATED]: (data: { lectureId: string }) => void;
}

export type ClientToServerEvents = {
	[EVENTS.LECTURE.CREATE]: () => void;
}
export interface LectureEventData {
  lectureId: string;
}

export interface JoinLectureResponse {
  success: boolean;
  error?: string;
}

export interface Student {
	id: string
}

export interface StudentsResponse {
  students: Student[];
}

export interface StudentJoinedData extends LectureEventData {
  studentId: string;
}

export type StudentsCallback = (response: StudentsResponse) => void;

export type StudentJoinedCb = (response: Student) => void;
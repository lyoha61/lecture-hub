import { Logger } from '@nestjs/common';
import {
  Ack,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { EVENTS } from '@project/shared/events';
import { randomBytes } from 'crypto';
import { TypedServer, TypedSocket } from './types/socket';
import {
  LectureEventData,
  Student,
  StudentsCallback,
} from '@project/shared/types';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    methods: '*',
  },
})
export class LectureGateway {
  @WebSocketServer()
  server: TypedServer;
  private readonly logger = new Logger(LectureGateway.name);

  private lectures = new Map<
    string,
    {
      lecturer: Socket;
      students: Socket[];
    }
  >();

  afterInit() {
    this.logger.log('WebSocket Server initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage(EVENTS.LECTURE.JOIN)
  handleMessage(client: Socket, payload: LectureEventData) {
    const lecture = this.lectures.get(payload.lectureId);
    if (!lecture) {
      this.logger.warn(`Lecture not found: ${payload.lectureId}`);
      return { success: false, error: 'Lecture not found' };
    }
    lecture.students.push(client);
    this.logger.log(`Student ${client.id} joined lecture ${payload.lectureId}`);

    void client.join(payload.lectureId);

    client.emit(EVENTS.LECTURE.JOINED, { lectureId: payload.lectureId });

    this.server.to(payload.lectureId).emit(EVENTS.LECTURE.STUDENT_JOINED, {
      studentId: client.id,
      lectureId: payload.lectureId,
    });
  }

  @SubscribeMessage(EVENTS.LECTURE.CREATE)
  handleCreateLecture(client: Socket): void {
    const lectureId = randomBytes(3).toString('hex').toUpperCase();
    this.lectures.set(lectureId, { lecturer: client, students: [] });

    void client.join(lectureId);
    this.logger.log(`Lecture created: ${lectureId}`);
    client.emit(EVENTS.LECTURE.CREATED, { lectureId });
  }

  @SubscribeMessage(EVENTS.LECTURE.STUDENTS)
  handleGetJoinedStudents(
    client: TypedSocket,
    @MessageBody() payload: LectureEventData,
    @Ack() callback: StudentsCallback,
  ) {
    const lecture = this.lectures.get(payload.lectureId);
    if (!lecture) {
      return callback({ students: [] });
    }
    const students: Student[] = lecture.students.map((socket: Socket) => ({
      id: socket.id,
    }));

    callback({ students: students });
  }
}

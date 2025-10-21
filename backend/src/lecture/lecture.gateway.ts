import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  EVENTS,
  ServerToClientEvents,
} from '@project/shared/events';
import { randomBytes } from 'crypto';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    methods: '*',
  },
})
export class LectureGateway {
  @WebSocketServer()
  server: Server<ClientToServerEvents, ServerToClientEvents>;
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
  handleMessage(client: Socket, payload: { lectureId: string }) {
    const lecture = this.lectures.get(payload.lectureId);
    if (!lecture) {
      this.logger.warn(`Lecture not found: ${payload.lectureId}`);
      return { success: false, error: 'Lecture not found' };
    }
    lecture.students.push(client);
    this.logger.log(`Student ${client.id} joined lecture ${payload.lectureId}`);

    client.emit(EVENTS.LECTURE.JOINED, { lectureId: payload.lectureId });
    lecture.lecturer.emit(EVENTS.LECTURE.STUDENT_JOINED, {
      studentId: client.id,
      lectureId: payload.lectureId,
    });
  }

  @SubscribeMessage(EVENTS.LECTURE.CREATE)
  handleCreateLecture(client: Socket): void {
    const lectureId = randomBytes(3).toString('hex').toUpperCase();
    this.lectures.set(lectureId, { lecturer: client, students: [] });

    this.logger.log(`Lecture created: ${lectureId}`);
    client.emit(EVENTS.LECTURE.CREATED, { lectureId });
  }
}

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
  handleMessage(client: Socket, payload: { lecture }): object {
    return { client, payload };
  }

  @SubscribeMessage(EVENTS.LECTURE.CREATE)
  handleCreateLecture(client: Socket): void {
    const lectureId = randomBytes(3).toString('hex').toUpperCase();
    this.lectures.set(lectureId, { lecturer: client, students: [] });

    this.logger.log(`Lecture created: ${lectureId}`);
    client.emit(EVENTS.LECTURE.CREATED, { lectureId });
  }
}

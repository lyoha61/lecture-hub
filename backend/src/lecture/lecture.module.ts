import { Module } from '@nestjs/common';
import { LectureController } from './lecture.controller';
import { LectureGateway } from './lecture.gateway';

@Module({
  controllers: [LectureController],
  providers: [LectureGateway],
})
export class LectureModule {}

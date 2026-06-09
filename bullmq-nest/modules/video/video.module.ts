import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VIdeoProcessor } from './video.worker';

@Module({
  imports: [],
  controllers: [VideoController],
  providers: [VIdeoProcessor],
  
})
export class VideoModule {}
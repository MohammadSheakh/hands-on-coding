import { Controller, Get, Post, Inject, Req, UseGuards } from '@nestjs/common';
import { VideoService } from './video.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Controller('video')
export class VideoController {
  constructor(
    @InjectQueue("video") private readonly videoQueue: Queue,

  ) { }


  @Post('process')
  async processVideo() {

    //.addBulk() and more method available 
    await this.videoQueue.add(
      "nameOfTheJob",
      { fileName: 'fileOne' },
      {
        // job options .. backoff means how long it should wait before each retry
        backoff: { type: "exponential", delay: 0 }

        
      },
      {
        // priority 0 means highest priority 
      }
    )

    return {
      message: 'video processing job added to queue',
    }
  }

  @Post('compress')
  async compressVideo() {
 
    await this.videoQueue.add(
      "compress",
      { fileName: 'fileOne' },
    )

    return {
      message: 'video compressing job added to queue !',
    }
  }


}
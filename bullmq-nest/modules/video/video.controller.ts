import { Controller, Get, Post, Inject, Req, UseGuards } from '@nestjs/common';
import { VideoService } from './video.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bullmq';
import {Queue} from 'bullmq';

@Controller('video')
export class VideoController {
  constructor(
    @InjectQueue("video") private readonly videoQueue : Queue,
    
  ) {}


  @Post('process')
  async processVideo() {

    await this.videoQueue.add(
      "nameOfTheJob", 
      { fileName : 'fileOne'},
      {
        // job options
        backoff : { type : "exponential", delay : 0 }
      }
    )

    return {
      message : 'video processing job added to queue',
    } 
  }


}
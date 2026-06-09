import { Controller, Get, Post, Inject, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './task.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Cron, CronExpression, Timeout, Interval } from '@nestjs/schedule';
import {CronJob} from 'cron';

@Controller('task')
export class TaskController {
  constructor(
    private readonly tasksService: TasksService,
    private schedulerRegistry : SchedulerRegistry
  ) {}


  // we can dynamically create cron job and control them

  @Get()
  someEndpoints() {
    const job = this.schedulerRegistry.getCronJob("backup-job") // addCronJob , addInterval, addTimeout // and more methods... 
    job.start; // we can start the job, stop this, resume this 
  }


  @Post('create-new-job')
  createNewJob(){
    const job = new CronJob(CronExpression.EVERY_10_HOURS,() => {
      console.log("Running backup job... ")
    })

    this.schedulerRegistry.addCronJob('new-job', job);

    job.start();

    return { message : 'Backup job created and started'};
  }

  @Post('pause-new-job')
  pauseNewJob(){
    const job = this.schedulerRegistry.getCronJob('new-job');
    job.stop();

    return { message : 'new job paused' };
  }
}
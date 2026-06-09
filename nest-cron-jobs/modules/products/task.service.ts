import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression, Timeout, Interval } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  

  // @Cron('* * * * * *')
  @Cron(CronExpression.EVERY_10_HOURS, {
    // here we can also pass some options 
    disabled : true, // we can set this options programatically) {}
    name : 'backup-job' // this name is helpful
    // also we can set timezones
  })
  async backup() {
    // error automatically handled by nest js .. we can use try catch to handle that also
    console.log("Starting Backup...")
  }


  // @Cron('* * * * * *')
  @Interval(10000) // rely on startup time of our server
  async sendMails() {
    console.log("Starting Backup...")
  }

  @Timeout(5000) // its not recurring .. 
  async clearTokens() {
    console.log("Clearing Tokens...")
  }
}
import {ScheduleModule} from '@nestjs/schedule';

@Module({
    imports : [ ScheduleModule.forRoot({
        cronJobs : false,
        intervals: false,
        timeouts : true // by defaule all true .. we can  control which one should be turned off
    })]
})
export class AppModule{}
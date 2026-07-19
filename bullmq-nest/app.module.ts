import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bullmq';

/**
 * install bullmq
 * register bull module and specify redis server credentials
 * register a bull queue
 * send jobs to the queue
 */


@Module({
    imports : [
        // register a bull module
        BullModule.forRoot({
            connection : { 
                host: "localhost",
                port : 6379
            },
            defaultJobOption : { 
                attempts : 3,
                removeOnComplete : 1000, // keep 1000 job
                removeOnFail : 3000, // for logging
                backoff : 2000, // job is wait at least 2 seconds before being processed 
            }
        }),
        // register a bull queue
        BullModule.registerQueue(
            { name : 'video' },
            { name : 'email'}
        )
    ],

})
export class AppModule{}
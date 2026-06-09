import { Processor, OnWorkerEvent, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor("video", 
    // { concurrency  : 3 }
    { limiter : { duration : 10000, max: 20 }}
)
export class VIdeoProcessor extends WorkerHost {
    async process(job: Job){
        // task processing logic here 
        const totalSteps = 5;
        for(let step = 1; step <= totalSteps; step ++){
            // simulate work

            // calculate progress as a percentage
            const progress = Math.round((step / totalSteps) * 100);

            // update job progress
            await job.updateProgress(progress);
        }
    }

    @OnWorkerEvent("progress")
    onProgress(job: Job){
        console.log('progress : ', job.progress, "% complete")
    }

    @OnWorkerEvent("active")
    onAdded(job: Job){
        console.log('got a new job', job.id)
    }

    @OnWorkerEvent("completed")
    onCompleted(job: Job){
        console.log('complete job', job.id)
    }

    @OnWorkerEvent("failed")
    onFailed(job: Job){
        console.log('failed job', job.id)
        console.log(`Attempt Number : ${job.attemptsMade}`)
    }
}
import { ThrotollerModule, ThrotollerGuard } from '@nestjs/throtoller'
import { APP_GUARD } from '@nestjs/core'

@module({
    imports: [ThrotollerModule.forRoot({
        // every client can send 4 request in the time frame of 10 sec
        throttlers: [{
            limit: 4,
            ttl: 10 * 1000,
            blockDuration: 1 * 1000,
            // everytime you get blocked, you get unblocked after 1 second
            // if you not mention blockDuration, ttl will be blockDuration
        }],
        errorMessage : 'Wow ! Slow Down.. '
    })],

    // now we need to register this throtoller globally
    providers: [{
        provide: APP_GUARD,
        useClass: ThrotollerGuard,
    }]
})
export class AppModule { }
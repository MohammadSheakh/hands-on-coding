import { SkipThrottle } from '@nestjs/throttler'

@Controller()
export class AppController {
    contructor(private readonly appService: AppService) { }

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }

    @SkipThrottle()
    @Get("hi")
    getHi(): string {
        return this.appService.getHello()
    }

    @Throttle({ default: { limit: 1, ttl: 1 * 1000 } })
    @Get("hi/v2")
    getHi(): string {
        return this.appService.getHello()
    }
}
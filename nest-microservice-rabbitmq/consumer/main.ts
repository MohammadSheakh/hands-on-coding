import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservice";

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // now we need to make our app as a rabbitmq server 
    // by using createMicroservice
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: 'orders-queue'
        }
    })

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.RMQ,
            options : {
                urls: ['amqp://localhost:5672'],
                queue: 'orders-queue'
            }
        }
    )
}

bootstrap();    
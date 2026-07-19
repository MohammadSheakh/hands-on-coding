import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        //
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'logs-service',
                brokers: ['localhost:9092'],
            },
            consumer: {
                // this is so important .. by this .. this instance 
                // join this specific logs-consumer-server group
                // so.. groupId will be logs-consumer-server 
                groupId: 'logs-consumer',
                allowAutoTopicCreation: true, // ☑️important 
            }
        }
    });
    await app.listen();
}

bootstrap();
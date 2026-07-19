import { ClientsModule, Transport } from '@nestjs/microservices'
import { Module } from '@nestjs/common';


@Module({
    imports: [

        /**
         *  to send messages to kafka .. we need this ClientModule
         *  KAFKA_CLIENT this is injection token that we can use to get access to this client
         *  so that we can produce messages 
         */
        ClientsModule.register({
            name: 'KAFKA_CLIENT',
            transport: Transport.KAFKA,
            options: {
                client: {
                    brokers: ['localhost:9092'],
                    clientId: 'orderms',
                },
                producer: {
                    allowAutoTopicCreation: true,
                },
                producerOnlyMode: true,
                /**
                 * if we comment "producerOnlyMode : true," this line
                 * then we will gonna implement request reply pattern 
                 */

                consumer: {
                    groupId: 'order-consumer',

                    // karon logs microservice er 
                    // message pattern er jonno eita lagbe ..

                    // logs microservice jeta reply produce korle
                    // shetar consumer hobe hocche ei order-microService

                }
            }
        })
    ],
})
export class AppModule { }
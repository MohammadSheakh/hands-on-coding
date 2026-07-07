import { ClientsModule, Transport } from '@nestjs/microservices'
import { Module } from '@nestjs/common';


@Module({
    imports : [

        /**
         *  to send messages to kafka .. we need this ClientModule
         *  KAFKA_CLIENT this is injection token that we can use to get access to this client
         *  so that we can produce messages 
         */
        ClientsModule.register({
            name : 'KAFKA_CLIENT',
            transport : Transport.KAFKA,
            options: {
                client : {
                    brokers : [ 'localhost:9092' ],
                    clientId : 'orderms',
                },
                producer : {
                    allowAutoTopicCreation : true,
                },
                producerOnlyMode : true,
            }
        })    
    ],
})
export class AppModule{}
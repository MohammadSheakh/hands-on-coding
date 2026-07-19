// we need to create rabbitmq client instance 

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports : [
        ClientsModule.register([
            {
                name : 'ORDERS_SERVICE', // we should give our client a name, it can be anything .. injectionToken name 
                transport: Transport.RMQ,
                options : {
                    url : ['amqp://localhost:5672'],
                    queue : 'orders-queue' // we are going to produce message to these queue name 
                }
            }
        ])
    ],
    controllers : [],
    providers : [],
})
export class OrderModule {}
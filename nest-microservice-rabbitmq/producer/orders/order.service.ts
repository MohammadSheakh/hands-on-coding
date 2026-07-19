import { Injectable, Inject } from '@nestjs/common';
import { OrderDto } from './order.dto';
import { ClientProxy } from '@nestjs/microservice'
import { timeout } from 'rxjs';
   

@Injectable()
export class OrderService {

    constructor(
        @Inject("ORDERS_SERVICE") private rabbitClient: ClientProxy
    ) { }

    placeOrder(order: OrderDto) {
        /**
         * every single time, an order is placed.. we need to send a message to
         * rabbitmq .. about this event happening .. so that .. other microservice
         * can consume this event .. 
         */

        this.rabbitClient.emit("order-placed", order)

        return { message: "order placed " }
    }


    // --- RPC .. 
    // request reply pattern 
    getOrders() {
        // we send a message to rabbit mq, so that 
        // we can fetch those order from actual 
        // consumer 

        return this.rabbitClient.send({
            cmd : 'fetch-orders'
        }, {}).pipe(timeout(5000)) // we send empty object as payload 
    }
}

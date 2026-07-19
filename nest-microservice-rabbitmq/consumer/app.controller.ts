// next step is register the event handler  
import {MessagePattern, EventPattern, Payload } from '@nestjs/microservice'
import { Controller } from '@nestjs/common'
import { OrderDto } from './order.dto';

@Controller
export class AppController {
    constructor(private readonly appService: AppService) { }

    @EventPattern("order-placed")
    handleOrderPlaced(@Payload() order: OrderDto) {
        return this.appService.handleOrderPlaced(order);
    }


    // for RPC
    // requst reply pattern

    @MessagePattern({cmd: 'fetch-orders'})
    getOrders() {
        return this.appService.getOrders();
    }


}
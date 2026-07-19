import { Injectable, Inject } from '@nestjs/common';
import { OrderDto } from './order.dto';

@Injectable()
export class AppService {
    orders  :OrderDto[] = []
    constructor() { }

    handleOrderPlaced(order: OrderDto) {
        this.orders.push(order);
        console.log("received a new order : ",order);
    }


    getOrders(){
        return this.orders;
    }
}

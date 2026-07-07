import { Inject, Injectable } from '@nestjs/common';
import { OrderDto } from './dtos/order.dto';
import { ClientKafkaProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  constructor(
    @Inject('KAFKA_CLIENT') private kafkaClient: ClientKafkaProxy
  ) {} 

  async createOrder(order : OrderDto){
    console.log(order);

    // domain.action
    this.kafkaClient.emit('order.created', order) // Message : value, key, headers

    return { message : 'Order created !'};
  }
}
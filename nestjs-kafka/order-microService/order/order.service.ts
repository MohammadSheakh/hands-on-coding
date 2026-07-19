import { Inject, Injectable } from '@nestjs/common';
import { OrderDto } from './dtos/order.dto';
import { ClientKafkaProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  constructor(
    @Inject('KAFKA_CLIENT') private kafkaClient: ClientKafkaProxy
  ) { }

  onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('order.get-logs')
    // automatically nest.js takes this name and append
    // .reply to this 
  }

  async createOrder(order: OrderDto) {
    console.log(order);

    // domain.action
    this.kafkaClient.emit('order.created', order) // Message : value, key, headers
    // here order.created is topic name 

    this.kafkaClient.emit('order.created', {
      key: order.id, // key is important .. because it tracks order of event
      value: order,
      headers: { someHeader: 'HI' },
    })

    return { message: 'Order created !' };
  }

  async getOrderLogs() {

    // when ever we reply back .. we use .. .send
    this.kafkaClient.send('order.get-logs', { id: 1 })
  }
}
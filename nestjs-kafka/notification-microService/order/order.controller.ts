import { Controller, Get, Post, Inject, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './order.service';
import { OrderDto } from './dtos/order.dto';


@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) {}


  @Post()
  async createOrder(@Body() order: OrderDto) {
    return this.orderService.createOrder(order);
  }


}
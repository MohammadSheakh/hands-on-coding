import { Controller } from '@nestjs/common';
import { EventPattern, Payload, KafkaContext, Ctx } from '@nestjs/microservices';


@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notifictaionService: NotificationService,
  ) { }

  @EventPattern('order.created')
  async handleOrderCreation(@Payload() order: any, @Ctx() context: KafkaContext) {
    console.log("order")

    console.log("Original kafka message", context.getMessage());

    console.log(`key: ${context.getMessage().key}`)
    console.log(`value: ${context.getMessage().value}`)
    console.log(`timestamp: ${context.getMessage().timestamp}`)
    console.log(`offset: ${context.getMessage().offset}`)
    console.log(`headers: ${context.getMessage().headers}`)
    console.log(`partition: ${context.getPartition()}`)
    console.log(`topic: ${context.getTopic()}`)
    console.log(`consumer: ${context.getConsumer()}`)
    

  }
}

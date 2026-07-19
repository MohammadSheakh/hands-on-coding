import { Controller } from '@nestjs/common';
import { EventPattern, Payload, KafkaContext, Ctx } from '@nestjs/microservices';


@Controller('notification')
export class LogsController {
  constructor(
    
  ) { }

  @EventPattern('order.created')
  async handleOrderCreation(@Payload() order: any, @Ctx() context: KafkaContext) {
    console.log("order")

  }

  @MessagePattern('order.get-logs')
  getOrderLogs(){
    return [
        {
            type: '',
            message : "",
            details: "",
            timestamp : ""
        }
    ]
  }
}

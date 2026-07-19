import { Controller, Get, Req } from '@nestjs/common';
import { Request, Response } from 'express';
// import { PaymentsService } from 'src/payment/services/payment/payments.service';

@Controller('payments')
export class PaymentsController {
    // constructor(private readonly paymentsService: PaymentsService) {}

    @Get()
    getPayments(@Req() req: Request, @Res() res: Response) {
        const { count, page } = req.query;
        if (!count && !page) {
            res.status(400).send({ message: 'Count and page are required' });
            return;
        }else{
            res.send(200)
        }
        return this.paymentsService.findAll();
    }
}

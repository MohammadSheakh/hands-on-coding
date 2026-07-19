import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from 'src/payment/services/payment/payments.service';
import { Request, Response } from 'express';

describe('PaymentsController', () => {
    let controller: PaymentsController;
    let service: PaymentsService;

    let requestMock = {
        query: {}
    } as unknown as Request

    let responseMock = {
        status: jest.fn((x) => ({
            send: jest.fn((y) => y)
        })),
        send: jest.fn(),
    } as unknown as Response

    let statusResponseMock = {
        send: jest.fn((x) => x)
    }
    let responseMockModified = {
        status: jest.fn((x) => statusResponseMock),
        send: jest.fn(),
    } as unknown as Response

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PaymentsController],
            providers: [PaymentsService],
        }).compile();

        controller = module.get<PaymentsController>(PaymentsController);
        service = module.get<PaymentsService>(PaymentsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });



    describe("getPayment", () => {
        // this block can have 
        // all of our test cases
        it("should return a status of 400", () => {
            controller.getPayments(requestMock, responseMock)
            expect(responseMock.status).toHaveBeenCalledWith(400)
            expect(responseMockModified.send).toHaveBeenCalledWith({ message: 'Count and page are required' })
        })


        it("should return a status of 200 when query params are present", () => {
            requestMock.query = {
                count: '10',
                page: '1'
            } as unknown as Query
            controller.getPayments(requestMock, responseMock)
            expect(responseMock.status).toHaveBeenCalledWith(200)
            expect(responseMock.send).toHaveBeenCalledWith({ message: 'Payments fetched successfully' })
        })
    })
});
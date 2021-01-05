import { Resolver } from '@nestjs/graphql';
import { PaymentService } from './payments.service';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}
}

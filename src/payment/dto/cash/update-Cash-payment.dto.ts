import { UpdatePaymentDto } from '../update-base-payment.dto';

export class UpdateCashPaymentDto extends UpdatePaymentDto {
  branch?: string;
}

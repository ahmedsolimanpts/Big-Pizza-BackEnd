import { UpdatePaymentDto } from '../update-base-payment.dto';

export class UpdatePayPalPaymentDto extends UpdatePaymentDto {
  payment_id?: string;
}

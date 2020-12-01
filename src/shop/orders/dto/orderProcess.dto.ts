import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { OrderPaymentInfoDto} from './orderPaymentInfo.dto';

export class OrderProcessDto {
  @ApiModelProperty()
  @ValidateNested({ each: true })
  @Type(() => OrderPaymentInfoDto)
  readonly paymentInfo: OrderPaymentInfoDto; // TODO: change to strict rules when we know the object structure
}

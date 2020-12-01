import { ApiModelProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { EOrderStatuses } from '../enums/orderStatuses.enum';

export class OrderPaymentInfoDto {
  @ApiModelProperty()
  @IsEnum(Object.values(EOrderStatuses))
  readonly status: EOrderStatuses;

  @ApiModelProperty()
  @IsOptional()
  readonly transactionReceipt?: object;
}

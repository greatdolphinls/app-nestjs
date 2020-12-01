import { IsString, IsNumber, IsEnum, IsMongoId } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

import { EOrderStatuses } from '../enums/orderStatuses.enum';
import { EOrderCurrency } from '../enums/orderCurrency.enum';
import { EOrderTypes } from '../enums/orderTypes.enum';
export class OrderDto {
  @ApiModelProperty()
  @IsString()
  @IsMongoId()
  readonly _product: string;

  @IsMongoId()
  @IsString()
  _createdBy?: string;

  @IsNumber()
  totalPrice?: number;

  @IsEnum(Object.values(EOrderCurrency))
  currency?: EOrderCurrency;

  @IsEnum(Object.values(EOrderStatuses))
  status?: EOrderStatuses;

  @IsEnum(Object.values(EOrderTypes))
  type?: EOrderTypes;

  @IsNumber()
  value?: number;

  @IsMongoId()
  @IsString()
  _skin?: string;
}

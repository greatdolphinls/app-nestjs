import { IsString, IsNumber, IsEnum, IsOptional, IsInt, Min, ValidateIf, IsNotEmpty, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

import { ProductCoverImage } from './productCoverImage.dto';
import { EProductTypes } from '../enums/productTypes.enum';
import { EProductCurrency } from '../enums/productCurrency.enum';

export class ProductDto {
  @ApiModelProperty()
  @IsString()
  readonly name: string;

  @ApiModelProperty()
  @IsString()
  @ValidateIf(obj => obj.type === EProductCurrency.EURO)
  readonly inAppPurshaseId: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @ValidateIf(obj => obj.type !== EProductTypes.REWARD)
  @IsNumber()
  @Min(0)
  readonly price: number;

  @ApiModelProperty()
  @IsNotEmpty()
  @ValidateIf(obj => obj.type !== EProductTypes.REWARD)
  @IsString()
  @IsEnum(Object.values(EProductCurrency))
  readonly currency: EProductCurrency;

  @ApiModelProperty()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => ProductCoverImage)
  readonly coverImage?: ProductCoverImage;

  @ApiModelProperty()
  @IsString()
  @IsEnum(Object.values(EProductTypes))
  readonly type: EProductTypes;

  @ApiModelProperty()
  @ValidateIf(obj => obj.type === EProductTypes.LAN || obj.type === EProductTypes.REWARD)
  @IsInt()
  readonly value: number;

  @ApiModelProperty()
  @ValidateIf(obj => obj.type === EProductTypes.SKIN)
  @IsMongoId()
  readonly _skin: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  readonly description?: string;
}

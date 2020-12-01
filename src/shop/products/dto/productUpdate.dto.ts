import { IsString, IsNumber, IsEnum, IsOptional, Min,  ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

import { ProductCoverImage } from './productCoverImage.dto';
import { EProductCurrency } from '../enums/productCurrency.enum';

export class ProductUpdateDto {
  @ApiModelProperty()
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  readonly inAppPurshaseId?: string;

  @ApiModelProperty()
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly price?: number;

  @ApiModelProperty()
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly value?: number;

  @ApiModelProperty()
  @IsOptional()
  @IsMongoId()
  readonly _skin: string;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  @IsEnum(Object.values(EProductCurrency))
  readonly currency?: EProductCurrency;

  @ApiModelProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiModelProperty()
  @Type(() => ProductCoverImage)
  readonly coverImage?: ProductCoverImage;

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  readonly description?: string;
}

import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

import { EProductTypes } from '../enums/productTypes.enum';

export class FindProductDto {
  @IsString()
  @IsOptional()
  @ApiModelProperty({ required: false })
  readonly name?: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty({ required: false })
  readonly inAppPurshaseId?: string;

  @IsString()
  @IsEnum(Object.values(EProductTypes))
  @IsOptional()
  @ApiModelProperty({ required: false })
  readonly type: EProductTypes;
}

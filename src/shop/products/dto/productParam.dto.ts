import { IsString, IsMongoId } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ProductParamDto {
  @ApiModelProperty()
  @IsString()
  @IsMongoId()
  readonly productId: string;
}

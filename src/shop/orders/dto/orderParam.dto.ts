import { IsString, IsMongoId } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class OrderParamDto {
  @ApiModelProperty()
  @IsString()
  @IsMongoId()
  readonly orderId: string;
}

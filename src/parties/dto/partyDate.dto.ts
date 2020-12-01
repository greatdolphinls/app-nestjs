import { IsNumber, Min } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class PartyDateDto {
  @ApiModelProperty()
  @IsNumber()
  readonly start: number;

  @ApiModelProperty()
  @IsNumber()
  @Min(1)
  readonly duration: number;
}

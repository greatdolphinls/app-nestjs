import { IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class FindGameDto {
  @IsString()
  @IsOptional()
  @ApiModelProperty({ required: false })
  readonly name?: string;
}

import { IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class PartyLocationDto {
  @ApiModelProperty({ description: 'Array of coordinates: [lon, lat]', required: true })
  @IsArray()
  readonly coordinates: number[];
}

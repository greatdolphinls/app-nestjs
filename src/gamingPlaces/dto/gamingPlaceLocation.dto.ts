import { IsArray } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class GamingPlaceLocationDto {
  @IsArray()
  @ApiModelProperty({ description: 'Array of coordinates: [lon, lat]', required: false })
  readonly coordinates: number[];
}

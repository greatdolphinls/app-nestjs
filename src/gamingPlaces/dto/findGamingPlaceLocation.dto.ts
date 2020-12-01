import { IsNumber, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class FindGamingPlaceLocationDto {
  @IsOptional()
  @IsNumber()
  @ApiModelProperty({ required: false })
  readonly lon: number;

  @IsOptional()
  @IsNumber()
  @ApiModelProperty({ required: false })
  readonly lat: number;

  @IsOptional()
  @IsNumber()
  @ApiModelProperty({ required: false })
  readonly radius: number;
}

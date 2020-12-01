import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GamingPlaceCoverImage {
  @IsString()
  @ApiModelProperty()
  readonly original: string;

  @IsString()
  @ApiModelProperty()
  readonly thumbnail: string;
}

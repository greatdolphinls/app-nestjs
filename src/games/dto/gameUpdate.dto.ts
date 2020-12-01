import { IsString, ValidateNested, IsOptional, ArrayUnique, IsMongoId } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { CoverImage } from './gameCoverImage.dto';

export class GameUpdateDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty({ required: false })
  readonly name: string;

  @IsOptional()
  @ArrayUnique()
  @IsMongoId({
    each: true,
  })
  @ApiModelProperty({ required: false })
  readonly consoleList: string[];

  @IsOptional()
  @ValidateNested({ each: true })
  @ApiModelProperty({ required: false })
  @Type(() => CoverImage)
  readonly coverImage: CoverImage;
}

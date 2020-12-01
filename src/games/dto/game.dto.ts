import { IsString, ValidateNested, IsArray, IsMongoId, ArrayUnique } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CoverImage } from './gameCoverImage.dto';

export class GameDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @IsArray()
  @ArrayUnique()
  @IsMongoId({
    each: true,
  })
  @ApiModelProperty()
  readonly consoleList: string[];

  @ValidateNested({ each: true })
  @ApiModelProperty()
  @Type(() => CoverImage)
  readonly coverImage: CoverImage;
}

import { IsString, IsOptional, ValidateNested, IsEnum } from 'class-validator';
import { ApiModelProperty  } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { FindGamingPlaceLocationDto } from './findGamingPlaceLocation.dto';
import { EGamingPlaceTypes } from '../enums/gamingPlaceTypes.enum';

export class FindGamingPlaceDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty({ required: false })
  readonly name?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @ApiModelProperty({ required: false })
  @Type(() => FindGamingPlaceLocationDto)
  readonly location?: FindGamingPlaceLocationDto;

  @IsOptional()
  @ApiModelProperty()
  @IsEnum(Object.values(EGamingPlaceTypes))
  readonly type?: EGamingPlaceTypes;
}

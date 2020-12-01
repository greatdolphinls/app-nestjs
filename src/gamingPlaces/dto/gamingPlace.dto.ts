import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { GamingPlaceAddressDto } from './gamingPlaceAddress.dto';
import { GamingPlaceLocationDto } from './gamingPlaceLocation.dto';
import { GamingPlaceCoverImage } from './gamingPlaceCoverImage.dto';
import { GamingPlaceScheduleDto } from './gamingPlaceSchedule.dto';
import { EGamingPlaceTypes } from '../enums/gamingPlaceTypes.enum';

export class GamingPlaceDto {
  @IsString()
  @ApiModelProperty()
  readonly name?: string;

  @IsString()
  @ApiModelProperty()
  readonly phone?: string;

  @ValidateNested({ each: true })
  @ApiModelProperty()
  @Type(() => GamingPlaceCoverImage)
  readonly coverImage?: GamingPlaceCoverImage;

  @ValidateNested({ each: true })
  @ApiModelProperty()
  @Type(() => GamingPlaceAddressDto)
  readonly address: GamingPlaceAddressDto;

  @ValidateNested({ each: true })
  @ApiModelProperty()
  @Type(() => GamingPlaceLocationDto)
  location: GamingPlaceLocationDto;

  readonly type?: EGamingPlaceTypes;

  readonly schedule?: GamingPlaceScheduleDto[];
}

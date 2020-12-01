import { IsString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { GamingPlaceAddressDto } from './gamingPlaceAddress.dto';
import { GamingPlaceLocationDto } from './gamingPlaceLocation.dto';
import { GamingPlaceCoverImage } from './gamingPlaceCoverImage.dto';

export class GamingPlaceUpdateDto {
  @IsOptional()
  @IsString()
  @ApiModelProperty({ required: false })
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiModelProperty({ required: false })
  readonly phone: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @ApiModelProperty({ required: false })
  @Type(() => GamingPlaceCoverImage)
  readonly coverImage: GamingPlaceCoverImage;

  @IsOptional()
  @ValidateNested({ each: true })
  @ApiModelProperty({ required: false })
  @Type(() => GamingPlaceAddressDto)
  readonly address: GamingPlaceAddressDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @ApiModelProperty({ required: false })
  @Type(() => GamingPlaceLocationDto)
  readonly location: GamingPlaceLocationDto;
}

import { ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { QueryFilterDto } from '../../shared/dto/queryFilter.dto';
import { FindGamingPlaceDto } from './findGamingPlace.dto';

export class FindManyGamingPlaceDto extends QueryFilterDto {
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiModelProperty({ required: false })
  @Type(() => FindGamingPlaceDto)
  readonly where?: FindGamingPlaceDto;

  @IsOptional()
  @ApiModelProperty({ required: false })
  // @ValidateNested({ each: true })
  // @Type(() => FindGamingPlaceDto)
  readonly sortBy?: { [K in keyof FindGamingPlaceDto]: 'ASC' | 'DESC' } | {};
}

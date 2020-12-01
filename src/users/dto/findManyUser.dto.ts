import { ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { ApiModelProperty } from '@nestjs/swagger';

import { QueryFilterDto } from '../../shared/dto/queryFilter.dto';
import { FindUserDto } from './findUser.dto';

export class FindManyUserDto extends QueryFilterDto {
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiModelProperty()
  @Type(() => FindUserDto)
  readonly where?: { [K in keyof FindUserDto] };

  @IsOptional()
  @ApiModelProperty()
  // @ValidateNested()
  // @Type(() => FindUserDto)
  readonly sortBy?: { [K in keyof FindUserDto]: 'ASC' | 'DESC' } | {}; // TODO: find a way to validate keys and sort values
}

import { ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { QueryFilterDto } from '../../shared/dto/queryFilter.dto';
import { FindGameDto } from './findGame.dto';

export class FindManyGameDto extends QueryFilterDto {
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiModelProperty({ required: false })
  @Type(() => FindGameDto)
  readonly where?: { [K in keyof FindGameDto]: string } | {};

  @IsOptional()
  @ApiModelProperty({ required: false })
  // @ValidateNested()
  // @Type(() => FindGameDto)
  readonly sortBy?: { [K in keyof FindGameDto]: 'ASC' | 'DESC' } | {};

  @IsOptional()
  readonly include?: string;
}

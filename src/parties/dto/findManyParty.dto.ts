import { ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { QueryFilterDto } from '../../shared/dto/queryFilter.dto';
import { FindPartyDto } from './findParty.dto';

export class FindManyPartyDto extends QueryFilterDto {
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiModelProperty({ required: false })
  @Type(() => FindPartyDto)
  readonly where?: FindPartyDto;

  @IsOptional()
  @ApiModelProperty({ required: false })
  readonly sortBy?: { [K in keyof FindPartyDto]: 'ASC' | 'DESC' } | {};

  @IsOptional()
  @ApiModelProperty({ required: false })
  select?: string;
}

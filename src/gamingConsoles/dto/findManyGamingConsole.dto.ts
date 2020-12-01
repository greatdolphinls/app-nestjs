import { ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { QueryFilterDto } from '../../shared/dto/queryFilter.dto';
import { FindGamingConsoleDto } from './findGamingConsole.dto';

export class FindManyGamingConsoleDto extends QueryFilterDto {
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiModelProperty({ required: false })
  @Type(() => FindGamingConsoleDto)
  readonly where?: FindGamingConsoleDto;

  @IsOptional()
  @ApiModelProperty({ required: false })
  // @ValidateNested({ each: true })
  // @Type(() => FindGamingConsoleDto)
  readonly sortBy?: { [K in keyof FindGamingConsoleDto]: 'ASC' | 'DESC' } | {};
}

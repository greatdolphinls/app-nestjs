import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { GamingConsoleIconDto } from './gamingConsolesIcon.dto';
import { Type } from 'class-transformer';

export class FindGamingConsoleDto {
  @IsString()
  @IsOptional()
  @ApiModelProperty({ required: false })
  readonly name?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @ApiModelProperty({ required: false })
  @Type(() => GamingConsoleIconDto)
  readonly icon?: GamingConsoleIconDto;
}

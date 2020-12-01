import { IsString, ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { GamingConsoleIconDto } from './gamingConsolesIcon.dto';
import { Type } from 'class-transformer';

export class GamingConsoleDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string;

  @ValidateNested({ each: true })
  @ApiModelProperty()
  @Type(() => GamingConsoleIconDto)
  readonly icon: GamingConsoleIconDto;
}

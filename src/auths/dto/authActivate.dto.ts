import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthActivateDto {
  @IsString()
  @ApiModelProperty()
  readonly activationCode: string;
}

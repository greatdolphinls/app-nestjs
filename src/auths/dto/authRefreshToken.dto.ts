import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthRefreshTokenDto {
  @IsString()
  @ApiModelProperty()
  readonly refreshToken: string;
}

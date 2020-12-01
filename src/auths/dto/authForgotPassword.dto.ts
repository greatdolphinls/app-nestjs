import { Length, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthPasswordForgotDto {
  @IsEmail()
  @Length(8, 1024)
  @ApiModelProperty()
  readonly email: string;
}

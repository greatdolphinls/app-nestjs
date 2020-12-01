import { IsString, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthSignInDto {
  @IsString()
  @IsEmail()
  @ApiModelProperty()
  readonly username: string;

  @IsString()

  @ApiModelProperty()
  readonly password: string;
}

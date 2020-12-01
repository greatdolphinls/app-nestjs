import { Length, IsEmail, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class PasswordResetDto {
  @IsEmail()
  @Length(8, 1024)
  @ApiModelProperty()
  readonly email: string;

  @IsString()
  @Length(8, 50)
  @ApiModelProperty()
  readonly password: string;

  @IsString()
  @Length(1, 1024)
  @ApiModelProperty()
  readonly token: string;
}

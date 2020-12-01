import { IsString, IsDateString, Length, IsEmail, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthSignUpDto {
  @IsString()
  @IsEmail()
  @ApiModelProperty()
  readonly email: string;

  @IsString()
  @Length(1, 200)
  @ApiModelProperty()
  readonly firstName: string;

  @IsString()
  @Length(1, 200)
  @ApiModelProperty()
  readonly lastName: string;

  @IsDateString()
  @ApiModelProperty()
  readonly dateOfBirth: string;

  @IsString()
  @Length(8, 50)
  @ApiModelProperty()
  readonly password: string;

  @IsString()
  @Length(1, 100)
  @IsOptional()
  @ApiModelProperty()
  readonly referralCode: string;
}

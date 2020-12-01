import { IsString, IsDateString, Length, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
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

}

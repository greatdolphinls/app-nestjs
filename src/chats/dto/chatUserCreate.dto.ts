import { IsString, Length, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ChatUserCreateDto {
  @IsString()
  @ApiModelProperty()
  readonly id: string;

  @IsString()
  @Length(1, 200)
  @ApiModelProperty()
  readonly username: string;

  @IsString()
  @Length(1, 200)
  @ApiModelProperty()
  @IsOptional()
  // tslint:disable-next-line
  readonly avatar_url: string;
}

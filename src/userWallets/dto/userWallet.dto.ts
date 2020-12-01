// import { IsString } from 'class-validator';
// import { ApiModelProperty } from '@nestjs/swagger';

export class UserWalletDto {
  readonly _user: string;

  amount: number;
}

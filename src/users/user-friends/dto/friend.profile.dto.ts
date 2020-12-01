import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class FriendProfilDto {
    @IsString()
    @ApiModelProperty()
    readonly nickname: string;
}

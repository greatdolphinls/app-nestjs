import { IsMongoId, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class FriendRequestCreateDto {
    @IsString()
    @IsMongoId()
    @ApiModelProperty()
    readonly _userFrom: string;

    @IsString()
    @IsMongoId()
    @ApiModelProperty()
    readonly _userTo: string;
}

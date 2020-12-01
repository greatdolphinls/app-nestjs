import { IsMongoId, IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class FriendRequestPostDto {
    @IsOptional()
    @IsString()
    @IsMongoId()
    @ApiModelProperty()
    public _userFrom: string;

    @IsString()
    @IsMongoId()
    @ApiModelProperty()
    readonly _userTo: string;
}

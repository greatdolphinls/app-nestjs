import { IsMongoId, IsEnum, IsString } from 'class-validator';
import { EUserFreindsStatus } from '../enums/userFreindsStatus.enum';
import { ApiModelProperty } from '@nestjs/swagger';

export class FriendRequestDto {
    @IsString()
    @IsMongoId()
    @ApiModelProperty()
    readonly _userFrom: string;

    @IsString()
    @IsMongoId()
    @ApiModelProperty()
    readonly  _userTo: string;

    @ApiModelProperty({ required: true, enum: Object.values(EUserFreindsStatus) })
    @IsEnum(Object.values(EUserFreindsStatus))
    readonly status: string;
}

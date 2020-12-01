import { IsEnum, ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { EUserFreindsStatus } from '../enums/userFreindsStatus.enum';
import { FriendProfilDto } from './friend.profile.dto';
import { Type } from 'class-transformer';

export class FriendMyDto {
    @ApiModelProperty({ required: true, enum: Object.values(EUserFreindsStatus) })
    @IsEnum(Object.values(EUserFreindsStatus))
    readonly status: string;

    @ValidateNested({each: true})
    @Type(() => FriendProfilDto)
    @ApiModelProperty()
    readonly _userTo: FriendProfilDto;
}

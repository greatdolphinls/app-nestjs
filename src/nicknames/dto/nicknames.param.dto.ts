import { IsString, IsMongoId } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class NicknamesParamDto {
    @IsString()
    @IsMongoId()
    @ApiModelProperty()
    readonly nicknameId: string;
}

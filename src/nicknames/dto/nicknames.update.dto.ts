import { IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class NicknamesUpdateDto {
    @IsOptional()
    @IsString()
    @ApiModelProperty()
    readonly nickname: string;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    readonly phone: string;
}

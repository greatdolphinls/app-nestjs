import { IsString, IsMongoId } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class SkinsParamDto {
    @IsString()
    @IsMongoId()
    @ApiModelProperty()
    readonly skinId: string;
}

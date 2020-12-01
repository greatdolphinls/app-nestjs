import { IsString, IsMongoId } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class GameParamDto {
    @IsString()
    @IsMongoId()
    @ApiModelProperty()
    readonly gameId: string;
}

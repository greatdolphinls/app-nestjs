import { IsString, IsMongoId } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class GamingConsoleParamDto {
    @IsString()
    @IsMongoId()
    @ApiModelProperty()
    readonly gamingConsoleId: string;
}

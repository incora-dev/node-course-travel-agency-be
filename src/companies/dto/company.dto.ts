import {IsEmail, IsNotEmpty, IsString, MinLength, IsOptional} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {Address} from '../../address/address.entity';
import {AddressDTO} from '../../address/dto/address.dto';

export class CreateCompanyDto {

    @IsEmail()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly contactEmail: string;

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @ApiModelProperty()
    readonly name: string;

    @Type(() => Address)
    @IsNotEmpty()
    @ApiModelProperty({type: AddressDTO})
    readonly address1: Address;

    @Type(() => Address)
    @IsOptional()
    @ApiModelProperty({type: AddressDTO})
    readonly address2?: Address;
}

export class UpdateCompanyDto {

    @IsEmail()
    @IsOptional()
    @ApiModelProperty()
    readonly contactEmail: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    @ApiModelProperty()
    readonly name: string;

    @Type(() => Address)
    @IsOptional()
    @ApiModelProperty({type: AddressDTO})
    readonly address1: Address;

    @Type(() => Address)
    @IsOptional()
    @ApiModelProperty({type: AddressDTO})
    readonly address2?: Address;
}

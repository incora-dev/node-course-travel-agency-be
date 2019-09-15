import { IsString, IsNumber, IsOptional } from 'class-validator';

export class AddressDTO {
    @IsString()
    readonly country: string;

    @IsString()
    readonly city: string;

    @IsString()
    readonly state: string;

    @IsString()
    readonly street: string;

    @IsNumber()
    readonly zip: number;
}

export class UpdateAddressDTO {
    @IsOptional()
    @IsString()
    readonly country?: string;

    @IsOptional()
    @IsString()
    readonly city?: string;

    @IsOptional()
    @IsString()
    readonly state?: string;

    @IsOptional()
    @IsString()
    readonly street?: string;

    @IsOptional()
    @IsNumber()
    readonly zip?: number;
}

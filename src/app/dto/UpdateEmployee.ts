import { Type } from "class-transformer";
import { IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";
import { Address } from "../entities/Address";
import { UpdateAddressDto } from "./UpdateAddress";

export class UpdateEmployeeDto {
    @IsString()
    public name: string;

    @IsString()
    public username: string;

    @IsString()
    public password: string;

    @IsString()
    public dateofjoining: string;

    @IsNumber()
    public experience: number;

    @IsString()
    public status: string;

    @IsString()
    public role: string;

    @IsUUID()
    public departmentId: string;

    @IsUUID()
    public addressId: string;

    @ValidateNested({ each: true })
        @Type(() => UpdateAddressDto)
        public address: Address   
}
import { IsNumber, IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    public name: string;

    @IsString()
    public username: string;

    @IsNumber()
    public experience: number;

    @IsString()
    public departmentId: string;
}
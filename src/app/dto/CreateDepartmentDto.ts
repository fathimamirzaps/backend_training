import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateDepartmentDto {
    @IsString()
    public name: string;

    @IsUUID()
    public id: string;

}
import { plainToClass } from "class-transformer";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import { DepartmentRepository } from "../repository/DepartmentRepository";
import { errCode } from "../util/errorCode";

export class DepartmentService{
    constructor(private departmentRepository: DepartmentRepository) {

    }

    async getAllDepartments(): Promise<Department[]>{
        const data = await this.departmentRepository.getAllDepartments();
        return data;
    }

    public async getDepartmentById(departmentDetails: any) : Promise<Department> {
        try{
            const departmentId = departmentDetails.id;
            const data = await this.departmentRepository.getDepartmentById(departmentId);
            return data;
        } catch (err) {
            throw new HttpException(errCode.BAD_REQUEST, "Failed to get department")
        }
    }
    
    public async createDepartment(departmentDetails: any) : Promise<Department> {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name,
            });
            const save = await this.departmentRepository.saveDepartmentDetails(newDepartment);
            return save;
        } catch (err) {
            throw new HttpException(errCode.BAD_REQUEST, "Failed to create department");
        }
    }

    public async updateDepartment(departmentIdDetails: any, departmentDetails: any): Promise<void> {
        try {
            const updatedDepartment = plainToClass(Department, {
                id: departmentIdDetails.id,
                name: departmentDetails.name
            })
            const data = this.departmentRepository.updateDepartment(updatedDepartment);
            return data;
        } catch (err) {
            throw new HttpException(errCode.BAD_REQUEST, "Failed to update department");
        }
    }

    public async deleteDepartment(departmentIdDetails: any) {
        try {
            const departmentId = departmentIdDetails.id;
            const data = this.departmentRepository.deleteDepartment(departmentId);
            return data;
        } catch (err) {
            throw new HttpException(errCode.BAD_REQUEST, "Failed to delete department");
        }
    }
    
}
import { plainToClass } from "class-transformer";
import { getConnection, Repository } from "typeorm";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";

export class EmployeeRespository extends Repository<Employee>{
    
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findAndCount();
    }
    async getEmployeeById(id:string){
        const employeeRepo = getConnection().getRepository(Employee);
       return employeeRepo.findOne(id);
   }
    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }
    
    public async softDeleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softDelete(
            id
        );
    } 
    }

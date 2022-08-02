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
        console.log(employeeDetails);
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }
    

    public async updateEmployeeDetails(employeeId: string, employeeDetails: any) {
        const employeeRepo = getConnection().getRepository(Employee);
        const updateEmployeeDetails = await employeeRepo.update(
          { id: employeeId, deletedAt: null },
          {
            name: employeeDetails.name ? employeeDetails.name : undefined,
            departmentId: employeeDetails.departmentId
              ? employeeDetails.departmentId
              : undefined,
          }
        );
        return updateEmployeeDetails;
      }

      public async getEmployeeByName(userName: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { name: userName },
        });
        return employeeDetail;
    }
    public async softDeleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softDelete(
            id
        );
    } 
    }

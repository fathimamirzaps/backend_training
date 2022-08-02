import { plainToClass } from "class-transformer";
import { getConnection, Repository } from "typeorm";
import { Department } from "../entities/Department"
import HttpException from "../exception/HttpException";

export class DepartmentRespository extends Repository<Department>{
    
    async getAllDepartment(){
         const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.findAndCount();
    }
    public async saveDepartmentDetails(departmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(departmentDetails);
    }


    public async updateDepartmentDetails(
        departmentId: string,
        departmentDetails: any
      ) {
        const departmentRepo = getConnection().getRepository(Department);
        const updateDepartmentDetails = await departmentRepo.update(
          { id: departmentId, deletedAt: null },
          {
            name: departmentDetails.name ? departmentDetails.name : undefined,
          }
        );
        return updateDepartmentDetails;
      }
      
    public async softDeleteDepartmentById(id: string) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.softDelete(
            id
        );
    } 
    }

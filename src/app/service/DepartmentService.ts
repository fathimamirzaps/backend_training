
import { plainToClass } from "class-transformer";
import { Department} from "../entities/Department";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { DepartmentRespository } from "../repository/departmentRepository";
import { ErrorCodes } from "../util/errorCode";
export class DepartmentService{
    
      constructor (private departmentRepo: DepartmentRespository){

        }
        getAllDepartment(){
            return this.departmentRepo.getAllDepartment();
        }
        public async createDepartment(departmentDetails: any) {
            try {
                const newDepartment = plainToClass(Department, {
                    name: departmentDetails.name,
                    // username: employeeDetails.username,
                    // age: employeeDetails.age,
                    departmentId: departmentDetails.departmentId,
                    // isActive: true,
                });
                const save = await this.departmentRepo.saveDepartmentDetails(newDepartment);
                return save;
            } catch (err) {
                //throw new HttpException(400, "Failed to create employee");
            }
        }
        
        async getDepartmentById(id:string){
          const employee= await this.departmentRepo.getDepartmentById(id);
          if(!employee){
              throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND)
          }
      }
        public async updateDepartmentById(id: string, departmentDetails: any) {
            try {
              const updatedDepartment = plainToClass(Department, {
                name: departmentDetails.name,
              });
              const save = await this.departmentRepo.updateDepartmentDetails(
                id,
                updatedDepartment
              );
              return save;
            } catch (err) {
              throw new HttpException(400, "Failed to create department", "code-400");
            }
          }

        softDelete(id:string){
            return this.departmentRepo.softDeleteDepartmentById(id);
        }
       
    }
    
    
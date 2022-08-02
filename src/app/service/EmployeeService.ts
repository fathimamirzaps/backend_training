
import { plainToClass } from "class-transformer";
import { getConnection } from "typeorm/globals";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/employeeRepository";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { ErrorCodes } from "../util/errorCode";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
export class EmployeeService{
    
      constructor (private employeeRepo: EmployeeRespository){

        }
        async getAllEmployees(){
            return await this.employeeRepo.getAllEmployees();
        }
        async getEmployeeById(id:string){
            const employee= await this.employeeRepo.getEmployeeById(id);
            if(!employee){
                throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND)
            }
        }
        public async createEmployee(employeeDetails: any) {
            try {
                const newEmployee = plainToClass(Employee, {
                    name: employeeDetails.name,
                    experience: employeeDetails.experience,
                    username: employeeDetails.username,
                    password: employeeDetails.password? await bcrypt.hash(employeeDetails.password,10):'',
                    role: employeeDetails.role,
                    // username: employeeDetails.username,
                    // age: employeeDetails.age,
                    departmentId: employeeDetails.departmentId,
                    
                    
                    // isActive: true,
                });
                const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
                return save;
            } catch (err) {
                //throw new HttpException(400, "Failed to create employee");
            }
        }

        public employeeLogin = async (
            name: string,
            password: string
          ) => {
            const employeeDetails = await this.employeeRepo.getEmployeeByName(
              name
            );
            if (!employeeDetails) {
              throw new UserNotAuthorizedException();
            }
            const validPassword = await bcrypt.compare(password, employeeDetails.password);
            if (validPassword) {
              let payload = {
                "custom:id": employeeDetails.id,
                "custom:name": employeeDetails.name,
                // "role":'admin'
              };
              const token = this.generateAuthTokens(payload);
    
              return {
                idToken: token,
                employeeDetails,
              };
            } else {
              throw new IncorrectUsernameOrPasswordException();
            }
          };
    
         private generateAuthTokens = (payload: any) => {
            return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
              expiresIn: process.env.ID_TOKEN_VALIDITY,
            });
          };  

          
        public async updateEmployeeById(id: string, employeeDetails: any) {
            try {
              const updatedEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                dateofjoining: employeeDetails.dateofjoining,
                role: employeeDetails.role,
                status: employeeDetails.status,
                experience: employeeDetails.experience,
                username: employeeDetails.username,
                password: employeeDetails.password,
                //age: employeeDetails.age,
                departmentId: employeeDetails.departmentId,
              });
              const save = await this.employeeRepo.updateEmployeeDetails(
                id,
                updatedEmployee
              );
              return save;
            } catch (err) {
              throw new HttpException(400, "Failed to create employee", "code-400");
            }
          }
        softDelete(id:string){
            return this.employeeRepo.softDeleteEmployeeById(id);
        }
       
    }
    
    
    
    
    
    
    
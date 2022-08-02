import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateEmployeeDto } from "../dto/CreateEmployeeDto";
import authorize from "../middleware/authorize";
class EmployeeController extends AbstractController {
    constructor(private employeeService: EmployeeService) {
      super(`${APP_CONSTANTS.apiPrefix}/employee`);
      this.initializeRoutes();
    }

    protected initializeRoutes() {
      this.router.get(`${this.path}`,authorize(), this.getEmployee);  //authorize("admin",superAdmin) change in passing area authorize.ts function 
      
      this.router.post(
        `${this.path}`,
        validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
        // this.asyncRouteHandler(this.createEmployee)
        this.createEmployee
      );
      this.router.put(`${this.path}/:id`, this.updateEmployeeById);
      this.router.delete(`${this.path}`, this.softDelete);
      this.router.get(`${this.path}/:id`, this.getEmployeeById);
      this.router.post(
        `${this.path}/login`,
        this.login
      );
    }
    private getEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
      try {
        const data: any = await this.employeeService.getAllEmployees();
        response.status(200);
        response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
      } catch (error) {
        return next(error);
      }
    }

    private getEmployeeById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
      try {
        //console.log(request.params)
        const data: any = await this.employeeService.getEmployeeById(request.params.id);
        response.status(200);
        response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
      } catch (error) {
        return next(error);
      }
    }

    private updateEmployeeById = async (
      request: RequestWithUser,
      response: Response,
      next: NextFunction
    ) => {
      try {
        const data: any = await this.employeeService.updateEmployeeById(
          request.params.id,
          request.body
        );
        response.status(200);
        response.send(
          this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
        );
      } catch (error) {
        return next(error);
      }
    };

    private login = async (
      request: RequestWithUser,
      response: Response,
      next: NextFunction
    ) => {
      const loginData = request.body;

      try {
        const loginDetail = await this.employeeService.employeeLogin(
          loginData.name,
          loginData.password
        );
        response.send(
          this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
        );
      } catch (err) {
        next (err);
      }

    };



    private createEmployee = async (
        request: RequestWithUser,
        response: Response,
        next: NextFunction
      ) => {
        // console.log(request.body)
        try {
          const data = await this.employeeService.createEmployee(request.body);
          response.send(
            this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
          );
        } catch (err) {
          next(err);
        }
      }


      private softDelete = async (
        request: RequestWithUser,
        response: Response,
        next: NextFunction
      ) => {
        try {
          const data = await this.employeeService.softDelete(request.body);
          response.send(
            this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
          );
        } catch (err) {
          next(err);
        }
      }
  }
  export default EmployeeController;



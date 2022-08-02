import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateDepartmentDto } from "../dto/CreateDepartmentDto";
class DepartmentController extends AbstractController {
    constructor(private departmentService: DepartmentService) {
      super(`${APP_CONSTANTS.apiPrefix}/department`);
      this.initializeRoutes();
    }

    protected initializeRoutes() {
      this.router.get(`${this.path}`, this.getDepartment);
      this.router.post(
        `${this.path}`,
        validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),
        // this.asyncRouteHandler(this.createEmployee)
        this.createDepartment
      );
      this.router.put(`${this.path}/:id`, this.updateDepartmentById);
      this.router.delete(`${this.path}`, this.softDelete);
    }
    private getDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
      try {
        const data: any = await this.departmentService.getAllDepartment();
        response.status(200);
        response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
      } catch (error) {
        return next(error);
      }
    }
    private createDepartment = async (
        request: RequestWithUser,
        response: Response,
        next: NextFunction
      ) => {
        try {
          const data = await this.departmentService.createDepartment(request.body);
          response.send(
            this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
          );
        } catch (err) {
          next(err);
        }
      }
     

      private updateDepartmentById = async (
        request: RequestWithUser,
        response: Response,
        next: NextFunction
      ) => {
        try {
          const data: any = await this.departmentService.updateDepartmentById(
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



      private softDelete = async (
        request: RequestWithUser,
        response: Response,
        next: NextFunction
      ) => {
        try {
          const data = await this.departmentService.softDelete(request.body);
          response.send(
            this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
          );
        } catch (err) {
          next(err);
        }
      }
  }
  export default DepartmentController;
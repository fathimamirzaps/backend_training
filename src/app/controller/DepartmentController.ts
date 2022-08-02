import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";

class DepartmentController extends AbstractController {
    constructor(private departmentService: DepartmentService) {
      super(`${APP_CONSTANTS.apiPrefix}/department`);
      this.initializeRoutes();
    }

    protected initializeRoutes() {
      this.router.get(`${this.path}`, this.getDepartment);
      this.router.post(
        `${this.path}`,
        // validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
        // this.asyncRouteHandler(this.createEmployee)
        this.createDepartment
      );
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
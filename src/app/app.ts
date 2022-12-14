import { EventEmitter } from "events";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import { Controller } from "./util/rest/controller";
import RequestWithUser from "./util/rest/request";
import cors = require("cors");
import errorMiddleware from "./middleware/ErrorMiddleware";

class App extends EventEmitter {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    super();

    this.app = express();

    this.app.use(cors());

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }


  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on ${process.env.PORT}`)
    });
  }


  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(compression());
    this.app.use(express.static('public'));



    this.app.use((request: RequestWithUser, response: express.Response, next: express.NextFunction) => {
      request.startTime = Date.now();
      next();
    });
  }
  

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

}

export default App;
import { Application} from 'express';
import bodyParser from 'body-parser';
import { MONGO_URL } from '../infrastructure/entrypoint/util/constants/constants';
import { ClientService } from '../infrastructure/entrypoint/services/client/client.service';
import { ClientController } from '../infrastructure/entrypoint/controllers/client/client.controller';
import {ClientOperationController} from '../infrastructure/entrypoint/controllers/client/operations/client.controller.operations'
import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

class App{
  public app: Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setControllers();
  }

  private setConfig() {    
    //this.app.use(bodyParser.json({ limit: "50mb" })); 
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ limit: "50mb", extended: true }));    
    this.app.use(cors());
    this.app.use(morgan('dev'));
    
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
        useFindAndModify: false,
      
    });
  }
  
  private setControllers() {
    const clientController = new ClientController(new ClientService());
    const clientOperationController = new ClientOperationController(new ClientService());
    this.app.use("/client", clientController.router);
    this.app.use("/client",clientOperationController.router);
}



}

export default new App().app;
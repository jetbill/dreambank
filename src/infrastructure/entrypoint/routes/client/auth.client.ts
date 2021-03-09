import { Request, Response, Router } from 'express';
import { ClientService } from '../../services/client/client.service';
import * as ClientController from '../../controllers/client/client.controller';



export class Auth {
  public router: Router = Router();
  
  constructor() {
    
    
  }

  public setRoutes() {
    this.router.get('/singin',)
   }



}

  

  

  
  
  








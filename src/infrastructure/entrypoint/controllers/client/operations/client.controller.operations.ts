import { Request, Response, Router } from 'express';
import { ClientService } from '../../../services/client/client.service';
import { TOKEN_USER } from '../../../util/constants/constants';
import { TokenValidation } from '../../../helper/client.tokenvalidator';




export class ClientOperationController{

  public router = Router();

  constructor(private clientService: ClientService) {
    this.setRoutes();
    
  }

  public setRoutes() {
    
    this.router.get('/clientaccounts', TokenValidation, this.findAccount);
    this.router.put('/:id/product',TokenValidation,this.createProduct);
    this.router.get('/transaction');
    this.router.get('/transactiondetail');
    
    
    
    
  }

  public findAccount = async (req: Request, res: Response) => {
    try {
      const account = await this.clientService.findUser(req.body.user);
      res.json(account.accounts);     
      
    } catch (error) {
      res.status(500).send(error.message);
    }
    
  };

  public createProduct = async (req: Request, res: Response) => {
    try {
      
      const updateProductResult = await this.clientService.update(
        req.params.id,
        req.body
      );
      res.status(200).json(updateProductResult);
    } catch (error) {
      res.status(500).send(error.message);
    }
    
  }

}

import { Request, Response, Router } from 'express';
import { ClientService } from '../../services/client/client.service';
import { TOKEN_USER } from '../../../entrypoint/util/constants/constants';
import jwt from 'jsonwebtoken';
import { TokenValidation } from '../../helper/client.tokenvalidator';


export class ClientController{
  public router = Router();

  constructor(private clientService: ClientService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.post('/singin', this.singin);
    this.router.post('/singup',this.singup);
    this.router.get("/all", this.findAll);
    this.router.get("/:id", this.findById);
    this.router.post("/", this.save);
    this.router.delete("/:id", this.delete);
    this.router.put("/:id", this.update);
    
  }
  
  public singin = async (req: Request, res: Response) => {
    try {
      const userSearch = await this.clientService.findUser(req.body.user);
      //res.status(200).send(userSearch);
      const token: string = jwt.sign({ _id: userSearch._id }, TOKEN_USER);
      res.header('auth-token', token).json(userSearch.name);
    } catch (error) {
      res.status(500).send(error.message);
    }

    
  };

  private singup = async (req: Request, res: Response)=>{
    res.status(200).send('creating new user');
  }
  

  private findAll = async (req: Request, res: Response) => {
    try {
      const clients = await this.clientService.findAll();
      res.send(clients);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  private findById = async (req: Request, res: Response) => {
    try {
      const findClientResult = await this.clientService.findById(
        req.params.id
      );
      res.send(findClientResult);

    } catch (error) {
      res.status(500).send(error.message);
    }

  };

  private save = async (req: Request, res: Response) => {
    try {
      const clientNew = await this.clientService.save(req.body);
      const token: string = jwt.sign({_id: clientNew._id},TOKEN_USER)
      res.header('auth-token',token).json(clientNew);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  private delete = async (req: Request, res: Response) => {
    try {
      const deleteClientResult = await this.clientService.deletebyId(
        req.params.id
      );
      res.send(deleteClientResult);

    } catch (error) {
      res.status(500).send(error.message);
    }

  };

  private update = async (req: Request, res: Response) => {
    try {
      const updateClientResult = await this.clientService.update(
        req.params.id,
        req.body
      );

      res.send(updateClientResult);
    } catch (error) {

      res.status(500).send(error.message);

    }

  };
  

}
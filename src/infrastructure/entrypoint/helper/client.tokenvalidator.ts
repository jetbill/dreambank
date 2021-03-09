import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
//import Client from '../../../domain/model/client/client.model';
import { ICliente } from '../../../domain/model/client/interface/client.interface';
import { TOKEN_USER } from '../../entrypoint/util/constants/constants';


export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json('Access Denied');
  const payload = jwt.verify(token, TOKEN_USER);


  next();
  
}

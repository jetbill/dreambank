import { Document } from 'mongoose';


export interface ICliente extends Document{

  name: string;
  lastName: string;
  user: string;
  password: string;
  identification: string;
  isActive: boolean;
  products: string[];
  accounts: Array<any>;
  rol: Array<String>;

}
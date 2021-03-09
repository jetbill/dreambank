import { ICliente } from '../../model/client/interface/client.interface';
import { Client } from '../../model/client/client.model';


export interface ClienteUseCase{
  findAll(): Promise<ICliente[]>
  save(client: ICliente): Promise<ICliente>
  update(id: string, client: ICliente): Promise<ICliente>
  deletebyId(id: string): Promise<ICliente>
  findById(id: string): Promise<ICliente>
}
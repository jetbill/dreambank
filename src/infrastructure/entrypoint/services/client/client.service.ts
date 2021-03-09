import { Client } from '../../../../domain/model/client/client.model';
import { ICliente } from '../../../../domain/model/client/interface/client.interface';





export class ClientService{
  

  public findAll(): Promise<ICliente[]> {
    return Client.find({}).exec();
  }

  public save(client: ICliente): Promise<ICliente>{
    const newClient = new Client(client);
        return newClient.save();

  }
  public async update(id: string, client: ICliente): Promise<ICliente>{
    const updatedClient  = await Client.findByIdAndUpdate(id,client).exec();
    console.log(updatedClient);
    if (!updatedClient) {
      throw new Error(`Client with id '${id}' not found`);
    }

    return updatedClient;

  };

  public async deletebyId(id: string): Promise<ICliente>{
    const deletedClient  = await Client
          .findByIdAndDelete(id).exec();
    
        if (!deletedClient) {
          throw new Error(`Client with id '${id}' not found`);
        }
    
        return deletedClient;

  }

  public async findById(id: string): Promise<ICliente>{
    const idClient  = await Client
          .findById(id).exec();
    
        if (!idClient) {
          throw new Error(`Client with id '${id}' not found`);
        }
    
        return idClient;

  }

  public async findUser(user: string): Promise<ICliente>{
    const userResgister = await Client.findOne({ user: user }).exec();
    
    
        if (!userResgister) {
          throw new Error(`Client  '${user}' is not valid`);
        }
    
        return userResgister;

  }

  public async createProduct(clientId: string, producto: string[]): Promise<ICliente>{
    const produc = {products: producto}
    const productResult  = await Client.findByIdAndUpdate(clientId,produc).exec();

    if (!productResult) {
      throw new Error(`Client with id '${clientId}' not found`);
    }

    return productResult;

  };
  

}
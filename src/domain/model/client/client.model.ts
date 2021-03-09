import { ICliente } from '../client/interface/client.interface';
import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
//import mongoose from 'mongoose'

const ClientSchema = new Schema({
  name: { type: String, required: [true, "Field is required"]},
  lastName: { type: String, required: [true, "Field is required"] },
  user: { type: String, required: [true, "Field is required"], unique:[true, "user existed"] , lowercase: true  },
  password: { type: String, required: [true, "Field is required"] },
  identification: { type: String, required: [true, "Field is required"], unique: true  },
  isActive: { type: Boolean, required: [false] },
  products: { type: Array, require: [false] },
  accounts: { type: Array, require: [false] },
  rol: { type: Array, require: [true, 'Field is required'] }

},
  {
    timestamps: true,
    versionKey: false
  });

 

ClientSchema.methods.encryptPassword = async (password: string): Promise<string> =>{
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
  
ClientSchema.methods.validatePasssword = async function (password: string): Promise<boolean>{
  
  return await bcrypt.compare(password, "password");
  }

export const Client = model<ICliente>("Client", ClientSchema);
//export = mongoose.model<ICliente>('Client', ClientSchema);


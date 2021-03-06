import mongoose from 'mongoose'
import bcrypt from "bcrypt"
//import IUser from '../interfaces/Iuser'
import { Model } from 'mongoose';
import {Document} from 'mongoose'
import { IUser } from '../interfaces/Iuser';

interface UserDocument extends Document {
  _id: string,
  name: string | any,
  surname: string,
  email: string,
  password: string,
  role: string
}

interface UserModel extends Model<UserDocument> {
  checkCredentials(email:string, password:string):Promise<UserDocument |null>;
}
const { Schema, model } = mongoose

export const UserSchema = new Schema<IUser, UserModel>({
  name: { type: String },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "Guest", enum: ["Guest", "Host", "Attacker😨"] },
})

UserSchema.pre<any>("save", async function (next) {
  
  const newUser = this 
  const plainPw = newUser.password
  if (newUser.isModified("password")) {
    const hash = await bcrypt.hash(plainPw, 10)
    newUser.password = hash
  }
  next()
})

UserSchema.methods.toJSON = function () {
  const userDocument = this
  const userObject = userDocument.toObject()
  delete userObject.password
  delete userObject.__v

  return userObject
}


UserSchema.statics.checkCredentials = async function (name:string, plainPw:string):Promise<any> {
  const user = await this.findOne({ name }) 

  if (user) {
    const isMatch = await bcrypt.compare(plainPw, user.password)
    if (isMatch) {
      return user
    } else {
      return null
    }
  } else {
    return null 
  }
}


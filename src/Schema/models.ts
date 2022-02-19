import { AccommodationSchema } from "./accomadSchema";
import mongoose from "mongoose";
import {UserSchema} from './userSchema'
//import IUser from '../interfaces/Iuser'
import {Model, Types } from "mongoose"

const { model } = mongoose;

export const AccommodationModel = model("accommodations", AccommodationSchema);

interface UserModel extends Model<IUser> {
    checkCredentials(): any;
  }
export const UserModel = model("User", UserSchema)

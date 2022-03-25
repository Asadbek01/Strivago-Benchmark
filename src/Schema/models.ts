import { AccommodationSchema } from "./accomadSchema";
import mongoose from "mongoose";
import {UserSchema} from './userSchema'
import {Model, Types } from "mongoose"
import { IUser } from "../interfaces/Iuser";

const { model } = mongoose;

export const AccommodationModel = model("accommodations", AccommodationSchema);

interface UserModel extends Model<IUser> {
    checkCredentials(): any;
  }
export const UserModel = model("User", UserSchema)

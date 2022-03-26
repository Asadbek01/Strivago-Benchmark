import { NextFunction } from "express";
import createHttpError from "http-errors";
import { IUser } from "../interfaces/Iuser";
import { Request, Response } from "express";

export const hostMiddleware = (req:Request, res:Response, next:NextFunction) => {
  if ((req.user as IUser)?.role === "Host") {
    next();
  } else {
    next(createHttpError(403, "Hosts Only!"));
  }
};
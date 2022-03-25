import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/Iuser";


//CREATE USER INTERFACE

export const JWTAuthenticate = async (user: IUser) => {
  const accessToken = await generateJWT({ _id: user._id } );

  return {accessToken};
};

const generateJWT = (payload: { _id : any}) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: "1 week" },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    )
  );

export const verifyJWT = (token: string) =>
  new Promise<{ _id: string }>((res, rej) =>
    jwt.verify(token, process.env.JWT_SECRET!, (err, decodedToken) => {
      if (err) rej(err);
      else res(decodedToken as { _id: string });
    })
  );
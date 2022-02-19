import express from "express";
import createHttpError from "http-errors";
import { UserModel } from "../Schema/models";
import { JWTAuthenticate } from "../auth/tools";
import { JWTAuthMiddleware } from "../auth/token";
import { hostMiddleware } from "../auth/hostMiddleware";
import bcrypt from "bcrypt"


const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body)
    const { _id } = await newUser.save()
    res.send({ _id })
  } catch (error) {
    next(error)
  }
});

const checkCredentials = async (name: string, password: string) => {
  const user = await UserModel.findOne({ name });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
}



usersRouter.post("/login", async (req:any, res:any, next:any) => {

  try {
    // 1. Get credentials from req.body
    const { name, password } = req.body

    // 2. Verify credentials
  const user:any = await checkCredentials(name, password)

    if (user) {
      // 3. If credentials are fine we are going to generate an access token
      const accessToken = await JWTAuthenticate(user)
      res.send({ accessToken })
    } else {
      // 4. If they are not --> error (401)
      next(createHttpError(401, "Credentials not ok!"))
    }
  } catch (error) {
    next(error)
  }
});



usersRouter.get("/me", JWTAuthMiddleware, async (req:any, res, next) => {
  try {
    req.user.role = req.body.role
    await req.user.save()
    res.send({ user: req.user })
  } catch (error) {
    next(error)
  }
}
);


export default usersRouter;
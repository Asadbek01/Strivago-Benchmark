import createHttpError from "http-errors";


export const hostMiddleware = (req:any, res:any, next:any) => {
  if (req.users.role === "Host") {
    next();
  } else {
    next(createHttpError(403, "Hosts Only!"));
  }
};
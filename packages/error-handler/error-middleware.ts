import { AppError } from './index';
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (err:Error, req:Request, res:Response, next:NextFunction) => {
  if(err instanceof AppError){
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      details: err.details || null,
    });
  }

  console.log("unhandled error", err);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong!",
    details: null,
  });
}
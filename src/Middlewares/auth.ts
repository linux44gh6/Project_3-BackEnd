/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../Modules/User/user.interface";
import catchAsync from "../Utils/catchAsync";
import { appError } from "../App/Errors/AppError";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../App/config";
import { User } from "../Modules/User/user.model";

const auth=(...requiredRole:TUserRole[])=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
     const token=req.headers.authorization?.split(' ').at(1)

     if(!token){
        throw new appError(StatusCodes.FORBIDDEN,'You are unauthorized')
     }

     //decoded token
     const decoded=jwt.verify(token,config.jwt_access_secret as string) as JwtPayload
     const {userRole,userEmail}=decoded
   
     //check the user is exist or not
     const user=await User.isUserExistsByCustomEmail(userEmail)
     if(!user){
        throw new appError(StatusCodes.FORBIDDEN,'You are unauthorized')
     }
     if(user?.isBlocked){
        throw new appError(StatusCodes.FORBIDDEN,'You are unauthorized')
     }

    //  console.log("2nd check",!requiredRole.includes(role));

     if(requiredRole && !requiredRole.includes(userRole)){
        throw new appError(StatusCodes.FORBIDDEN,'You are unauthorized')
     }
     req.user=decoded as JwtPayload
     next()
    })
}
export default auth
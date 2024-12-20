import { StatusCodes } from "http-status-codes";
import { appError } from "../../App/Errors/AppError";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../App/config";

const registerUser=async(payload:TUser)=>{
const result=await User.create(payload)
return result
}


const loginUser=async(payload:TLoginUser)=>{
   const {email,password}=payload
    const user=await User.findOne({email})
        console.log(user);

    if(!await User.isUserExistsByCustomEmail(email)){
        throw new appError(StatusCodes.NOT_FOUND,'This user dose not exist !!')
    }
     if(! await User.isPasswordMatched(password,user?.password as string)){
        throw new appError(StatusCodes.NOT_FOUND,'This password dose not matched !!')
    }

    if (!user?.email || !user?.role) {
        throw new Error("User email or role is missing");
    }
    const jwtPayload={
        userEmail:user?.email,
        userRole:user?.role
    }
    const accessToken=createToken(jwtPayload,config.jwt_access_secret as string,"10d")
    console.log(accessToken);
    return{
        accessToken
    }
}
export const authServices={
    registerUser,
    loginUser
}
import { StatusCodes } from "http-status-codes";
import { appError } from "../../App/Errors/AppError";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";

const registerUser=async(payload:TUser)=>{
const result=await User.create(payload)
return result
}


const loginUser=async(payload:TLoginUser)=>{
    console.log(payload);
    const {email}=payload
    const user=await User.findOne({email})

    if(!user){
        throw new appError(StatusCodes.NOT_FOUND,'This user dose not exist !!')
    }
}
export const authServices={
    registerUser,
    loginUser
}
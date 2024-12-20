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
const loginUser = async (payload: TLoginUser) => {
    const { email, password } = payload;
  
    // Fetch user and explicitly include the password
    const user = await User.findOne({ email }).select("+password");
  
    // Check if user exists
    if (!user) {
      throw new appError(StatusCodes.NOT_FOUND, "This user does not exist!");
    }
  
    // Check if password matches
    const isPasswordMatched = await User.isPasswordMatched(password, user.password);
    if (!isPasswordMatched) {
      throw new appError(StatusCodes.UNAUTHORIZED, "The password does not match!");
    }
  
    // Check for missing user details (if needed)
    if (!user.email || !user.role) {
      throw new Error("User email or role is missing");
    }
  
    // Generate JWT payload and token
    const jwtPayload = {
      userEmail: user.email,
      userRole: user.role,
    };
    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, "10d");
  
    console.log(accessToken);
  
    return {
      accessToken,
    };
  };
export const authServices={
    registerUser,
    loginUser
}
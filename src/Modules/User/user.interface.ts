
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constants";

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface UserModel extends Model<TUser> {
    //instance methods for checking if the user exist
    isUserExistsByCustomEmail(id: string): Promise<TUser>;

    //instance methods for checking if passwords are matched
    isPasswordMatched(
      plainTextPass: string,
      hashedPass: string,
    ): Promise<boolean>;

  }

  export type TUserRole=keyof typeof USER_ROLE
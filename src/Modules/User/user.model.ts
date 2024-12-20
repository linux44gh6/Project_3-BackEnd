/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt'
import config from '../../App/config';

const userSchema = new Schema<TUser,UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select:0
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default:'user'
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save',async function(next){
    const user=this
    user.password=await bcrypt.hash(user.password,
        Number(config.bcrypt_salt_round))
        console.log(user.password);
        next()
})

userSchema.statics.isUserExistsByCustomEmail=async function(email){
 return await User.findOne({email})
}

userSchema.statics.isPasswordMatched=async function(plainTextPass,hashedPass){
  return await bcrypt.compare(plainTextPass,hashedPass)
}
export const User = model<TUser,UserModel>('User', userSchema);

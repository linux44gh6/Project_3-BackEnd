/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt'
import config from '../../App/config';

const userSchema = new Schema<TUser>(
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

userSchema.statics.isExistUserByEmail=async function(email){
 return await User.findOne({email})
}
export const User = model<TUser>('User', userSchema);

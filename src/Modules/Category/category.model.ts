import mongoose, { Schema } from "mongoose";
import { TCategory } from "./category.interface";

const categorySchema=new Schema<TCategory>({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
    }
},{timestamps:true})

export const Category=mongoose.model<TCategory>('category',categorySchema)
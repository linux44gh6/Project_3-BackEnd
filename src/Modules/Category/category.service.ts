import { TCategory } from "./category.interface";

const createCategory=async(payload:TCategory)=>{
    console.log(payload);
}

export const categoryService={
    createCategory
}
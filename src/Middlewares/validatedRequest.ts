import catchAsync from "../Utils/catchAsync";
import {AnyZodObject} from 'zod'

const validateRequest=(schema:AnyZodObject)=>{
    return catchAsync(async(req,res,next)=>{
        await schema.parseAsync({
            body:req.body,
            cookies:req.cookies
        })
        next()
    })
}

export default validateRequest
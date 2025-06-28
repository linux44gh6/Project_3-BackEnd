/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import { appError } from "../../App/Errors/AppError";
import { generateOrderId } from "./Order.connstans";
import { TOrder } from "./Order.interface";
import Order from "./Order.model";

const createOrder= async(payload:TOrder,userId:any,userEmail:string)=>{
    const orderId=generateOrderId()
   console.log(payload);
    if(!payload?.products){
        throw new appError(StatusCodes.BAD_REQUEST,'please Select products')
    }
    const newData={
        ...payload,
        userId,
        userEmail,
        orderId
    }
    const result=await Order.create(newData)
    return result
}
const getAllOrder=async({email}:{email:string})=>{
    const result= await Order.find({userEmail:email})
    .populate('userId')
    .populate('products.productId')
    
return result
}
const getAllUsersOrder=async()=>{
    const result= await Order.find()
    .populate('userId')
    .populate('products.productId')
return result
}

const updateOrder = async (id:string, payload:any) => {
    const result = await Order.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });
    return result;
};

export  const orderService={
    createOrder,
    getAllOrder,
    getAllUsersOrder,
    updateOrder
}
import { TOrder } from "./Order.interface";
import Order from "./Order.model";

const createOrder= async(payload:TOrder,userId:string,userEmail:string)=>{
    const newData={
        ...payload,
        userId,
        userEmail
    }
    const result=await Order.create(newData)
    return result
}

export  const orderService={
    createOrder
}
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
const getALlOrder=async({email})=>{
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

const updateOrder = async (id, payload) => {
    const result = await Order.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });
    return result;
};

export  const orderService={
    createOrder,
    getALlOrder,
    getAllUsersOrder,
    updateOrder
}
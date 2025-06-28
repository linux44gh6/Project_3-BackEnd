import { Types } from "mongoose";

export type TOrder = {
  orderId?:number
  userId:Types.ObjectId; 
  userEmail:string
  products: {
    productId: Types.ObjectId;
    quantity: number;
  }[];
  totalAmount: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"; 
};

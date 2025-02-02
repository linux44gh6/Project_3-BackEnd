import { Types } from "mongoose";

export type TOrder = {
  userId:Types.ObjectId; 
  userEmail:string
  products: {
    productId: Types.ObjectId;
    quantity: number;
  }[];
  totalAmount: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"; 
};

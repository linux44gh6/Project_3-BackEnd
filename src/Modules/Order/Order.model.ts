import mongoose, { Schema } from "mongoose";
import { TOrder } from "./Order.interface";
const OrderSchema = new Schema<TOrder>({
  userId: { type:Schema.Types.ObjectId, ref: "User", required: true },
  userEmail:{
    type:String,
    required:true
  },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, default: 1 }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], 
    default: "Pending" 
  },
});
const Order = mongoose.model<TOrder>("Order", OrderSchema);
export default Order;

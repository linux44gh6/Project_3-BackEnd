import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';


const ProductPostSchema = new Schema<TProduct>(
  {
    title: {
      type: String,
      required:true
    },
    description: {
      type: String,
      required:true
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
    },
    price: {
      type: Number,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Products = model<TProduct>('Products', ProductPostSchema);

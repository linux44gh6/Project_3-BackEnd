import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';
import { number } from 'zod';

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
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = model<TProduct>('Products', ProductPostSchema);

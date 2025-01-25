import { Types } from 'mongoose';

export type TProduct = {
  title: string;
  description: string;

  image:string,
  rating:number
  isPublished: boolean;
};

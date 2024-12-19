// import { Types } from 'mongoose';

export type TBlogPost = {
  title: string;
  content: string;
  author: string
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
};

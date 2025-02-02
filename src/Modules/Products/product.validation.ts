import { z } from 'zod';

const BlogPostValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    price: z.number({ required_error: 'Price is required' }),
    description: z.string({ required_error: 'Content is required' }),
    isPublished: z.boolean().optional().default(true),
  }),
});

const BlogPostUpdateValidationSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })

      .optional(),
    content: z.string({ required_error: 'Content is required' }).optional(),
    isPublished: z.boolean().optional().default(true),
  }),
});

export const blogValidation = {
  BlogPostValidationSchema,
  BlogPostUpdateValidationSchema,
};

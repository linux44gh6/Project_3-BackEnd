import { z } from "zod";

export const orderValidationSchema = z.object({
  products: z.array(
    z.object({
      productId: z.string().min(1, "Product ID is required"),
      quantity: z.number().int().positive("Quantity must be a positive integer"),
    })
  ).min(1, "Order must contain at least one product"),

  totalAmount: z.number().positive("Total amount must be greater than zero"),

  status: z.enum(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]),
});

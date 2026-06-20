import { Product_Category, Product_Size } from '@prisma/client';
import { z } from 'zod';


const Create_Product_Zod_Type = z.object({
    body: z.object({
        name: z.string(),
        description: z.string().optional(),
        price: z.number(),
        price_off: z.number().optional(),
        images: z.array(z.string()),
        is_featured: z.boolean().optional(),
        is_new: z.boolean().optional(),
        is_best_selling: z.boolean().optional(),
        is_free_shipping: z.boolean().optional(),
        in_stock: z.boolean().optional(),
        size: z.nativeEnum(Product_Size),
        category: z.nativeEnum(Product_Category),
        color_ids: z.array(z.string()),
        type_id: z.string()
    })
})

const Update_Product_Zod_Type = z.object({
  body: Create_Product_Zod_Type.shape.body.partial(),
});


export const Product_Zod_Types = {
    Create_Product_Zod_Type,
    Update_Product_Zod_Type
};
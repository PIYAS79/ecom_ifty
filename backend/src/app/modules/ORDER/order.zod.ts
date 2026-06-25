import { Order_Status } from "@prisma/client";
import z from "zod";








const PRODUCT_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"] as const;



const Ordered_Product_Zod_Type = z.object({
    product_id: z.string(),
    quantity: z.number().min(1),
    color_name: z.string(),
    size: z.enum(PRODUCT_SIZES)
});


const Create_Order_Zod_Type = z.object({
    body: z.object({
        user_name: z.string().min(2),
        user_phone: z.string().min(10).max(15),
        user_address: z.string().min(10),
        products: z.array(Ordered_Product_Zod_Type).min(1),
        total_price: z.number().min(0),
    })
})

const Order_Status_Update_Zod_Type = z.object({
    body: z.object({
        status: z.enum(Order_Status)
    })
})



export const Order_Zod_Types = {
    Create_Order_Zod_Type,
    Order_Status_Update_Zod_Type
}
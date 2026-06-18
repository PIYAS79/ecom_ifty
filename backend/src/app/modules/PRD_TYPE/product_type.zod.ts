import { z } from 'zod';



const Create_Product_Type_Zod_Type = z.object({
    body: z.object({
        name:z.string(),
    })
})

const Update_Product_Type_Zod_Type = z.object({
    body: z.object({
        name:z.string().optional(),
    })
})


export const Product_Type_Zod_Types = {
    Create_Product_Type_Zod_Type,
    Update_Product_Type_Zod_Type
};
import { z } from 'zod';




const Create_Product_Zod_Type = z.object({
    body: z.object({
        // name:z.string(),
    })
})


export const Product_Zod_Types = {
    Create_Product_Zod_Type
};
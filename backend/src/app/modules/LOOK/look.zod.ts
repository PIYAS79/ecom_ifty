import { z } from 'zod';



const Create_Look_Zod_Type = z.object({
    body: z.object({
        image: z.string(),
        galleryId: z.string(),
        product_ids: z.array(z.string())
    })
})



export const Look_Zod_Types = {
    Create_Look_Zod_Type
};
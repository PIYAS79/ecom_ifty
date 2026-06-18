import { z } from 'zod';



const Create_Color_Zod_Type = z.object({
    body: z.object({
        name:z.string(),
        code:z.string(),
    })
})

const Update_Color_Zod_Type = z.object({
    body: z.object({
        name:z.string().optional(),
        code:z.string().optional(),
    })
})


export const Color_Zod_Types = {
    Create_Color_Zod_Type,
    Update_Color_Zod_Type
};
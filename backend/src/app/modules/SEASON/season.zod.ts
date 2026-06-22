
import z from "zod";




const Create_Season_Zod_Type = z.object({
    body: z.object({
        name: z.string().min(2),
        description: z.string()
    })
})

const Update_Season_Zod_Type = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
    })
})


export const Season_Zod_Types = {
    Create_Season_Zod_Type,
    Update_Season_Zod_Type,
}
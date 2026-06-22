import z from "zod";



const Create_LookBook_Zod_Type = z.object({
    body: z.object({
        title: z.string().min(2),
        seasonId: z.string(),
        banner: z.string().optional()
    })
})

const Update_LookBook_Zod_Type = z.object({
    body: z.object({
        title: z.string().optional(),
        seasonId: z.string().optional(),
        banner: z.string().optional()
    })
})


export const LookBook_Zod_Types = {
    Create_LookBook_Zod_Type,
    Update_LookBook_Zod_Type,
}
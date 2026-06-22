


import z from "zod";



const Create_Gallery_Zod_Type = z.object({
    body: z.object({
        lookbookId: z.string()
    })
})

const Update_Gallery_Zod_Type = z.object({
    body: z.object({
        lookbookId: z.string()
    })
})


export const Gallery_Zod_Types = {
    Create_Gallery_Zod_Type,
    Update_Gallery_Zod_Type
}

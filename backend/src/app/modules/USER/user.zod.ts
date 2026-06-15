import z from "zod";




const Create_User_Zod_Type = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
        name: z.string(),
    })
})

const Update_User_Zod_Type = z.object({
    body: z.object({
        name: z.string().optional(),
        image: z.string().optional(),
    })
})

const Update_User_Control_Zod_Type = z.object({
    body: z.object({
        email: z.string().email(),
        status: z.enum(["ACTIVE", "BLOCKED"]).optional(),
        role: z.enum(["USER", "ADMIN", "SUPERADMIN"]).optional()
    })
})

export const User_Zod_Types = {
    Create_User_Zod_Type,
    Update_User_Zod_Type,
    Update_User_Control_Zod_Type
}
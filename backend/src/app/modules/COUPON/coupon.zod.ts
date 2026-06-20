import z from "zod";


const Create_Coupon_Zod_Type = z.object({
    body: z.object({
        code: z.string(),
        discount: z.number().min(0).max(100),
    })
})


export const Coupon_Zod_Types = {
    Create_Coupon_Zod_Type,
}
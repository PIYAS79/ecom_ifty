import { Create_Coupon_Type } from "./coupon.interface"
import { prisma } from "../../lib/prisma";
import Final_App_Error from "../../errors/Final_App_Error";
import http_status from "http-status-codes";



const create_coupon = async (data: Create_Coupon_Type) => {
    const result = await prisma.coupon.create({
        data
    })
    return result;
}

const delete_coupon = async (id: string) => {
    const result = await prisma.coupon.delete({
        where: { id }
    })
    return result;
}

const check_coupon = async (code: string) => {
    const result = await prisma.coupon.findUnique({
        where: { code }
    })
    if(!result){
        throw new Final_App_Error(http_status.NOT_FOUND, "Coupon not found");
    }
    return result;
}

export const Coupon_Services = {
    create_coupon,
    delete_coupon,
    check_coupon
}
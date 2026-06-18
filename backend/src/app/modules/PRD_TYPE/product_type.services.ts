import { prisma } from "../../lib/prisma"
import { Create_Product_Type_Type, Update_Product_Type_Type } from "./product_type.interface";


const create_product_type = async (data: Create_Product_Type_Type) => {
    const result = await prisma.product_Type.create({
        data
    })
    return result;
}

const update_product_type = async (id: string, data: Update_Product_Type_Type) => {
    const result = await prisma.product_Type.update({
        where: { id },
        data
    })
    return result;
}

const delete_product_type = async (id: string) => {
    const result = await prisma.product_Type.delete({
        where: { id }
    })
    return result;
}

const get_all_product_types = async () => {
    const result = await prisma.product_Type.findMany();
    return result;
}


export const Product_Type_Services = {
    create_product_type,
    update_product_type,
    delete_product_type,
    get_all_product_types
}
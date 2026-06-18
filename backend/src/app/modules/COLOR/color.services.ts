import { Create_Color_Type, Update_Color_Type } from "./color.interface"
import { prisma } from "../../lib/prisma"


const create_color = async (data: Create_Color_Type) => {
    const result = await prisma.color.create({
        data
    })
    return result;
}

const update_color = async (id: string, data: Update_Color_Type) => {
    const result = await prisma.color.update({
        where: { id },
        data
    })
    return result;
}

const delete_color = async (id: string) => {
    const result = await prisma.color.delete({
        where: { id }
    })
    return result;
}

export const Color_Services = {
    create_color,
    update_color,
    delete_color
}
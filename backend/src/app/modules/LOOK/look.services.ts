import { Create_Look_Type } from "./look.interface"
import { prisma } from "../../lib/prisma";
import Final_App_Error from "../../errors/Final_App_Error";
import http_status from "http-status-codes";


const create_look = async (data: Create_Look_Type) => {

    const gallery = await prisma.gallery.findUnique({
        where: {
            id: data.galleryId
        }
    })
    if (!gallery) {
        throw new Final_App_Error(http_status.NOT_FOUND, "Gallery not found");
    }

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: data.product_ids
            }
        },
        select: { id: true }
    })
    if (products.length !== data.product_ids.length) {
        throw new Final_App_Error(http_status.NOT_FOUND, "One or more products were not found.");
    }

    const new_look = await prisma.look.create({
        data: {
            image: data.image,
            galleryId: data.galleryId,
            products: {
                connect: data.product_ids.map((id) => ({ id }))
            }
        }
    })

    return new_look;
}

const delete_look = async (lookId: string) => {
    const look = await prisma.look.findUnique({
        where: {
            id: lookId
        }
    })
    if (!look) {
        throw new Final_App_Error(http_status.NOT_FOUND, "Look not found");
    }

    const result = await prisma.look.delete({
        where: {
            id: lookId
        }
    })

    return result;
}

export const Look_Services = {
    create_look,
    delete_look
}
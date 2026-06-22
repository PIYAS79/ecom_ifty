import { Create_Gallery_Type } from "./gallery.interface";
import { prisma } from "../../lib/prisma";
import Final_App_Error from "../../errors/Final_App_Error";
import http_status from "http-status-codes";



const create_gallery = async (data: Create_Gallery_Type) => {
    const gallery = await prisma.gallery.findFirst({
        where: { lookbookId: data.lookbookId }
    })
    if (gallery) {
        throw new Final_App_Error(http_status.CONFLICT, "Gallery already exists for this lookbook");
    }
    const result = await prisma.gallery.create({
        data: {
            lookbookId: data.lookbookId
        }
    })
    return result;
}

const update_gallery = async (galleryId: string, lookbookId: string) => {

    const gallery = await prisma.gallery.findUnique({
        where: { id: galleryId }
    })
    if (!gallery) {
        throw new Final_App_Error(http_status.NOT_FOUND, "Gallery not found");
    }
    const lookbook = await prisma.lookBook.findUnique({
        where: { id: lookbookId },
        select: { gallery: true }
    })
    if (lookbook?.gallery) {
        throw new Final_App_Error(http_status.CONFLICT, "Gallery already exists for this lookbook");
    }
    const result = await prisma.gallery.update({
        where: { id: galleryId },
        data: { lookbookId }
    })

    return result;
}

const get_gallery_by_lookbookId = async (lookbookId: string) => {
    const gallery = await prisma.gallery.findFirst({
        where: { lookbookId },
        include: {
            looks: {
                include: {
                    products: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            price_off: true,
                            percent_off: true,
                            images: true,
                            colors: true,
                            is_new: true,
                        }
                    }
                }
            }
        }
    })
    if (!gallery) {
        throw new Final_App_Error(http_status.NOT_FOUND, "Gallery not found");
    }
    return gallery;
}




export const Gallery_Services = {
    create_gallery,
    update_gallery,
    get_gallery_by_lookbookId
}
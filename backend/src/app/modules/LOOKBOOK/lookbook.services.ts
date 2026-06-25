import Final_App_Error from "../../errors/Final_App_Error";
import { prisma } from "../../lib/prisma";
import { Create_LookBook_Type, Update_LookBook_Type } from './lookbook.interface';
import http_status from "http-status-codes";


const create_lookbook = async (data: Create_LookBook_Type) => {

    const season = await prisma.season.findUnique({
        where: { id: data.seasonId },
        select: { lookBook: true }
    });
    console.log(season);

    if (!season) {
        throw new Final_App_Error(http_status.NOT_FOUND, 'Season not found');
    }
    if (season.lookBook !== null) {
        throw new Final_App_Error(http_status.BAD_REQUEST, 'LookBook already exists for this season');
    }
    const result = await prisma.lookBook.create({
        data
    })
    return result;
}

const update_lookbook = async (lookbookId: string, data: Update_LookBook_Type) => {
    const lookbook = await prisma.lookBook.findUnique({
        where: { id: lookbookId }
    })
    if (!lookbook) {
        throw new Final_App_Error(http_status.NOT_FOUND, 'LookBook not found');
    }
    if (data.seasonId) {
        const season = await prisma.season.findUnique({
            where: { id: data.seasonId },
            select: { lookBook: true }
        });
        if (!season) {
            throw new Final_App_Error(http_status.NOT_FOUND, 'Season not found');
        }
        if (season.lookBook !== null) {
            throw new Final_App_Error(http_status.BAD_REQUEST, 'LookBook already exists for this season');
        }
    }
    const result = await prisma.lookBook.update({
        where: { id: lookbookId },
        data
    })

    return result;
}

const get_all_lookbooks = async () => {
    const result = await prisma.lookBook.findMany({
        include: {
            season: true,
        }
    })
    return result;
}

const delete_lookbook = async (lookbookId: string) => {
    const lookbook = await prisma.lookBook.findUnique({
        where: { id: lookbookId },
        include: {
            gallery: {
                include: {
                    looks: true
                },
            },
        }
    })
    if (!lookbook) {
        throw new Final_App_Error(http_status.NOT_FOUND, 'LookBook not found');
    }
    const lookbookIds = lookbook.gallery?.looks?.map(one => one.id) || [];
    const result = await prisma.$transaction(async (tc) => {
        // delete looks
        if (lookbookIds.length > 0) {
            await tc.look.deleteMany({
                where: {
                    id: {
                        in: lookbookIds
                    }
                }
            })
        }
        // delete gallery 
        if (lookbook.gallery?.id) {
            await tc.gallery.delete({
                where: {
                    id: lookbook.gallery?.id as string
                }
            })
        }
        // delete lookbook
        const res = await tc.lookBook.delete({
            where: {
                id: lookbook.id
            }
        })
        return res;
    })
    return result;
}




export const LookBook_Services = {
    create_lookbook,
    update_lookbook,
    get_all_lookbooks,
    delete_lookbook
}
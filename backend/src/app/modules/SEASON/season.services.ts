import { Create_Season_Type } from "./season.interface";
import { prisma } from "../../lib/prisma";
import http_status from "http-status-codes";
import Final_App_Error from "../../errors/Final_App_Error";


const create_season = async (data: Create_Season_Type) => {
    const result = await prisma.season.create({
        data
    })
    return result;
}

const get_all_seasons = async () => {
    const result = await prisma.season.findMany();
    return result;
}

const update_season = async (id: string, data: Partial<Create_Season_Type>) => {
    const season = await prisma.season.findUnique({
        where: { id }
    })
    if (!season) {
        throw new Final_App_Error(http_status.NOT_FOUND, 'Season not found');
    }
    const result = await prisma.season.update({
        where: { id },
        data
    })
    return result;
}

const delete_season = async (id: string) => {
    const season = await prisma.season.findUnique({
        where: { id },
        include: {
            lookBook: {
                include: {
                    gallery: {
                        include: {
                            looks: true
                        }
                    }
                }
            }
        }
    })
    if (!season) {
        throw new Final_App_Error(http_status.NOT_FOUND, 'Season not found');
    }
    const looksIds = season?.lookBook?.gallery?.looks.map(look => look.id) || [];
    const result = await prisma.$transaction(async (tc) => {
        // delete looks
        if (looksIds.length > 0) {
            await tc.look.deleteMany({
                where: {
                    id: { in: looksIds }
                }
            })
        }
        // delete gallery
        if (season?.lookBook?.gallery?.id) {
            await tc.gallery.deleteMany({
                where: {
                    id: season?.lookBook?.gallery?.id as string
                }
            })
        }
        // delete lookbook
        if (season?.lookBook?.id) {
            await tc.lookBook.delete({
                where: {
                    id: season?.lookBook?.id as string
                }
            })
        }
        // delete season
        const res = await tc.season.delete({
            where: {
                id: season?.id as string
            }
        })
        return res;
    })

    return result;
}


export const Season_Services = {
    create_season,
    get_all_seasons,
    update_season,
    delete_season
}
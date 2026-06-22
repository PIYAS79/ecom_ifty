import { Create_Season_Type } from "./season.interface";
import { prisma } from "../../lib/prisma";


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
    const result = await prisma.season.update({
        where: { id },
        data
    })
    return result;
}



export const Season_Services = {
    create_season,
    get_all_seasons,
    update_season
}
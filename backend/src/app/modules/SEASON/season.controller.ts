import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import http_status from "http-status-codes";
import { Season_Services } from "./season.services";


const create_season = Async_Catch(async (req: Request, res: Response) => {
    const result = await Season_Services.create_season(req.body);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Season created successfully',
        data: result,
    });
})

const get_all_seasons = Async_Catch(async (req: Request, res: Response) => {
    const result = await Season_Services.get_all_seasons();
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Seasons fetched successfully',
        data: result,
    });
})

const update_season = Async_Catch(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await Season_Services.update_season(id as string, req.body);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Season updated successfully',
        data: result,
    });
})

const delete_season = Async_Catch(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await Season_Services.delete_season(id as string);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Season deleted successfully',
        data: result,
    });
})



export const Season_Controller = {
    create_season,
    get_all_seasons,
    update_season,
    delete_season
}

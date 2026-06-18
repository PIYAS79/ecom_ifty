import { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import { Color_Services } from "./color.services";
import http_status from "http-status-codes";

const create_color = Async_Catch(async (req: Request, res: Response) => {
    const result = await Color_Services.create_color(req.body);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Color created successfully',
        data: result,
    });
})

const update_color = Async_Catch(async (req: Request, res: Response) => {
    const result = await Color_Services.update_color(req.params.id as string, req.body);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Color updated successfully',
        data: result,
    });
})

const delete_color = Async_Catch(async (req: Request, res: Response) => {
    const result = await Color_Services.delete_color(req.params.id as string);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Color deleted successfully',
        data: result,
    });
})

export const Color_Controller = {
    create_color,
    update_color,
    delete_color
}
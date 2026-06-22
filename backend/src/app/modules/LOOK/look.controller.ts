



import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import http_status from "http-status-codes";
import { Look_Services } from "./look.services";


const create_look = Async_Catch(async (req: Request, res: Response) => {
    const result = await Look_Services.create_look(req.body);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Look created successfully',
        data: result,
    });
})

const delete_look = Async_Catch(async (req: Request, res: Response) => {
    const result = await Look_Services.delete_look(req.params.lid as string);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Look deleted successfully',
        data: result,
    });
})


export const Look_Controller = {
    create_look,
    delete_look
}

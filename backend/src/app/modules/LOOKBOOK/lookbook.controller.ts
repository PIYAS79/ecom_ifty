import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import http_status from "http-status-codes";
import { LookBook_Services } from "./lookbook.services";


const create_lookbook = Async_Catch(async (req: Request, res: Response) => {
    const result = await LookBook_Services.create_lookbook(req.body);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'LookBook created successfully',
        data: result,
    });
})

const update_lookbook = Async_Catch(async (req: Request, res: Response) => {
    const { lid: lookbookId } = req.params;
    const result = await LookBook_Services.update_lookbook(lookbookId as string, req.body);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'LookBook updated successfully',
        data: result,
    });
})

const get_all_lookbooks = Async_Catch(async (req: Request, res: Response) => {
    const result = await LookBook_Services.get_all_lookbooks();
    res.status(http_status.OK).json({
        status: 'success',
        message: 'LookBooks fetched successfully',
        data: result,
    });
})

const delete_lookbook = Async_Catch(async (req: Request, res: Response) => {
    const { lid: lookbookId } = req.params;
    const result = await LookBook_Services.delete_lookbook(lookbookId as string);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'LookBook deleted successfully',
        data: result,
    });
})


export const LookBook_Controller = {
    create_lookbook,
    update_lookbook,
    get_all_lookbooks,
    delete_lookbook
}

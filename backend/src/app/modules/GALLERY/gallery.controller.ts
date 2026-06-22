import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import http_status from "http-status-codes";
import { Gallery_Services } from "./gallery.sevices";


const create_gallery = Async_Catch(async (req: Request, res: Response) => {
    const result = await Gallery_Services.create_gallery(req.body);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Gallery created successfully',
        data: result,
    });
})

const update_gallery = Async_Catch(async (req: Request, res: Response) => {
    const { gid: galleryId } = req.params;
    const { lookbookId } = req.body;
    const result = await Gallery_Services.update_gallery(galleryId as string, lookbookId as string);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Gallery updated successfully',
        data: result,
    });
})

const get_gallery_by_lookbookId = Async_Catch(async (req: Request, res: Response) => {
    const { lookbookId } = req.params;
    const result = await Gallery_Services.get_gallery_by_lookbookId(lookbookId as string);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Gallery fetched successfully',
        data: result,
    });
})


export const Gallery_Controller = {
    create_gallery,
    update_gallery,
    get_gallery_by_lookbookId
}

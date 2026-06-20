import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import http_status from "http-status-codes";
import { Coupon_Services } from "./coupon.services";


const create_coupon = Async_Catch(async (req: Request, res: Response) => {
    const result = await Coupon_Services.create_coupon(req.body);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Coupon created successfully',
        data: result,
    });
})

const delete_coupon = Async_Catch(async (req: Request, res: Response) => {
    const result = await Coupon_Services.delete_coupon(req.params.id as string);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Coupon deleted successfully',
        data: result,
    });
})

const check_coupon = Async_Catch(async (req: Request, res: Response) => {
    const result = await Coupon_Services.check_coupon(req.params.code as string);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Coupon checked successfully',
        data: result,
    });
})




export const Coupon_Controller = {
    create_coupon,
    delete_coupon,
    check_coupon
}
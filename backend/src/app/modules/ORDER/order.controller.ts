import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import http_status from "http-status-codes";
import { Order_Services } from "./order.services";


const create_order_stack = Async_Catch(async (req: Request, res: Response) => {
    const result = await Order_Services.create_order_stack(req.body);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Order stack created successfully',
        data: result,
    });
})

const get_all_order_stacks = Async_Catch(async (req: Request, res: Response) => {
    const result = await Order_Services.get_all_order_stacks();
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Order stacks fetched successfully',
        data: result,
    });
})

const get_order_stack_by_id = Async_Catch(async (req: Request, res: Response) => {
    const order_id = req.params.order_id;
    const result = await Order_Services.get_order_stack_by_id(order_id as string);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Order stack fetched successfully',
        data: result,
    });
})

const update_order_stack_status = Async_Catch(async (req: Request, res: Response) => {
    const order_stack_id = req.params.os_id;
    const status = req.body.status;
    const result = await Order_Services.update_order_stack_status(order_stack_id as string, status);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Order stack status updated successfully',
        data: result,
    });
})

const get_order_records = Async_Catch(async (req: Request, res: Response) => {
    const result = await Order_Services.get_order_records();
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Order records fetched successfully',
        data: result,
    });
})




export const Order_Controller = {
    create_order_stack,
    get_all_order_stacks,
    get_order_stack_by_id,
    update_order_stack_status,
    get_order_records
}
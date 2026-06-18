import { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import http_status from "http-status-codes";
import { Product_Type_Services } from "./product_type.services";

const create_product_type = Async_Catch(async (req: Request, res: Response) => {
    const result = await Product_Type_Services.create_product_type(req.body);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Product Type created successfully',
        data: result,
    });
})

const update_product_type = Async_Catch(async (req: Request, res: Response) => {
    const result = await Product_Type_Services.update_product_type(req.params.id as string, req.body);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Color updated successfully',
        data: result,
    });
})

const delete_product_type = Async_Catch(async (req: Request, res: Response) => {
    const result = await Product_Type_Services.delete_product_type(req.params.id as string);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Product Type deleted successfully',
        data: result,
    });
})

const get_all_product_types = Async_Catch(async (req: Request, res: Response) => {
    const result = await Product_Type_Services.get_all_product_types();
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Product Types fetched successfully',
        data: result,
    });
})

export const Product_Type_Controller = {
    create_product_type,
    update_product_type,
    delete_product_type,
    get_all_product_types
}
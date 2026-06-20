import { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import { Product_Services } from "./product.services";
import http_status from "http-status-codes";


const create_product = Async_Catch(async (req: Request, res: Response) => {
    const result = await Product_Services.create_product(req.body);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Product created successfully',
        data: result,
    });
})

const update_product = Async_Catch(async (req: Request, res: Response) => {
    const result = await Product_Services.update_product(req.params.id as string, req.body);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Product updated successfully',
        data: result,
    });
})

const delete_product = Async_Catch(async (req: Request, res: Response) => {
    const result = await Product_Services.delete_product(req.params.id as string);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Product deleted successfully',
        data: result,
    });
});

const get_all_products = Async_Catch(async (req: Request, res: Response) => {
    const result = await Product_Services.get_all_products();
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Products fetched successfully',
        data: result,
    });
})

const get_product_by_id = Async_Catch(async (req: Request, res: Response) => {
    const result = await Product_Services.get_product_by_id(req.params.id as string);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Product fetched successfully',
        data: result,
    });
})

export const Product_Controllers = {
    create_product,
    update_product,
    delete_product,
    get_all_products,
    get_product_by_id
}
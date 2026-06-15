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


export const Product_Controllers = {
    create_product
}
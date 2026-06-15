import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import { User_Services } from "./user.services";
import http_status from "http-status-codes";


const create_user = Async_Catch(async (req: Request, res: Response) => {
    const result = await User_Services.create_user(req.body);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'User created successfully',
        data: result,
    });
})

const get_all_users = Async_Catch(async (req: Request, res: Response) => {
    const result = await User_Services.get_all_users();
    res.status(http_status.OK).json({
        status: 'success',
        message: 'Users retrieved successfully',
        data: result,
    });
})

const get_user_by_email = Async_Catch(async (req: Request, res: Response) => {
    const result = await User_Services.get_user_by_email(req.params.email as string);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'User retrieved successfully',
        data: result,
    });
})

const update_user = Async_Catch(async (req: Request, res: Response) => {
    const result = await User_Services.update_user(req.params.email as string, req.body);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'User updated successfully',
        data: result,
    });
})

const update_user_control = Async_Catch(async (req: Request, res: Response) => {
    const result = await User_Services.update_user_control(req.body);
    res.status(http_status.OK).json({
        status: 'success',
        message: 'User updated successfully',
        data: result,
    });
})




export const User_Controller = {
    create_user,
    get_all_users,
    get_user_by_email,
    update_user,
    update_user_control
}
import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import { User_Services } from "./user.services";
import type { JwtPayload } from "jsonwebtoken";


const create_user = Async_Catch(async (req: Request, res: Response) => {
    const result = await User_Services.create_user();
    res.status(200).json({
        status: 'success',
        message: 'User created successfully',
        data: result,
    });
})


export const User_Controller = {
    create_user
}

import config from "../../../config";
import Final_App_Error from "../../errors/Final_App_Error";
import { prisma } from "../../lib/prisma";
import { Create_User_Type, Update_User_Control_Type, Update_User_Type } from "./user.interface";
import http_staus from "http-status-codes";
import bcrypt from "bcrypt";


const create_user = async (data: Create_User_Type) => {
    const is_user_exist = await prisma.user.findFirst({ where: { email: data.email } });
    if (is_user_exist) {
        throw new Final_App_Error(http_staus.CONFLICT, "User email already exists");
    }
    const hashed_password = await bcrypt.hash(data.password, Number(config.hash_pass_salt_rounds as unknown as number));
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashed_password
        }
    });
    const { password, ...safe_user } = user;
    return safe_user;
};

const get_all_users = async () => {
    const users = await prisma.user.findMany({
        omit: {
            password: true
        }
    });
    return users;
}

const get_user_by_email = async (email: string) => {
    const user = await prisma.user.findFirst({
        where: { email }, omit: { password: true }
    });
    return user;
}

const update_user = async (email: string, data: Update_User_Type) => {
    const is_user_exist = await prisma.user.findFirst({ where: { email } });
    if (!is_user_exist) {
        throw new Final_App_Error(http_staus.NOT_FOUND, "User not found");
    }
    const udpated_user = await prisma.user.update({
        where: { email },
        data,
        omit: { password: true }
    })
    return udpated_user;
}

const update_user_control = async (data: Update_User_Control_Type) => {
    const is_user_exist = await prisma.user.findFirst({ where: { email: data.email } });
    if (!is_user_exist) {
        throw new Final_App_Error(http_staus.NOT_FOUND, "User not found");
    }
    const updated_user = await prisma.user.update({
        where: { email: data.email },
        data: {
            ...(data.role !== undefined ? { role: data.role } : {}),
            ...(data.status !== undefined ? { status: data.status } : {}),
        },
        omit: { password: true }
    })
    return updated_user;
}



export const User_Services = {
    create_user,
    get_all_users,
    get_user_by_email,
    update_user,
    update_user_control
}
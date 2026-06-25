import { Create_Order_Type } from "./order.interface";
import { prisma } from "../../lib/prisma";
import http_status from "http-status-codes";
import Final_App_Error from "../../errors/Final_App_Error";
import { Order_Status } from "@prisma/client";

const create_order_stack = async (data: Create_Order_Type) => {
    const result = await prisma.$transaction(async (tc) => {
        // at first create a Order Stack
        const order_stack = await tc.order_Stack.create({
            data: {
                user_name: data.user_name,
                user_phone: data.user_phone,
                user_address: data.user_address,
                total_price: data.total_price,
            }
        })
        // then create Ordered Products and connect them to the Order Stack
        await Promise.all(data.products.map(async (product) => {
            const ordered_product = await tc.ordered_Product.create({
                data: {
                    product_id: product.product_id,
                    quantity: product.quantity,
                    color_name: product.color_name,
                    size: product.size,
                    order_StackId: order_stack.id
                }
            })
            return ordered_product;
        }))
        const final_res = await tc.order_Stack.findUnique({
            where: { id: order_stack.id },
        })
        return final_res;
    })
    return result;
}

const get_all_order_stacks = async () => {
    const result = await prisma.order_Stack.findMany({
        include: {
            products: {
                include: {
                    product: {
                        include: {
                            colors: true,
                            type: true
                        }
                    }
                }
            }
        }
    })
    return result;
}

const get_order_stack_by_id = async (order_id: string) => {
    const result = await prisma.order_Stack.findUnique({
        where: { id: order_id },
        include: {
            products: {
                include: {
                    product: {
                        include: {
                            colors: true,
                            type: true
                        }
                    }
                }
            }
        }
    })
    return result;
}

const update_order_stack_status = async (order_stack_id: string, status: Order_Status) => {
    const result = await prisma.$transaction(async (tc) => {
        // ACCEPTED : just update the status to ACCEPTED
        if (status === Order_Status.ACCEPTED) {
            const updated_order_stack = await tc.order_Stack.update({
                where: { id: order_stack_id },
                data: { status: Order_Status.ACCEPTED }
            })
            return updated_order_stack;
        }
        // DELIVERED and CANCELED : udpate satus + create record + delete stack and ordered products
        if (status === Order_Status.DELIVERED || status === Order_Status.CANCELED) {
            const order_stack = await tc.order_Stack.findUnique({
                where: { id: order_stack_id },
                include: {
                    products: {
                        include: {
                            product: true
                        }
                    }
                }
            })
            if (!order_stack) {
                throw new Final_App_Error(http_status.NOT_FOUND, "Order Stack not found");
            }
            // create record in Order table
            const final_record = await tc.order_Record.create({
                data: {
                    user_name: order_stack.user_name,
                    user_phone: order_stack.user_phone,
                    user_address: order_stack.user_address,
                    total_price: order_stack.total_price,
                    status: status,
                    // Prisma expects an array (or specific input); provide array of strings
                    products_x_quantity_x_color: order_stack.products.map(p => `${p.product.name}__x__${p.quantity}__x__${p.color_name}`)
                }
            })
            // delete the order stack and ordered products
            await tc.ordered_Product.deleteMany({
                where: { order_StackId: order_stack_id }
            })
            await tc.order_Stack.delete({
                where: { id: order_stack_id }
            })
            return final_record;
        }
    })

    return result;
}

const get_order_records = async()=>{

    console.log("FIREEEEEEE")
    const result = await prisma.order_Record.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        where:{
            OR:[
                { status: Order_Status.DELIVERED },
                { status: Order_Status.CANCELED }
            ]
        }
    })
    console.log(result);
    return result;
}



export const Order_Services = {
    create_order_stack,
    get_all_order_stacks,
    get_order_stack_by_id,
    update_order_stack_status,
    get_order_records
}
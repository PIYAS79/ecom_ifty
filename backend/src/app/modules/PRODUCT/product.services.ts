import { Create_Product_Type } from "./product.interface";
import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";
import Final_App_Error from "../../errors/Final_App_Error";
import http_status from "http-status-codes";



const create_product = async (data: Create_Product_Type) => {
    const createData: Prisma.ProductCreateInput = {
        name: data.name,
        price: data.price,
        images: data.images,
        size: data.size,
        category: data.category,
        type: {
            connect: {
                id: data.type_id
            }
        },
        colors: {
            connect: data.color_ids.map(id => ({ id }))
        }
    };
    if (data.description !== undefined)
        createData.description = data.description;
    if (data.price_off !== undefined)
        createData.price_off = data.price_off;
    if (data.percent_off !== undefined)
        createData.percent_off = data.percent_off;
    if (data.is_featured !== undefined)
        createData.is_featured = data.is_featured;
    if (data.is_new !== undefined)
        createData.is_new = data.is_new;
    if (data.is_best_selling !== undefined)
        createData.is_best_selling = data.is_best_selling;
    if (data.is_free_shipping !== undefined)
        createData.is_free_shipping = data.is_free_shipping;
    if (data.in_stock !== undefined)
        createData.in_stock = data.in_stock;
    const product = await prisma.product.create({
        data: createData,
        include: {
            colors: true,
            type: true
        }
    });

    return product;
}

// upate everything except color;
const update_product = async (id: string, data: Partial<Create_Product_Type>) => {
    const product = await prisma.product.findUnique({
        where: { id, is_deleted: false },
        include: { type: true }
    })
    if (!product) {
        throw new Final_App_Error(http_status.NOT_FOUND, 'Product not found');
    }
    const { type_id, ...others } = data;
    if (type_id) {
        const type = await prisma.product_Type.findUnique({
            where: { id: type_id }
        })
        if (!type) {
            throw new Final_App_Error(http_status.BAD_REQUEST, 'Invalid Product Type');
        }
        const res = await prisma.product.update({
            where: { id },
            data: {
                type: {
                    connect: {
                        id: type_id
                    }
                }
            },
            include: {
                type: true,
            }
        })
        return res;
    }
    const result = await prisma.product.update({
        where: { id },
        data,
        include: {
            type: true
        }
    })
    return result
    return product
}

const delete_product = async (id: string) => {
    const result = await prisma.product.update({
        where: { id },
        data: {
            is_deleted: true
        }
    })
    return result;
}

const get_all_products = async () => {
    const products = await prisma.product.findMany({
        where: { is_deleted: false },
        select: {
            id: true,
            name: true,
            price: true,
            price_off: true,
            percent_off: true,
            images: true,
            is_featured: true,
            is_new: true,
            is_best_selling: true,
            is_free_shipping: true,
            in_stock: true,
            category: true,
            type: true,
        }
    })
    return products;
}

const get_product_by_id = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: { id, is_deleted: false },
        include: {
            colors: true,
            type: true
        }
    })
    if (!product) {
        throw new Final_App_Error(http_status.NOT_FOUND, 'Product not found');
    }
    return product;
};



export const Product_Services = {
    create_product,
    update_product,
    delete_product,
    get_all_products,
    get_product_by_id
}
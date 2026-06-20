import { Create_Product_Type } from "./product.interface";
import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";




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

export const Product_Services = {
    create_product
}
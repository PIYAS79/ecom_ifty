import { Order_Status, Product_Size } from "@prisma/client";


export type Ordered_Product_Type = {
    product_id: string;
    quantity: number;
    color_name: string;
    size: Product_Size;
}

export type Create_Order_Type = {
    user_name: string;
    user_phone: string;
    user_address: string;
    products: Ordered_Product_Type[];
    total_price: number;
}
import { Product_Category, Product_Size } from "@prisma/client"


export type Create_Product_Type = {
    name: string
    description?: string
    price: number
    price_off?: number
    percent_off?: number
    images: string[]
    is_featured?: boolean
    is_new?: boolean
    is_best_selling?: boolean
    is_free_shipping?: boolean
    in_stock?: boolean
    sizes: Product_Size[]
    category: Product_Category
    color_ids: string[]
    type_id: string
}


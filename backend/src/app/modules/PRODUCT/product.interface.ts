import { Product_Category, Product_Size } from "@prisma/client"



// model Product {
//   id          String   @id @default(uuid())
//   name        String
//   description String?
//   price       Float
//   price_off   Float?
//   images      String[]
//   is_featured      Boolean @default(false)
//   is_new           Boolean @default(true)
//   is_best_selling  Boolean @default(false)
//   is_free_shipping Boolean @default(false)
//   in_stock         Boolean @default(true)

//   size     Product_Size
//   category Product_Category
//   colors   Color[]
//   type_id  String
//   type     Product_Type     @relation(fields: [type_id], references: [id])

//   createdAt      DateTime     @default(now())
//   updatedAt      DateTime     @updatedAt
//   looks          Look[]
//   order_stack_id String
//   orderStack     Order_Stack? @relation(fields: [order_stack_id], references: [id])

//   @@map("products")
// }

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
    size: Product_Size
    category: Product_Category
    color_ids: string[]
    type_id: string
}
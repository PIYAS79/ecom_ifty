/*
  Warnings:

  - You are about to drop the column `products_x_quantity` on the `order_records` table. All the data in the column will be lost.
  - Added the required column `status` to the `order_records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color_name` to the `ordered_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `ordered_products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Order_Status" AS ENUM ('PROCESSING', 'ACCEPTED', 'DELIVERED', 'CANCELED');

-- AlterTable
ALTER TABLE "order_records" DROP COLUMN "products_x_quantity",
ADD COLUMN     "products_x_quantity_x_color" TEXT[],
ADD COLUMN     "status" "Order_Status" NOT NULL;

-- AlterTable
ALTER TABLE "order_stacks" ADD COLUMN     "status" "Order_Status" NOT NULL DEFAULT 'PROCESSING';

-- AlterTable
ALTER TABLE "ordered_products" ADD COLUMN     "color_name" TEXT NOT NULL,
ADD COLUMN     "size" "Product_Size" NOT NULL;

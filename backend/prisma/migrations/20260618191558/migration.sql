/*
  Warnings:

  - You are about to drop the column `is_organic` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `is_trending` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `_ColorToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_stack_id` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Product_Category" AS ENUM ('MEN', 'WOMEN', 'GOODS');

-- DropForeignKey
ALTER TABLE "_ColorToProduct" DROP CONSTRAINT "_ColorToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_ColorToProduct" DROP CONSTRAINT "_ColorToProduct_B_fkey";

-- AlterTable
ALTER TABLE "colors" ADD COLUMN     "productId" TEXT;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "is_organic",
DROP COLUMN "is_trending",
ADD COLUMN     "category" "Product_Category" NOT NULL,
ADD COLUMN     "in_stock" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_best_selling" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_free_shipping" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "order_stack_id" TEXT NOT NULL,
ADD COLUMN     "price_off" DOUBLE PRECISION,
ADD COLUMN     "type_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ColorToProduct";

-- CreateTable
CREATE TABLE "product_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupons" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_stacks" (
    "id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_phone" TEXT NOT NULL,
    "user_address" TEXT NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_stacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recorded_products" (
    "id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_price" DOUBLE PRECISION NOT NULL,
    "product_quantity" INTEGER NOT NULL,
    "order_record_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recorded_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_records" (
    "id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_phone" TEXT NOT NULL,
    "user_address" TEXT NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coupons_code_key" ON "coupons"("code");

-- AddForeignKey
ALTER TABLE "colors" ADD CONSTRAINT "colors_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "product_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_order_stack_id_fkey" FOREIGN KEY ("order_stack_id") REFERENCES "order_stacks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recorded_products" ADD CONSTRAINT "recorded_products_order_record_id_fkey" FOREIGN KEY ("order_record_id") REFERENCES "order_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

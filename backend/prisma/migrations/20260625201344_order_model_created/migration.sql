/*
  Warnings:

  - You are about to drop the column `order_stack_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `recorded_products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_order_stack_id_fkey";

-- DropForeignKey
ALTER TABLE "recorded_products" DROP CONSTRAINT "recorded_products_order_record_id_fkey";

-- AlterTable
ALTER TABLE "order_records" ADD COLUMN     "products_x_quantity" TEXT[];

-- AlterTable
ALTER TABLE "products" DROP COLUMN "order_stack_id";

-- DropTable
DROP TABLE "recorded_products";

-- CreateTable
CREATE TABLE "ordered_products" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "order_StackId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ordered_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ordered_products_product_id_key" ON "ordered_products"("product_id");

-- AddForeignKey
ALTER TABLE "ordered_products" ADD CONSTRAINT "ordered_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordered_products" ADD CONSTRAINT "ordered_products_order_StackId_fkey" FOREIGN KEY ("order_StackId") REFERENCES "order_stacks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

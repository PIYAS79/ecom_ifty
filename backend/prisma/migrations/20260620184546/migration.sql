-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_order_stack_id_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "order_stack_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_order_stack_id_fkey" FOREIGN KEY ("order_stack_id") REFERENCES "order_stacks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

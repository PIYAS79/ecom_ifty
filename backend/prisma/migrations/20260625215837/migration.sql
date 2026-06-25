/*
  Warnings:

  - The values [PROCESSING] on the enum `Order_Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Order_Status_new" AS ENUM ('PENDING', 'ACCEPTED', 'DELIVERED', 'CANCELED');
ALTER TABLE "public"."order_stacks" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "order_stacks" ALTER COLUMN "status" TYPE "Order_Status_new" USING ("status"::text::"Order_Status_new");
ALTER TABLE "order_records" ALTER COLUMN "status" TYPE "Order_Status_new" USING ("status"::text::"Order_Status_new");
ALTER TYPE "Order_Status" RENAME TO "Order_Status_old";
ALTER TYPE "Order_Status_new" RENAME TO "Order_Status";
DROP TYPE "public"."Order_Status_old";
ALTER TABLE "order_stacks" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "order_stacks" ALTER COLUMN "status" SET DEFAULT 'PENDING';

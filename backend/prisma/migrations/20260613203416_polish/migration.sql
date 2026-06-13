/*
  Warnings:

  - You are about to drop the `_ColorToProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LookToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `productId` on table `colors` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `lookId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ColorToProduct" DROP CONSTRAINT "_ColorToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_ColorToProduct" DROP CONSTRAINT "_ColorToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_LookToProduct" DROP CONSTRAINT "_LookToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_LookToProduct" DROP CONSTRAINT "_LookToProduct_B_fkey";

-- AlterTable
ALTER TABLE "colors" ALTER COLUMN "productId" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "lookId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ColorToProduct";

-- DropTable
DROP TABLE "_LookToProduct";

-- AddForeignKey
ALTER TABLE "colors" ADD CONSTRAINT "colors_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_lookId_fkey" FOREIGN KEY ("lookId") REFERENCES "looks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

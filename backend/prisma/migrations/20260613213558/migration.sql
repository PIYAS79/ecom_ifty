/*
  Warnings:

  - You are about to drop the column `hex_code` on the `colors` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `colors` table. All the data in the column will be lost.
  - You are about to drop the column `lookId` on the `products` table. All the data in the column will be lost.
  - Added the required column `code` to the `colors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "colors" DROP CONSTRAINT "colors_productId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_lookId_fkey";

-- AlterTable
ALTER TABLE "colors" DROP COLUMN "hex_code",
DROP COLUMN "productId",
ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "lookId";

-- CreateTable
CREATE TABLE "_ColorToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ColorToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_LookToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LookToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ColorToProduct_B_index" ON "_ColorToProduct"("B");

-- CreateIndex
CREATE INDEX "_LookToProduct_B_index" ON "_LookToProduct"("B");

-- AddForeignKey
ALTER TABLE "_ColorToProduct" ADD CONSTRAINT "_ColorToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "colors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ColorToProduct" ADD CONSTRAINT "_ColorToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LookToProduct" ADD CONSTRAINT "_LookToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "looks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LookToProduct" ADD CONSTRAINT "_LookToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

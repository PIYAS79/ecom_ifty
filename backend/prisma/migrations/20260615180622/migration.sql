/*
  Warnings:

  - You are about to drop the column `photo` on the `users` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SUPERADMIN';

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "users" DROP COLUMN "photo",
ADD COLUMN     "image" TEXT;

/*
  Warnings:

  - A unique constraint covering the columns `[seasonId]` on the table `lookbooks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "lookbooks_seasonId_key" ON "lookbooks"("seasonId");

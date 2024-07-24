/*
  Warnings:

  - The primary key for the `Follower` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[followersId]` on the table `Follower` will be added. If there are existing duplicate values, this will fail.
  - The required column `Id` was added to the `Follower` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_pkey",
ADD COLUMN     "Id" TEXT NOT NULL,
ADD CONSTRAINT "Follower_pkey" PRIMARY KEY ("Id");

-- CreateIndex
CREATE UNIQUE INDEX "Follower_followersId_key" ON "Follower"("followersId");

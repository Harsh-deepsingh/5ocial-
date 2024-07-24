/*
  Warnings:

  - The primary key for the `Follower` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `followeeId` on the `Follower` table. All the data in the column will be lost.
  - You are about to drop the column `followerId` on the `Follower` table. All the data in the column will be lost.
  - The required column `followersId` was added to the `Follower` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_pkey",
DROP COLUMN "followeeId",
DROP COLUMN "followerId",
ADD COLUMN     "followersId" TEXT NOT NULL,
ADD CONSTRAINT "Follower_pkey" PRIMARY KEY ("followersId");

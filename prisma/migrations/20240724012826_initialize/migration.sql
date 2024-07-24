/*
  Warnings:

  - You are about to drop the `Follower` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_userId_fkey";

-- DropTable
DROP TABLE "Follower";

-- CreateTable
CREATE TABLE "Following" (
    "Id" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Following_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Following_followingId_key" ON "Following"("followingId");

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

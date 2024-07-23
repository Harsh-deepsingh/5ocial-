/*
  Warnings:

  - You are about to drop the column `postId` on the `Action` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_postId_fkey";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "postId";

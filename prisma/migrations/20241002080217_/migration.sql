/*
  Warnings:

  - The primary key for the `Option` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `options` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `optionsId` on the `Option` table. All the data in the column will be lost.
  - The required column `optionId` was added to the `Option` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `text` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Option" DROP CONSTRAINT "Option_pkey",
DROP COLUMN "options",
DROP COLUMN "optionsId",
ADD COLUMN     "optionId" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL,
ADD CONSTRAINT "Option_pkey" PRIMARY KEY ("optionId");

-- CreateTable
CREATE TABLE "Vote" (
    "voteId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("voteId")
);

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("optionId") ON DELETE RESTRICT ON UPDATE CASCADE;

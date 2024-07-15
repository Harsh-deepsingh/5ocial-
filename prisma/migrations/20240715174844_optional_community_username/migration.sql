-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_communityId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "communityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("communityId") ON DELETE SET NULL ON UPDATE CASCADE;

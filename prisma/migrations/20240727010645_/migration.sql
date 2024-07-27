-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "shared" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sharedCommunity" TEXT;

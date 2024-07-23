-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "postId" TEXT;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("postId") ON DELETE SET NULL ON UPDATE CASCADE;

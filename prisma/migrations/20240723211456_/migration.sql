-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_postId_fkey";

-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "commentId" TEXT,
ALTER COLUMN "postId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("postId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("commentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Option" (
    "optionsId" TEXT NOT NULL,
    "options" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("optionsId")
);

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

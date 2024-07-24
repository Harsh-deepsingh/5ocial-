-- CreateTable
CREATE TABLE "Follower" (
    "followerId" TEXT NOT NULL,
    "followeeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Follower_pkey" PRIMARY KEY ("followerId")
);

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

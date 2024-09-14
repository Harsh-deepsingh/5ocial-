import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") ?? "";

  if (!userId) {
    return NextResponse.json({ message: "User ID is required" });
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    await prisma.comment.deleteMany({
      where: { userId },
    });

    await prisma.action.deleteMany({
      where: { userId },
    });

    await prisma.following.deleteMany({
      where: { userId },
    });

    const posts = await prisma.post.findMany({
      where: { userId },
    });

    await prisma.post.deleteMany({
      where: { userId },
    });

    for (const post of posts) {
      await prisma.comment.deleteMany({
        where: { postId: post.postId },
      });

      await prisma.action.deleteMany({
        where: { postId: post.postId },
      });
    }

    return NextResponse.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json({ message: "Error deleting account" });
  }
}

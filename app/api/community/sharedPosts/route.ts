import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../lib/db";

export async function POST(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") ?? "";
  const currentDate = new Date();
  const date = currentDate.toLocaleString();
  try {
    const communityInfo = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        communityId: true,
      },
    });
    if (!communityInfo || !communityInfo.communityId) {
      return NextResponse.json(
        { error: "Community not found for the user" },
        { status: 404 }
      );
    }

    const { sharedCommunity, content, options, imageUrl } = await req.json();

    if (options && options.length > 0) {
      try {
        const post = await prisma.post.create({
          data: {
            content,
            communityId: communityInfo.communityId,
            userId,
            sharedCommunity,
            shared: true,
            date,
          },
        });

        const pollOptionsData = options.map((optionText: string) => ({
          text: optionText,
          postId: post.postId,
        }));

        await prisma.option.createMany({
          data: pollOptionsData,
        });

        return NextResponse.json({
          message: "Poll post created successfully",
          post,
          options: pollOptionsData,
        });
      } catch (error) {
        return NextResponse.json(
          { error: "Error creating poll post", details: error },
          { status: 500 }
        );
      }
    }

    if (imageUrl) {
      try {
        const post = await prisma.post.create({
          data: {
            content,
            communityId: communityInfo.communityId,
            userId,
            imageUrl,
            sharedCommunity,
            shared: true,
            date,
          },
        });

        return NextResponse.json({
          message: "Post with image created successfully",
          content: post.content,
          imageUrl: post.imageUrl,
        });
      } catch (error) {
        return NextResponse.json(
          { error: "Error creating post with image", details: error },
          { status: 500 }
        );
      }
    }

    const sharedPost = await prisma.post.create({
      data: {
        userId,
        communityId: communityInfo.communityId,
        sharedCommunity,
        shared: true,
        content,
        date,
      },
    });

    return NextResponse.json(sharedPost);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

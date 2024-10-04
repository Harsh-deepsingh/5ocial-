import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/db";

export async function POST(req: NextRequest) {
  const { content, imageUrl, options } = await req.json();
  const userId = req.nextUrl.searchParams.get("userId") ?? "";
  const communityId = req.nextUrl.searchParams.get("communityId") ?? "";

  if (!content) {
    return NextResponse.json(
      { error: "Invalid content provided" },
      { status: 400 }
    );
  }

  if (options && options.length > 0) {
    try {
      const post = await prisma.post.create({
        data: {
          content,
          communityId,
          userId,
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

  // If the post has an image URL
  if (imageUrl) {
    try {
      const post = await prisma.post.create({
        data: {
          content,
          communityId,
          userId,
          imageUrl,
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

  // Standard text post
  try {
    const post = await prisma.post.create({
      data: {
        content,
        userId,
        communityId,
      },
    });

    return NextResponse.json({
      message: "Post created successfully",
      content: post.content,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating post", details: error },
      { status: 500 }
    );
  }
}

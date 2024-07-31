import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const { userInput } = await req.json();
    const communityId = req.nextUrl.searchParams.get("communityId") ?? "";
    const searchResult = await prisma.post.findMany({
      where: {
        communityId,
        content: {
          contains: userInput,
        },
      },
      select: {
        content: true,
      },
    });

    return NextResponse.json(searchResult);
  } catch (error) {
    console.log(error);
  }
}

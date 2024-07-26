import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userInput } = await req.json();
    const communityId = req.nextUrl.searchParams.get("communityId") ?? "";
    const searchResult = await client.post.findMany({
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

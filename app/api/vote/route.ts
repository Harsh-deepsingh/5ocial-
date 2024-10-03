import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/db";

export async function POST(req: NextRequest) {
  const optionId = req.nextUrl.searchParams.get("optionId");
  const userId = req.nextUrl.searchParams.get("userId");

  if (!optionId || !userId) {
    return NextResponse.json(
      { error: "Option ID or User ID missing" },
      { status: 400 }
    );
  }

  try {
    const existingVote = await prisma.vote.findFirst({
      where: {
        optionId: optionId,
        userId: userId,
      },
    });

    if (existingVote) {
      return NextResponse.json(
        { error: "You have already voted for this option" },
        { status: 400 }
      );
    }

    const newVote = await prisma.vote.create({
      data: {
        optionId,
        userId,
      },
    });

    return NextResponse.json(
      { message: "Vote successfully cast", vote: newVote },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error casting vote:", error);
    return NextResponse.json(
      { error: "An error occurred while casting your vote" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const optionId = searchParams.get("optionId");

  if (!userId || !optionId) {
    return NextResponse.json(
      { error: "Missing userId or optionId" },
      { status: 400 }
    );
  }

  try {
    const vote = await prisma.vote.findFirst({
      where: {
        userId,
        optionId,
      },
    });

    if (!vote) {
      return NextResponse.json({ hasVoted: false }, { status: 200 });
    }

    const option = await prisma.option.findUnique({
      where: {
        optionId: optionId,
      },
      select: {
        postId: true,
      },
    });

    if (!option) {
      return NextResponse.json({ error: "Option not found" }, { status: 404 });
    }

    const options = await prisma.option.findMany({
      where: {
        postId: option.postId,
      },
      select: {
        optionId: true,
      },
    });

    const votedOptions = options.map((opt) => ({
      id: opt.optionId,
      hasVoted: true,
    }));

    return NextResponse.json(
      {
        hasVoted: true,
        selectedOptionId: vote.optionId,
        votedOptions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking vote status:", error);
    return NextResponse.json(
      { error: "Error checking vote status" },
      { status: 500 }
    );
  }
}

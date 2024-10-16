import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  try {
    const pollOptions = await prisma.option.findMany({
      where: { postId },
      include: {
        votes: true,
      },
    });

    const totalVotes = pollOptions.reduce(
      (acc, option) => acc + option.votes.length,
      0
    );

    if (totalVotes === 0) {
      return NextResponse.json({ message: "No votes yet" }, { status: 200 });
    }

    const pollResults = pollOptions.map((option) => {
      const voteCount = option.votes.length;
      const percentage = Math.round((voteCount / totalVotes) * 100);
      return {
        optionId: option.optionId,
        text: option.text,
        voteCount,
        percentage,
      };
    });

    return NextResponse.json({ pollResults }, { status: 200 });
  } catch (error) {
    console.error("Error fetching poll results:", error);
    return NextResponse.json(
      { error: "Failed to fetch poll results" },
      { status: 500 }
    );
  }
}

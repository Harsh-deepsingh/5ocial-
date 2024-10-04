import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db";

// Check if the user has voted and for which option
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const postId = searchParams.get("postId");

  if (!userId || !postId) {
    return NextResponse.json(
      { error: "Missing userId or postId" },
      { status: 400 }
    );
  }

  try {
    // Find the vote by user and post
    const vote = await prisma.vote.findFirst({
      where: {
        userId,
        option: {
          postId,
        },
      },
    });

    if (!vote) {
      return NextResponse.json({ hasVoted: false }, { status: 200 });
    }

    return NextResponse.json(
      {
        hasVoted: true,
        selectedOptionId: vote.optionId,
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

// Post request to allow voting (or changing vote)
// export async function POST(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const userId = searchParams.get("userId");
//   const optionId = searchParams.get("optionId");

//   if (!userId || !optionId) {
//     return NextResponse.json(
//       { error: "Missing userId or optionId" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Find the option's post
//     const option = await prisma.option.findUnique({
//       where: {
//         optionId: optionId,
//       },
//       select: {
//         postId: true,
//       },
//     });

//     if (!option) {
//       return NextResponse.json({ error: "Option not found" }, { status: 404 });
//     }

//     // Check if the user already voted in this post

//     const existingVote = await prisma.vote.findFirst({
//       where: {
//         userId,
//         option: {
//           postId: option.postId,
//         },
//       },
//     });

//     // If the user has already voted, delete the previous vote
//     if (existingVote) {
//       console.log("got the existing vote ------------------------------->");

//       await prisma.vote.delete({
//         where: { voteId: existingVote.voteId },
//       });
//     }

//     // Create a new vote for the selected option
//     await prisma.vote.create({
//       data: {
//         userId,
//         optionId,
//       },
//     });

//     return NextResponse.json(
//       { message: "Vote cast successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error casting vote:", error);
//     return NextResponse.json({ error: "Error casting vote" }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("userId") ?? "";
    const user = await client.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const email = user.email;
    const domain = email.split("@")[1];
    const domainParts = domain.split(".");
    const collegeName =
      domainParts.length > 2 ? domainParts[1] : domainParts[0];

    let community = await client.community.findFirst({
      where: {
        communityName: collegeName,
      },
      select: {
        communityId: true,
        communityName: true,
      },
    });

    if (!community) {
      community = await client.community.create({
        data: {
          communityName: collegeName,
        },
      });
    }

    const userCommunity = await client.user.update({
      where: {
        id: user.id,
      },
      data: {
        communityId: community.communityId,
      },
    });

    return NextResponse.json({
      email: user.email,
      communityName: community.communityName,
      communityId: community.communityId,
      user: user.communityId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

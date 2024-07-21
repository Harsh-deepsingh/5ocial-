import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const search = req.json();
    console.log("search");
    return NextResponse.json("Listing here");
  } catch (error) {
    console.log(error);
  }
}

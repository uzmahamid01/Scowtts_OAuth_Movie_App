import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { favoriteMovie } = await request.json();

  if (!favoriteMovie || typeof favoriteMovie !== "string") {
    return NextResponse.json({ message: "Favorite movie required" }, { status: 400 });
  }

  await prisma.user.update({
    where: { email: session.user?.email! },
    data: { favoriteMovie },
  });

  return NextResponse.json({ message: "Favorite movie saved" });
}

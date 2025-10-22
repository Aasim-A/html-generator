import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all pages
export async function GET() {
  const pages = await prisma.page.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(pages);
}

// POST create new page
export async function POST(req: Request) {
  const { title, html } = await req.json();
  if (!title || !html)
    return NextResponse.json(
      { error: "Title and HTML are required" },
      { status: 400 },
    );

  const page = await prisma.page.create({
    data: { title, html },
  });

  return NextResponse.json(page);
}

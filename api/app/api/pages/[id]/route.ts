import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Ctx {
  params: Promise<{
    id: string;
  }>;
}

// GET one page
export async function GET(_: Request, { params }: Ctx) {
  const { id } = await params;
  const page = await prisma.page.findUnique({
    where: { id: Number(id) },
  });

  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(page);
}

// PATCH update page
export async function PATCH(req: Request, { params }: Ctx) {
  const { id } = await params;
  const { title, html } = await req.json();
  const updated = await prisma.page.update({
    where: { id: Number(id) },
    data: { title, html },
  });

  return NextResponse.json(updated);
}

// DELETE page
export async function DELETE(_: Request, { params }: Ctx) {
  const { id } = await params;
  await prisma.page.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Deleted successfully" });
}

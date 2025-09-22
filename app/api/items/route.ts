import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") || "";
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);

  const skip = (page - 1) * limit;

  // ✅ Javított where típus
  const where: Prisma.ItemWhereInput = search
    ? {
        name: {
          contains: search,
          mode: Prisma.QueryMode.insensitive, // <-- itt volt a gond
        },
      }
    : {};

  const items = await prisma.item.findMany({
    where,
    take: limit,
    skip,
    orderBy: { name: "asc" },
  });

  const total = await prisma.item.count({ where });

  return NextResponse.json({
    items,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

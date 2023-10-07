import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const body = await request.json();

  try {
    await prisma.boards.create({
      data: {
        name: body.name,
      },
    });

    return Response.json({ message: "success" });
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = async () => {
  const boards = await prisma.boards.findMany();

  return Response.json(boards, { status: 200 });
};

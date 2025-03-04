import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/auth";
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const { text } = await req.json();
    if (!text || text.trim() === "") {
      return new Response("Text is required", { status: 400 });
    }
    const post = await prisma.post.create({
      data: {
        text: text,
        userId: session.user.id,
      },
      select: {
        id: true,
        text: true,
        createdAt: true,
        userId: true,
      },
    });
    return new Response(JSON.stringify(post), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response("Failed to fetch posts", { status: 500 });
  }
}

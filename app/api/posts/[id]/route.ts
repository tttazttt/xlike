import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  console.log(id);
  if (!id) {
    return new Response("Post ID is required", { status: 400 });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }
    if (post.userId !== session.user.id) {
      return new Response("Forbidden", { status: 403 });
    }

    await prisma.post.delete({
      where: {
        id,
      },
    });

    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

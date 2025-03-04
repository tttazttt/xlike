import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PostField from "@/components/PostField";
import { prisma } from "@/lib/prisma";
import { authOptions } from "./api/auth/[...nextauth]/auth";
export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  const posts = await prisma.post.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto flex flex-col gap-4 mt-10">
      <PostField initialPosts={posts} />
    </div>
  );
}

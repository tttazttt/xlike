import { PostItemProps } from "@/types/types";
import React from "react";
import PostItem from "./PostItem";

const PostList = ({
  posts,
  deletePost,
}: {
  posts: PostItemProps[];
  deletePost: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-5 mb-10">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} deletePost={deletePost} />
      ))}
    </div>
  );
};

export default PostList;

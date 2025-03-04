"use client";

import React, { useState } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";
import { PostItemProps } from "@/types/types";
import { motion } from "framer-motion";

const PostField = ({ initialPosts }: { initialPosts: PostItemProps[] }) => {
  const [posts, setPosts] = useState<PostItemProps[]>(initialPosts);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("postデータ取得失敗:", error);
    }
  };

  const deletePost = async (id: string) => {
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("削除に失敗しました");
      }
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("削除エラー:", error);
    }
  };

  const addPost = (newPost: PostItemProps) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <PostForm addPost={addPost} fetchPosts={fetchPosts} />
      <PostList posts={posts} deletePost={deletePost} />
    </motion.div>
  );
};

export default PostField;

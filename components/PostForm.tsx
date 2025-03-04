import React, { useEffect, useRef } from "react";
import { SendIcon } from "./SendIcon";
import { PostItemProps } from "@/types/types";
import ButtonMotionWrapper from "./ButtonMotionWrapper";

const PostForm = ({
  addPost,
  fetchPosts,
}: {
  addPost: (post: PostItemProps) => void;
  fetchPosts: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current?.value.trim()) return;
    const text = inputRef.current?.value;
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        throw new Error("投稿に失敗しました");
      } else {
        const newPost = await res.json();
        addPost(newPost);
        fetchPosts();
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error("投稿エラー", error);
    }
  };

  return (
    <div className="w-[70%] max-w-[700px] mx-auto mb-10 bg-white p-1 rounded-lg shadow-md">
      <form
        className="w-full flex justify-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          ref={inputRef}
          className="p-2 flex-8 focus:outline-none"
        />
        <button className="hover:opacity-40 cursor-pointer pr-2">
          <ButtonMotionWrapper>
            <SendIcon className="flex-2 text-2xl" />
          </ButtonMotionWrapper>
        </button>
      </form>
    </div>
  );
};

export default PostForm;

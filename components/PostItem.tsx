import { PostItemProps } from "@/types/types";
import Image from "next/image";
import React from "react";
import { TrashIcon } from "./TrashIcon";
import ButtonMotionWrapper from "./ButtonMotionWrapper";

const PostItem = ({
  post,
  deletePost,
}: {
  post: PostItemProps;
  deletePost: (id: string) => void;
}) => {
  return (
    <div className="bg-[white] w-[70%] min-h-[54px] max-w-[500px] mx-auto p-5 rounded-lg shadow-md">
      <div className="flex gap-2 items-center">
        <Image
          src={post.user?.image || "/defaultImage.png"}
          alt="user-image"
          width={30}
          height={30}
          className="rounded-full"
        />
        <p className="font-bold">{post.user?.name || "Unknown User"}</p>
        <p className="text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </p>
        <button
          onClick={() => deletePost(post.id)}
          className="text-xl text-red-400 hover:opacity-40 cursor-pointer"
        >
          <ButtonMotionWrapper>
            <TrashIcon />
          </ButtonMotionWrapper>
        </button>
      </div>
      <p>{post.text}</p>
    </div>
  );
};

export default PostItem;

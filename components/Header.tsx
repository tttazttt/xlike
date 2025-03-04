"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LogOutIcon } from "./LogOutIcon";
import { LoginIcon } from "./LoginIcon";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import ButtonMotionWrapper from "./ButtonMotionWrapper";

const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  if (pathname === "/signin") return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="container mx-auto flex justify-between items-center px-10 py-4 border-b border-[#555555] border-solid"
    >
      <h1 className="text-2xl font-bold">
        <Link href="/">xLikeApp</Link>
      </h1>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : session ? (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold">{session.user?.email}</p>
          <div className="flex items-center gap-2">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt="User Image"
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <button
              className="text-2xl hover:opacity-40 cursor-pointer"
              onClick={() => signOut()}
            >
              <ButtonMotionWrapper>
                <LogOutIcon />
              </ButtonMotionWrapper>
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => signIn("google")}>
          <LoginIcon />
        </button>
      )}
    </motion.div>
  );
};

export default Header;

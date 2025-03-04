"use client";
import Image from "next/image";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="grid place-items-center min-h-screen" id="signin-page">
      <div className="bg-white p-15 rounded-lg shadow-xl w-[70%] max-w-[400px] min-h-[300px] text-center">
        <h1 className="text-3xl font-bold mb-15">Login</h1>
        <button
          className="cursor-pointer hover:opacity-50"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <Image
            src="/googleLogo.svg"
            alt="Google Logo"
            width={200}
            height={20}
          />
        </button>
      </div>
    </div>
  );
}

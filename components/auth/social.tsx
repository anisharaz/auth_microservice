"use client";

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export const Social = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-y-8">
      <div className="flex items-center justify-between w-full py-2">
        <hr className="w-full border-t border-gray-200" />
        <span className="px-3 text-sm text-gray-500">Or</span>
        <hr className="w-full border-t border-gray-200" />
      </div>
      <div className="flex items-center w-full gap-x-2">
        <Button
          size="lg"
          className="flex-1 cursor-pointer"
          variant="outline"
          onClick={() => {
            signIn("google", { callbackUrl: "/home" });
          }}
        >
          <FcGoogle />
        </Button>
        <Button
          size="lg"
          className="flex-1 cursor-pointer"
          variant="outline"
          onClick={() => {
            alert("Apple sign-in is not supported yet.");
          }}
        >
          <FaApple />
        </Button>
      </div>
    </div>
  );
};

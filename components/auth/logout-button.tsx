"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <Button
      variant={"destructive"}
      className="hover:cursor-pointer"
      onClick={() => {
        signOut({
          redirectTo: "/auth/login",
        });
      }}
    >
      Logout
    </Button>
  );
}

export default LogoutButton;

"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function UserMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  // If NOT logged in
  if (!session) {
    return (
      <Button onClick={() => window.location.href = "/login"}>
        Login
      </Button>
    );
  }

  const user = session.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full overflow-hidden w-9 h-9 border">
          {user?.image ? (
            <Image
              src={user.image}
              alt="User"
              width={36}
              height={36}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              {user?.name?.charAt(0)}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">

        <DropdownMenuItem
          onClick={() => window.location.href = "/dashboard"}
        >
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => window.location.href = "/links"}
        >
          Links
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => window.location.href = "/settings"}
        >
          Settings
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-red-500"
        >
          Log Out
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
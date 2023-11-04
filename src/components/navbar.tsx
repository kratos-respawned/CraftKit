"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { UserProfile } from "./userProfile";
import { useSession } from "next-auth/react";
import { ChangeTheme } from "./ui/change-theme";
export const Navbar = () => {
  const { data: session } = useSession();
  return (
    <header className=" absolute inset-x-0 top-0 flex items-center justify-between px-4 md:px-20 pt-8">
      <Link
        href="/"
        className="font-cal text-ckAccent font-black text-xl md:text-2xl"
      >
        <span className="text-primary">Craft</span>Kit
      </Link>
      <div className="flex items-center gap-3">
        {session ? (
          <UserProfile user={session.user} />
        ) : (
          <Link href="/login" className={cn(buttonVariants())}>
            Sign In
          </Link>
        )}
        <ChangeTheme />
      </div>
    </header>
  );
};

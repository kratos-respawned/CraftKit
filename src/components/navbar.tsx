"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { UserProfile } from "./userProfile";
import { useSession } from "next-auth/react";
export const Navbar = () => {
  const { data: session } = useSession();
  return (
    <header className=" absolute inset-x-0 top-0 flex justify-between px-4 md:px-20 pt-8">
      <Link href="/" className="font-cal text-xl md:text-2xl">
        <span className="text-primary">Upload</span>ify
      </Link>
      {session ? (
        <UserProfile user={session.user} />
      ) : (
        <Link href="/login" className={cn(buttonVariants())}>
          Sign In
        </Link>
      )}
    </header>
  );
};

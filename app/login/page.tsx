"use client";

import { Button } from "@/components/ui/button";
import Logo from "@/components/common/Logo";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">

      <div className="w-full max-w-md border rounded-xl p-8 shadow-sm space-y-6">

        {/* Logo */}
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Welcome to Share.IT</h1>
          <p className="text-muted-foreground text-sm">
            Login or create an account to start shortening links.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">

          {/* Google Login */}
          <Button
            className="w-full"
            onClick={() => signIn("google")}
          >
            Continue with Google
          </Button>

          {/* Create Account */}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("google")}
          >
            Create Account
          </Button>

        </div>

        {/* Back to Home */}
        <p className="text-center text-sm text-muted-foreground">
          <Link href="/" className="hover:underline">
            ← Back to homepage
          </Link>
        </p>

      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Logo from "@/components/common/Logo";

import { signIn } from "next-auth/react";
import { Twitter, Github, Linkedin, Menu, X, Globe } from "lucide-react";

import { useRouter } from "next/navigation";

import UserMenu from "@/components/auth/UserMenu";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    if (!url) return;

    try {
      setLoading(true);
      setShortUrl("");

      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (data.success) {
        setShortUrl(data.shortUrl);
      } else {
        alert(data.message);
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">

      {/* ================= NAVBAR ================= */}
      <header className="border-b bg-background/80 backdrop-blur relative">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <h1 className="text-2xl font-bold tracking-tight">
            <Logo size="md" />
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="hover:text-primary transition">Products</a>
            <a href="#" className="hover:text-primary transition">Monetize</a>
            <a href="#" className="hover:text-primary transition">About</a>
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">

            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {menuOpen && (
          <div className="md:hidden border-t bg-background px-6 py-6 space-y-6 text-sm font-medium">

            {/* Auth Buttons */}
            <div className="md:flex items-center gap-4">
              <UserMenu />
            </div>

            {/* Navigation */}
            <div className="space-y-3">
              <a href="#" className="block hover:text-primary">Products</a>
              <a href="#" className="block hover:text-primary">Monetize</a>
              <a href="#" className="block hover:text-primary">About</a>
            </div>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl w-full text-center space-y-8 py-20">

          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Shorten, Share & Track
            </h2>
            <p className="text-muted-foreground text-lg">
              Powerful link management for modern creators and businesses.
            </p>
          </div>

          <div className="bg-muted/40 border rounded-xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Paste your long URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-12 w-full"
              />

              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading ? "Shortening..." : "Shorten"}
              </Button>
            </div>

            {shortUrl && (
              <div className="mt-4 text-sm break-all">
                <p className="text-muted-foreground mb-1">
                  Your shortened link:
                </p>
                <a
                  href={shortUrl}
                  target="_blank"
                  className="text-indigo-600 font-medium hover:underline"
                >
                  {shortUrl}
                </a>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t bg-muted/40">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">

          <div className="text-center md:text-left space-y-2">
            <h3 className="text-xl font-bold">
              <Logo size="sm" />
            </h3>

            <p className="text-muted-foreground max-w-md">
              Modern URL shortening and analytics platform built for creators and businesses.
            </p>

            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Share.IT. All rights reserved.
            </p>
          </div>

          <div className="flex gap-6">
            <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
            <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
            <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
          </div>

        </div>
      </footer>
    </div>
  );
}
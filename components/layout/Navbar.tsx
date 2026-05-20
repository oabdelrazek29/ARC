"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArcMark } from "@/components/brand/ArcMark";
import { ClerkAuthSection } from "@/components/layout/ClerkAuthSection";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const arcLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/goals/new", label: "New Goal" },
  { href: "/cognitive", label: "Cognitive OS" },
];

const lmsLinks = [
  { href: "/companions", label: "Tutors" },
  { href: "/my-journey", label: "My Journey" },
  { href: "/subscription", label: "Plans" },
];

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export function Navbar() {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  const linkClass = (href: string) =>
    cn(
      "text-sm text-zinc-400 transition-colors hover:text-cyan-300",
      pathname === href || pathname.startsWith(`${href}/`)
        ? "text-cyan-300"
        : ""
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-zinc-800/60 backdrop-blur-md",
        isLanding ? "bg-zinc-950/70" : "bg-zinc-950/90"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <ArcMark
            size={34}
            className="transition-transform duration-200 group-hover:scale-105"
          />
          <span className="font-bricolage text-lg font-bold tracking-tight text-white">
            ARC
          </span>
        </Link>

        <div className="hidden flex-wrap items-center justify-center gap-6 md:flex">
          {arcLinks.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
          <span className="h-4 w-px bg-zinc-700" aria-hidden />
          {lmsLinks.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {hasClerk ? (
            <ClerkAuthSection />
          ) : (
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Sign in
            </Link>
          )}
          <Link href="/goals/new" className={buttonVariants({ size: "sm" })}>
            Start learning
          </Link>
        </div>
      </nav>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ArcMark } from "@/components/brand/ArcMark";
import { ArcButton } from "@/components/arc-ui/ArcButton";
import { ClerkAuthSection } from "@/components/layout/ClerkAuthSection";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";

const arcLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/cognitive", label: "Cognitive OS" },
  { href: "/settings", label: "Settings" },
];

const lmsLinks = [
  { href: "/companions", label: "Tutors" },
  { href: "/my-journey", label: "Journey" },
];

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export function Navbar() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    cn(
      "arc-nav-link",
      pathname === href || pathname.startsWith(`${href}/`)
        ? "arc-nav-link--active"
        : ""
    );

  return (
    <header className="arc-navbar">
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <ArcMark
            size={32}
            className="transition-transform duration-200 group-hover:scale-105"
          />
          <span className="arc-heading text-lg text-[var(--arc-fg)]">ARC</span>
        </Link>

        <div className="hidden items-center justify-center gap-8 md:flex">
          {arcLinks.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
          <span className="h-4 w-px bg-[var(--arc-border)]" aria-hidden />
          {lmsLinks.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          {hasClerk ? (
            <ClerkAuthSection />
          ) : (
            <Link href="/sign-in" className="arc-btn arc-btn-secondary text-sm">
              Sign in
            </Link>
          )}
          <ArcButton href="/cognitive" className="hidden sm:inline-flex">
            Enter system
          </ArcButton>
        </div>
      </nav>
    </header>
  );
}

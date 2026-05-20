"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ArcMark } from "@/components/brand/ArcMark";
import { ArcButton } from "@/components/arc-ui/ArcButton";
import { ClerkAuthSection } from "@/components/layout/ClerkAuthSection";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cognitive", label: "Cognitive OS" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Settings" },
];

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export function Navbar() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    cn(
      "arc-nav-link",
      pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))
        ? "arc-nav-link--active"
        : ""
    );

  return (
    <header className="arc-navbar">
      <nav className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-4 px-4 md:h-16 md:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <ArcMark
            size={28}
            showGlow={false}
            className="transition-transform duration-200 group-hover:scale-105"
          />
          <span className="arc-heading text-base md:text-lg">ARC</span>
        </Link>

        <div className="hidden items-center justify-center gap-6 md:flex">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          {hasClerk ? (
            <div className="hidden sm:block">
              <ClerkAuthSection />
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="arc-nav-link hidden text-sm sm:inline"
            >
              Sign in
            </Link>
          )}
          <ArcButton href="/cognitive" className="hidden lg:inline-flex">
            Enter system
          </ArcButton>
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}

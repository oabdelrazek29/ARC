"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";

const centerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#pricing", label: "Pricing" },
];

export function Navbar() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    cn(
      "arc-nav-link",
      href === "/"
        ? pathname === "/"
        : href.startsWith("/#")
          ? false
          : pathname === href || pathname.startsWith(`${href}/`)
        ? "arc-nav-link--active"
        : ""
    );

  return (
    <header className="arc-navbar">
      <nav className="mx-auto flex h-14 max-w-[72rem] items-center justify-between gap-4 px-4 md:h-16 md:px-8">
        <Link href="/" className="arc-heading shrink-0 text-lg">
          ARC
        </Link>

        <div className="arc-nav-center">
          {centerLinks.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Link
            href="/sign-in"
            className="arc-nav-link hidden text-sm md:inline"
          >
            Login / Sign up
          </Link>
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}

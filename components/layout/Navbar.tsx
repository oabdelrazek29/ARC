"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandLink } from "@/components/brand/BrandLink";
import { SiteMenu } from "@/components/layout/SiteMenu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { desktopPrimaryLinks } from "@/lib/site-nav";
import { cn } from "@/lib/utils";

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
      <nav className="arc-navbar__inner">
        <BrandLink className="shrink-0" priority />

        <div className="arc-nav-center">
          {desktopPrimaryLinks.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="arc-navbar__actions">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Link
            href="/sign-in"
            className="arc-nav-link hidden text-sm lg:inline"
          >
            Login
          </Link>
          <Link
            href="/settings"
            className="arc-nav-link hidden text-sm lg:inline"
          >
            Settings
          </Link>
          <SiteMenu />
        </div>
      </nav>
    </header>
  );
}

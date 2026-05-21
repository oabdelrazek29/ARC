"use client";

import { usePathname } from "next/navigation";

import { AuthPageLayout } from "@/components/layout/AuthPageLayout";
import { Navbar } from "@/components/layout/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";

const APP_ROUTE =
  /^\/(dashboard|courses|notes|tutor|files|settings)(\/|$)/;

const AUTH_ROUTE = /^\/(sign-in|sign-up)(\/|$)/;

export function LayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const isApp = APP_ROUTE.test(pathname);
  const isAuth = AUTH_ROUTE.test(pathname);

  if (isApp) {
    return <>{children}</>;
  }

  if (isAuth) {
    return <AuthPageLayout>{children}</AuthPageLayout>;
  }

  return (
    <>
      <Navbar />
      <main className="arc-main arc-main--marketing">{children}</main>
      <SiteFooter />
    </>
  );
}

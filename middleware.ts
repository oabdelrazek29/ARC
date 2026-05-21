import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { isClerkConfigured } from "@/lib/clerk/env";

const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/subscription",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/courses(.*)",
  "/dashboard(.*)",
  "/notes(.*)",
  "/tutor(.*)",
  "/files(.*)",
  "/settings(.*)",
  "/api/ai(.*)",
  "/api/webhooks(.*)",
]);

export default isClerkConfigured()
  ? clerkMiddleware(async (auth, req) => {
      if (isPublicRoute(req)) {
        return NextResponse.next();
      }
      await auth.protect();
    })
  : function middleware(_req: NextRequest) {
      return NextResponse.next();
    };

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

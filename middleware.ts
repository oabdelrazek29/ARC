import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

/** Routes anyone can open without an ARC account (marketing + exploration). */
const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/classic",
  "/sign-in(.*)",
  "/cognitive(.*)",
  "/companions(.*)",
  "/api/ai/coach",
  "/api/ai/status",
]);

export default hasClerk
  ? clerkMiddleware(async (auth, req) => {
      if (isPublicRoute(req)) return;
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

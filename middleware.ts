import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

/**
 * Routes anyone can open without signing in to ARC (Clerk).
 * Everything else requires auth when Clerk is configured.
 */
const isPublicRoute = createRouteMatcher([
  // Marketing & pricing
  "/",
  "/about",
  "/classic",
  "/subscription",
  // Clerk auth screens
  "/sign-in(.*)",
  "/sign-up(.*)",
  // Explore (browse and demo; some actions redirect to sign-in in-page)
  "/cognitive(.*)",
  "/companions(.*)",
  // Settings UI (profile/account sections prompt sign-in when needed)
  "/settings(.*)",
  // Public AI endpoints (homepage coach, status checks)
  "/api/ai(.*)",
]);

export default hasClerk
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

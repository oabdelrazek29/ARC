/** Clerk env helpers — trim values and detect placeholder keys */

const PLACEHOLDERS = new Set(["", "your_key_here"]);

function clean(value: string | undefined): string | undefined {
  const v = value?.trim();
  if (!v || PLACEHOLDERS.has(v)) return undefined;
  return v;
}

export function getClerkPublishableKey(): string | undefined {
  return clean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
}

export function getClerkSecretKey(): string | undefined {
  return clean(process.env.CLERK_SECRET_KEY);
}

export function isClerkConfigured(): boolean {
  const pk = getClerkPublishableKey();
  const sk = getClerkSecretKey();
  return Boolean(pk?.startsWith("pk_") && sk?.startsWith("sk_"));
}

export function getClerkAfterAuthUrl(): string {
  return (
    clean(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL) ??
    "/dashboard"
  );
}

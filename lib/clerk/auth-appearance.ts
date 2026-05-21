/** Hide duplicate Clerk headers — ARC shell provides title/lead */
export const clerkAuthAppearance = {
  elements: {
    rootBox: "w-full",
    cardBox: "w-full shadow-none",
    card: "shadow-none border-0 bg-transparent p-0",
    header: "hidden",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
    footer: "hidden",
    socialButtonsBlockButton:
      "border border-[var(--arc-border)] bg-[var(--arc-surface)]",
    formFieldInput:
      "bg-[var(--arc-bg)] border-[var(--arc-border)] text-[var(--arc-fg)]",
    formButtonPrimary:
      "bg-[var(--arc-accent)] text-[#0a0a0a] hover:bg-[var(--arc-accent-hover)]",
    footerActionLink: "text-[var(--arc-accent)]",
  },
};

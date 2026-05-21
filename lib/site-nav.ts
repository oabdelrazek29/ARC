export type SiteNavLink = {
  href: string;
  label: string;
  description?: string;
};

export type SiteNavSection = {
  title: string;
  links: SiteNavLink[];
};

/** Mobile / overlay menu — v2 pages only */
export const siteMenuSections: SiteNavSection[] = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home", description: "Landing overview" },
      { href: "/about", label: "About", description: "What ARC is" },
      { href: "/courses", label: "Courses", description: "Structured learning paths" },
      { href: "/#pricing", label: "Pricing", description: "Plans and access" },
    ],
  },
  {
    title: "Workspace",
    links: [
      { href: "/dashboard", label: "Dashboard", description: "Progress and overview" },
      { href: "/courses", label: "Courses", description: "Browse and continue" },
      { href: "/notes", label: "Notes", description: "Capture and connect ideas" },
      { href: "/files", label: "Files & Lectures", description: "Uploads and summaries" },
      { href: "/tutor", label: "AI Tutor", description: "Ask about your material" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/sign-in", label: "Login" },
      { href: "/sign-up", label: "Sign up" },
      { href: "/settings", label: "Settings", description: "Profile and preferences" },
    ],
  },
];

/** Clarity top nav: Home · Courses · About · Pricing */
export const desktopPrimaryLinks: SiteNavLink[] = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/#pricing", label: "Pricing" },
];

export const settingsNavLinks: SiteNavLink[] = [
  { href: "/settings/profile", label: "Profile" },
  { href: "/settings/account", label: "Account" },
  { href: "/settings/preferences", label: "Preferences" },
  { href: "/settings/notifications", label: "Notifications" },
  { href: "/settings/privacy", label: "Privacy" },
];

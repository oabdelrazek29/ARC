export type SiteNavLink = {
  href: string;
  label: string;
  description?: string;
};

export type SiteNavSection = {
  title: string;
  links: SiteNavLink[];
};

/** Shared navigation for the site menu (mobile + desktop). */
export const siteMenuSections: SiteNavSection[] = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home", description: "Landing and overview" },
      { href: "/about", label: "About", description: "How ARC works" },
      { href: "/#pricing", label: "Pricing", description: "Plans and access" },
    ],
  },
  {
    title: "Learn",
    links: [
      {
        href: "/cognitive",
        label: "Cognitive OS",
        description: "Graphs and cognitive adviser",
      },
      {
        href: "/companions",
        label: "Tutors",
        description: "Voice learning companions",
      },
      { href: "/classic", label: "Classic view", description: "Original ARC landing" },
    ],
  },
  {
    title: "Your learning",
    links: [
      { href: "/dashboard", label: "Dashboard", description: "Progress and goals" },
      { href: "/my-journey", label: "My journey", description: "Timeline and milestones" },
      { href: "/goals/new", label: "New goal", description: "Start a learning path" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/sign-in", label: "Login / Sign up" },
      { href: "/settings/profile", label: "Profile" },
      { href: "/settings/account", label: "Account & security" },
      { href: "/settings/preferences", label: "Preferences" },
      { href: "/settings/privacy", label: "Privacy & data" },
    ],
  },
];

export const desktopPrimaryLinks: SiteNavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/cognitive", label: "Cognitive" },
  { href: "/companions", label: "Tutors" },
  { href: "/#pricing", label: "Pricing" },
];

export const settingsNavLinks: SiteNavLink[] = [
  { href: "/settings/profile", label: "Profile" },
  { href: "/settings/account", label: "Account" },
  { href: "/settings/preferences", label: "Preferences" },
  { href: "/settings/notifications", label: "Notifications" },
  { href: "/settings/privacy", label: "Privacy" },
];

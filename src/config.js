// Real brand endpoints / links carried over from the production sommify site.
export const CONTACT_ENDPOINT = "https://api.sommify.ai/user/contact";
export const FOUNDER_EMAIL = "jacob@sommify.ai";
export const BOOKING_URL =
  "https://calendar.google.com/calendar/u/0/appointments/AcZssZ2mzIg5lKAVFzLu7R4umL4rgYYr7WV8yIOHwA8=?gv=true";
export const ROADSHOW_URL = "https://roadshow.sommify.ai";
export const TUTORIAL_VIDEO_URL = "https://youtu.be/tBCFX6vdcZQ";

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/sommifyai/",
  instagram: "https://www.instagram.com/sommify.ai/",
  youtube: "https://www.youtube.com/@sommifyAI",
  crunchbase: "https://www.crunchbase.com/organization/sommifyai",
};

// Ordered list rendered in the footer + Engage social rows.
export const SOCIALS = [
  { n: "linkedin", label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  // { n: "instagram", label: "Instagram", href: SOCIAL_LINKS.instagram },
  // { n: "youtube", label: "YouTube", href: SOCIAL_LINKS.youtube },
  // { n: "crunchbase", label: "Crunchbase", href: SOCIAL_LINKS.crunchbase },
];

// Brand backgrounds shown on hover (icon/text turn white over these).
export const SOCIAL_BRAND = {
  linkedin: "#0A66C2",
  instagram:
    "linear-gradient(45deg, #F58529 0%, #DD2A7B 40%, #8134AF 70%, #515BD4 100%)",
  youtube: "#FF0000",
  crunchbase: "#146AFF",
};

// Section ids used by the nav for scroll + active-section highlighting.
// `desktop: true` links show in the desktop pill nav; the mobile menu shows all.
// Listed in page order so the scrollspy highlight advances naturally.
export const SECTIONS = [
  { id: "platform", label: "Platform", desktop: true },
  { id: "how-it-works", label: "How it works", desktop: true },
  { id: "pricing", label: "Pricing", desktop: true },
  { id: "news", label: "News", desktop: false },
];

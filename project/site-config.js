/* ─────────────────────────────────────────────────────────────
   Stuart White — Single source of truth for links, booking URLs,
   nav and class schedule. Change things HERE, nowhere else.
   New group classes can be added to CLASSES without touching pages.
   Loaded via <script src="site-config.js"> in each page's <helmet>;
   available as window.SW_CONFIG by render time.
   ───────────────────────────────────────────────────────────── */
window.SW_CONFIG = {
  email: "hello@stuart-white.co.uk",
  year: new Date().getFullYear(),

  // ── Booking / scheduler endpoints (Calendly + Stripe) ──
  calendly: {
    call:   "https://calendly.com/hello-stuart-white/call-with-stu",     // free 15-min discovery
    pt:     "https://calendly.com/hello-stuart-white/pt-with-stu",       // £35 PT session, Stripe at booking
    commfit:"https://calendly.com/hello-stuart-white/commfit-class",     // £5 group class, Stripe at booking
  },

  // Online coaching flow: intake form (free first week, pay after trial)
  intakeUrl: "intake.dc.html",
  ptIntakeUrl: "ptintake.dc.html",
  clientPortalUrl: "https://my.ptdistinction.com",

  // ── Primary nav (flat, four links + one persistent CTA) ──
  nav: [
    { label: "Online coaching",   href: "online-coaching.dc.html" },
    { label: "Personal training", href: "personal-training.dc.html" },
    { label: "Group classes",     href: "group-classes.dc.html" },
    { label: "About",             href: "about.dc.html" },
  ],
  ctaLabel: "Get started",
  ctaHref: "home.dc.html#three-ways-in",

  // ── Group classes: a LIST so more can be added as siblings ──
  classes: [
    {
      id: "commfit",
      name: "CommFit",
      strap: "Community fitness",
      day: "Wednesdays",
      time: "7pm",
      place: "The field opposite Fellside Primary School, Whickham",
      price: "£5",
      priceNote: "a session",
      kit: "Dumbbells, kettlebells and sandbags",
      blurb: "A mix of cardio and resistance work, scaled to you on the night. Total beginners train next to regulars.",
      bookUrl: "https://calendly.com/hello-stuart-white/commfit-class",
    },
  ],
};

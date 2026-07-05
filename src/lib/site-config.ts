// Single source of truth for links, booking URLs, nav and class schedule.
// Change things HERE, nowhere else. New group classes can be added to
// CLASSES without touching page code.

export const SITE = {
  email: 'hello@stuart-white.co.uk',
  year: new Date().getFullYear(),
};

// Booking / scheduler endpoints (Calendly + Stripe)
export const CALENDLY = {
  call: 'https://calendly.com/hello-stuart-white/call-with-stu', // free 15-min discovery
  pt: 'https://calendly.com/hello-stuart-white/pt-with-stu', // £35 PT session, Stripe at booking
  commfit: 'https://calendly.com/hello-stuart-white/commfit-class', // £5 group class, Stripe at booking
};

// Online coaching flow: intake form (free first week, pay after trial)
export const INTAKE_URL = '/intake';
export const PT_INTAKE_URL = '/ptintake';
export const CLIENT_PORTAL_URL = 'https://my.ptdistinction.com';

// Primary nav (flat, four links + one persistent CTA)
export const NAV_LINKS = [
  { label: 'Online coaching', href: '/online-coaching' },
  { label: 'Personal training', href: '/personal-training' },
  { label: 'Group classes', href: '/group-classes' },
  { label: 'About', href: '/about' },
];
export const CTA_LABEL = 'Get started';
export const CTA_HREF = '/#three-ways-in';

// Group classes: a LIST so more can be added as siblings
export const CLASSES = [
  {
    id: 'commfit',
    name: 'CommFit',
    strap: 'Community fitness',
    day: 'Wednesdays',
    time: '7pm',
    place: 'The field opposite Fellside Primary School, Whickham',
    price: '£5',
    priceNote: 'a session',
    kit: 'Dumbbells, kettlebells and sandbags',
    blurb: 'A mix of cardio and resistance work, scaled to you on the night. Total beginners train next to regulars.',
    bookUrl: 'https://calendly.com/hello-stuart-white/commfit-class',
  },
];

import type { IncludedItem, IncludedKey, Plan } from './types';

/** Generic descriptions of everything a plan can include. */
export const includedCatalog: Record<IncludedKey, { title: string; text: string }> = {
  home: {
    title: 'A vetted home',
    text: 'A furnished home we have visited, photographed and tested, with a proper bed, a real kitchen and a lease that suits your dates.',
  },
  workspace: {
    title: 'A place to work',
    text: 'A desk and chair set up for long days, fast tested internet, and coworking nearby if you want company.',
  },
  'airport-pickup': {
    title: 'Airport pickup',
    text: 'Someone waiting at arrivals to drive you home and show you how everything works.',
  },
  sim: {
    title: 'Local SIM',
    text: 'A Portuguese SIM or eSIM with generous data, ready the moment you land.',
  },
  'nif-admin': {
    title: 'NIF and admin help',
    text: 'Help getting your Portuguese tax number (NIF), plus the small admin that makes daily life easier.',
  },
  'welcome-week': {
    title: 'Welcome week',
    text: 'A first week of neighborhood walks, market visits and introductions, so you feel at home quickly.',
  },
  'community-events': {
    title: 'Community events',
    text: 'Regular dinners, walks and meetups with other guests and our people in Portugal.',
  },
  'weekend-escapes': {
    title: 'Weekend escapes',
    text: 'Planned weekends away to other corners of Portugal, booked and arranged for you.',
  },
  'visa-guidance': {
    title: 'Visa guidance',
    text: 'Clear guidance on your options and an introduction to our partner immigration lawyers, who handle the application.',
  },
  'school-guidance': {
    title: 'School guidance',
    text: 'Help shortlisting international or local schools, arranging visits and managing applications.',
  },
};

const item = (key: IncludedKey, text?: string, title?: string): IncludedItem => ({
  key,
  title: title ?? includedCatalog[key].title,
  text: text ?? includedCatalog[key].text,
});

export const plans: Plan[] = [
  {
    slug: 'taster',
    name: 'Taster',
    duration: '1 month',
    tagline: 'A home and workspace to test the life.',
    summary:
      'One month to find out whether Portugal suits you. We set you up in a home with a proper workspace, meet you at the airport and introduce you to your neighborhood, so you can spend the month living rather than organising.',
    fromPerMonth: 2900,
    included: [
      item('home', 'A furnished one-month home in the destination you choose, checked in person by our team.'),
      item('workspace', 'A real desk, a good chair and tested Wi-Fi, so your working days feel normal from day one.'),
      item('airport-pickup', 'A driver at arrivals and a walk-through of your home, the boiler and the nearest bakery.'),
      item('sim', 'A local SIM or eSIM with plenty of data for the whole month.'),
      item('welcome-week', 'A first week of short neighborhood walks and introductions to help you settle fast.'),
      item('community-events', 'An invitation to every guest dinner and meetup that happens during your month.'),
    ],
    sampleMonth: [
      {
        label: 'Week 1',
        title: 'Arrive and settle',
        text: 'Airport pickup, a walk around your neighborhood, the market, the pharmacy and the best coffee nearby. Your desk is ready on Monday morning.',
      },
      {
        label: 'Week 2',
        title: 'Find your rhythm',
        text: 'Work in the mornings, explore in the afternoons. Try the coworking space, join a guest dinner and book a Portuguese taster class.',
      },
      {
        label: 'Week 3',
        title: 'Go a little further',
        text: 'A day trip along the coast or into the hills, a cooking class, and a few evenings out with people you have met.',
      },
      {
        label: 'Week 4',
        title: 'Decide what’s next',
        text: 'A call with your specialist about how it felt, and what a longer season could look like if you want to come back.',
      },
    ],
    faqIds: [
      'whats-included-in-a-plan',
      'schengen-90-180-rule',
      'internet-and-coworking',
      'payment-and-deposits',
      'cancellation-terms',
    ],
    visaNote: 'schengen90',
    image: 'lisbonTram',
    bestFor: ['First-timers', 'Remote workers', 'Couples'],
  },
  {
    slug: 'season',
    name: 'Season',
    duration: 'up to 3 months',
    tagline: 'Long enough to belong, planned to fit short-stay rules.',
    summary:
      'A season of up to three months, designed to fit within the Schengen short-stay rules for visa-exempt travelers. Enough time to learn the language basics, build a routine and make real friends, with weekend escapes to see more of Portugal.',
    fromPerMonth: 2600,
    included: [
      item('home', 'A furnished home for your whole season, chosen with you from homes we have visited and vetted.'),
      item('workspace', 'A dedicated workspace at home and a coworking option nearby for days when you want company.'),
      item('airport-pickup', 'Pickup on arrival and a full walk-through of your home and neighborhood.'),
      item('sim', 'A local SIM or eSIM with generous data, topped up for the length of your stay.'),
      item('nif-admin', 'Help getting a NIF if you need one, plus help with gym memberships, transport cards and local admin.'),
      item('welcome-week', 'A welcome week of walks, market visits and introductions to our local people.'),
      item('community-events', 'Weekly community events, from long dinners to coastal walks and language exchanges.'),
      item('weekend-escapes', 'Two planned weekend escapes to other regions, with transport and stays booked for you.'),
    ],
    sampleMonth: [
      {
        label: 'Week 1',
        title: 'Arrive and unpack properly',
        text: 'Pickup, welcome walk, SIM, transport card and a first market shop. You unpack fully, because this home is yours for the season.',
      },
      {
        label: 'Week 2',
        title: 'Build a routine',
        text: 'A regular coworking day, a weekly Portuguese class and a standing table at the guest dinner. The café starts to know your order.',
      },
      {
        label: 'Week 3',
        title: 'A weekend escape',
        text: 'Two nights somewhere new: the Douro for the vineyards, the Alentejo for the quiet, or the Algarve coast. Booked and arranged by us.',
      },
      {
        label: 'Week 4',
        title: 'Live like a local',
        text: 'A surf lesson, a tile-painting workshop or a long hike, depending on where you are. A check-in call with your specialist to plan the next month.',
      },
    ],
    faqIds: [
      'schengen-90-180-rule',
      'ees-and-etias',
      'whats-included-in-a-plan',
      'changing-destination-mid-season',
      'payment-and-deposits',
    ],
    visaNote: 'schengen90',
    image: 'lisbonRooftopsSea',
    bestFor: ['Career breaks', 'Remote workers', 'Couples'],
  },
  {
    slug: 'full-year',
    name: 'Full year',
    duration: '6–12 months',
    tagline: 'A proper life in Portugal, with the paperwork handled.',
    summary:
      'Six to twelve months to live in Portugal properly. We guide you through the right visa, usually the D8 or D7, and introduce you to our partner immigration lawyers who handle the application. Then we find your home, set up your admin and make sure you are part of a community from the start.',
    fromPerMonth: 2200,
    included: [
      item('home', 'A long-let home on a proper lease, vetted by us and negotiated at a monthly rate that reflects a longer stay.'),
      item('workspace', 'A home office set up for full-time work, plus a coworking membership option nearby.'),
      item('airport-pickup', 'Pickup on arrival, a full home walk-through and help with the first big shop.'),
      item('sim', 'A local SIM or eSIM on day one, and help moving to a Portuguese contract if you want one.'),
      item('nif-admin', 'Help with your NIF, a Portuguese bank account, utility contracts and registering with the local health centre.'),
      item('welcome-week', 'A welcome week to get your bearings, with introductions to neighbors and local services.'),
      item('community-events', 'Year-round community events, so you have friends in town long after the welcome week.'),
      item('weekend-escapes', 'A weekend escape each season to see more of Portugal: wine country, the islands, the mountains.'),
      item('visa-guidance', 'Guidance on the D8 or D7 and an introduction to our partner immigration lawyers, who prepare and submit your application.'),
    ],
    sampleMonth: [
      {
        label: 'Week 1',
        title: 'Land and settle in',
        text: 'Pickup, keys, welcome walk and SIM. We book your first appointments for the bank and any outstanding residence steps.',
      },
      {
        label: 'Week 2',
        title: 'Admin, done together',
        text: 'Bank account, utilities, health centre registration and a transport pass. Your specialist comes along or arranges help where it is useful.',
      },
      {
        label: 'Week 3',
        title: 'Find your people',
        text: 'Start a weekly language class, join a guest dinner and try a club, a choir or a running group. We make the introductions.',
      },
      {
        label: 'Week 4',
        title: 'Look up and around',
        text: 'Your first weekend escape, and a check-in with your specialist about the months ahead: renewals, school terms or a change of scene.',
      },
    ],
    faqIds: [
      'd8-vs-d7',
      'income-requirements',
      'who-handles-visa-applications',
      'nif-and-bank-accounts',
      'taxes',
      'healthcare-and-insurance',
      'renting-monthly-vs-yearly',
    ],
    visaNote: 'd8d7',
    image: 'portoGoldenHour',
    bestFor: ['Remote workers', 'Early retirees', 'Long-term movers'],
  },
  {
    slug: 'family-season',
    name: 'Family season',
    duration: 'a school term (3–4 months) or a full school year',
    tagline: 'A season abroad the whole family will remember.',
    summary:
      'A school term or a full school year in Portugal, planned around your children. We help you choose schools, find a family home near them and set up the routines that make a new country feel safe and fun, with visa guidance for longer stays.',
    fromPerMonth: 4200,
    included: [
      item('home', 'A family home with space for everyone, close to schools, parks and a good weekly market.'),
      item('workspace', 'A quiet workspace away from the living areas, so work and family time stay separate.'),
      item('airport-pickup', 'Pickup with child seats and room for all the luggage, and a home walk-through on arrival.'),
      item('sim', 'Local SIMs or eSIMs for the adults, and advice on a sensible setup for older children.'),
      item('nif-admin', 'Help with NIFs for the whole family, bank accounts and health centre registration.'),
      item('welcome-week', 'A family welcome week: playgrounds, the pediatric clinic, sports clubs and the best ice cream.'),
      item('community-events', 'Family-friendly community events where children make friends and parents find their people.'),
      item('weekend-escapes', 'Weekend escapes planned with children in mind, from farm stays to island beaches.'),
      item('visa-guidance', 'Guidance on visa options for the whole family and an introduction to our partner immigration lawyers.'),
      item('school-guidance', 'Help shortlisting international schools with British, American and IB curricula, or local schools, plus visits and applications.'),
    ],
    sampleMonth: [
      {
        label: 'Week 1',
        title: 'Arrive as a family',
        text: 'Pickup with child seats, a walk to school and the nearest park, and a calm first weekend to let everyone adjust.',
      },
      {
        label: 'Week 2',
        title: 'First days at school',
        text: 'School starts with a visit and an introduction to teachers. We help with uniforms, lunch plans and the school run.',
      },
      {
        label: 'Week 3',
        title: 'After-school life',
        text: 'Surf club, football or swimming for the children, a Portuguese class for the adults, and a family dinner with other guests.',
      },
      {
        label: 'Week 4',
        title: 'A family weekend away',
        text: 'A weekend escape planned for small legs: a farm stay in the Alentejo or a beach town on the coast. Then a check-in with your specialist.',
      },
    ],
    faqIds: [
      'schools-for-children',
      'family-season-timing',
      'd8-vs-d7',
      'healthcare-and-insurance',
      'accessibility',
      'pets',
    ],
    visaNote: 'family',
    image: 'familyBeach',
    bestFor: ['Families', 'School-age children', 'Parents working remotely'],
  },
];

export function getPlan(slug: string): Plan | undefined {
  return plans.find((p) => p.slug === slug);
}

import type { Faq, FaqTab } from './types';

/**
 * Answers are plain text. Tokens such as {d8Income} are replaced at render time
 * from config/visa.ts and config/site.ts, so never hardcode visa figures here.
 * Anything in [BRACKETS] is a PLACEHOLDER term to be confirmed before launch.
 */
export const faqs: Faq[] = [
  // Your stay
  {
    id: 'whats-included-in-a-plan',
    tab: 'your-stay',
    q: 'What is included in a plan?',
    a: 'Every plan includes a vetted home, a proper place to work, airport pickup, a local SIM, a welcome week and our community events. Longer plans add help with your NIF and local admin, planned weekend escapes and, for Full year and Family season, visa guidance with our partner immigration lawyers. Family season also includes school guidance. Flights, food, everyday spending and optional experiences are not included unless we say so.',
  },
  {
    id: 'how-the-specialist-works',
    tab: 'your-stay',
    q: 'How does my specialist work with me?',
    a: 'You have one dedicated specialist from your first call to the day you leave. They help you choose a destination and home, coordinate visa guidance and school visits where relevant, and stay in touch by email or video call throughout your stay. Our local hosts take care of things on the ground, and your specialist makes sure nothing falls between the gaps.',
  },
  {
    id: 'internet-and-coworking',
    tab: 'your-stay',
    q: 'Is the internet good enough for remote work?',
    a: 'Yes. We test the connection in every home before we offer it and list the measured speed on each listing. Most city homes have fibre at 500 Mbps or more. Rural and island homes can be slower, so where needed we add a backup 4G or 5G router. Every destination also has a coworking option nearby, and we can arrange a membership for you.',
  },
  {
    id: 'renting-monthly-vs-yearly',
    tab: 'your-stay',
    q: 'Should I rent monthly or sign a yearly lease?',
    a: 'For stays of up to three months, a furnished monthly rental is usually simplest and gives you flexibility. For six months or more, a longer lease almost always costs less per month and is often needed for residence applications. We negotiate either on your behalf, check the contract and explain the terms in plain English before you sign.',
  },
  {
    id: 'best-months-by-region',
    tab: 'your-stay',
    q: 'When is the best time to go?',
    a: 'It depends on where. Lisbon and Porto are lovely from March to June and September to November. The Algarve has mild, sunny winters, which makes it a favorite from October to April. The Alentejo and the Douro are best in spring and autumn, as July and August can pass 35°C. Madeira is pleasant all year, and the Azores are greenest and calmest from May to October. Each destination page shows typical temperatures and rainfall by month.',
  },
  {
    id: 'driving-and-transport',
    tab: 'your-stay',
    q: 'Do I need a car?',
    a: 'Not in Lisbon, Porto or Coimbra, which have good public transport and fast trains between them. On the coast, in the countryside and on the islands a car makes life much easier, and in Comporta, the Douro and the Azores it is close to essential. We can arrange a long-term rental. Licences from many countries can be used for a limited period, and residents may need to exchange theirs, so check the rules for your licence with us before you travel.',
  },
  {
    id: 'healthcare-and-insurance',
    tab: 'your-stay',
    q: 'What about healthcare and insurance?',
    a: 'Portugal has good public and private healthcare. For short stays you need comprehensive travel or international health insurance, and visa applications normally require proof of health cover. EU travelers can use their European Health Insurance Card for necessary care. Residents can register with the local health centre once their residence is in place. We can point you to clinics, pharmacies and English-speaking doctors in every destination.',
  },
  {
    id: 'what-if-something-goes-wrong',
    tab: 'your-stay',
    q: 'What happens if something goes wrong during my stay?',
    a: 'Contact your specialist or local host at any time. If the boiler breaks, we arrange a repair. If a home falls short of what we promised, we fix it or move you. For anything urgent at night or at weekends, there is an emergency line for guests in season. In a medical emergency, call 112 first, then let us know so we can help.',
  },

  // Payment & booking
  {
    id: 'how-booking-works',
    tab: 'payment-booking',
    q: 'How does booking work?',
    a: 'Start with the season planner or a call with a specialist. We send you a written proposal with homes, dates and a full price. When you are happy, you confirm with a deposit and we reserve your home. Visa guidance, school visits and admin are then scheduled in the months before you arrive.',
  },
  {
    id: 'payment-and-deposits',
    tab: 'payment-booking',
    q: 'How do payments and deposits work?',
    a: 'We ask for a [30]% deposit to confirm your plan and reserve your home. The balance for your first month is due [60] days before arrival, and for longer stays each following month is paid [30] days in advance. A refundable damage deposit of [one month’s rent] is held for the home and returned within [30] days of departure. Exact terms are set out in your proposal.',
  },
  {
    id: 'currencies',
    tab: 'payment-booking',
    q: 'Which currencies can I pay in?',
    a: 'All prices are set in euros. You can view approximate prices in other currencies on the site, but invoices are issued in euros and payable by bank transfer or card. Card payments may carry a [X]% fee.',
  },
  {
    id: 'whats-not-included',
    tab: 'payment-booking',
    q: 'What is not included in the price?',
    a: 'Flights, food, local transport, optional experiences with a listed price, visa application fees, lawyers’ fees for the application itself and school fees are not included. Utilities are included for stays up to three months and, for longer leases, are usually paid directly. Your proposal lists exactly what is and is not covered.',
  },
  {
    id: 'price-changes',
    tab: 'payment-booking',
    q: 'Can the price change after I book?',
    a: 'No. Once your deposit is paid, the price for the confirmed dates and home is fixed. The only exceptions are changes you ask for, such as extra months or a different home, and government fees outside our control.',
  },

  // Cancellations & changes
  {
    id: 'cancellation-terms',
    tab: 'cancellations-changes',
    q: 'What is your cancellation policy?',
    a: 'If you cancel more than [90] days before arrival, we refund everything except a [€500] planning fee. Between [90] and [30] days, we keep the [30]% deposit. Within [30] days, the first month is non-refundable. If your visa is refused despite a complete application, we refund [all payments except the planning fee]. These terms are placeholders and will be confirmed in your proposal.',
  },
  {
    id: 'changing-destination-mid-season',
    tab: 'cancellations-changes',
    q: 'Can I change destination halfway through my season?',
    a: 'Yes, and many guests do: a few months in Lisbon followed by a few on the coast or in Madeira is a lovely way to see more of Portugal. Tell us as early as you can, ideally [30] days ahead. We find the new home, move you and adjust the price to match.',
  },
  {
    id: 'extending-your-stay',
    tab: 'cancellations-changes',
    q: 'Can I extend my stay?',
    a: 'Usually, yes, subject to the home’s availability and your immigration status. If you are visiting under short-stay rules, remember the {schengenDays}-day limit in any {schengenWindow}-day period. Staying longer than that needs a national visa, which must be applied for in advance. Your specialist will tell you what is possible before you commit.',
  },
  {
    id: 'leaving-early',
    tab: 'cancellations-changes',
    q: 'What if I need to leave early?',
    a: 'Life happens. If you need to leave early, let your specialist know. Months already paid are non-refundable, but we will try to re-let the home and refund [50]% of any recovered rent. We strongly recommend travel insurance that covers curtailment.',
  },
  {
    id: 'travel-insurance-cancellation',
    tab: 'cancellations-changes',
    q: 'Do I need travel insurance?',
    a: 'Yes. We ask every guest to have travel insurance that covers cancellation, curtailment and medical care from the day they book. For residence visas, specific health cover is usually required as well, and our partner lawyers will tell you what is accepted.',
  },

  // Visas & admin
  {
    id: 'schengen-90-180-rule',
    tab: 'visas-admin',
    q: 'How long can I stay without a visa?',
    a: 'If you hold a passport that is visa-exempt for the Schengen area, such as a US, UK, Canadian or Australian passport, you can stay up to {schengenDays} days in any {schengenWindow}-day period. That limit covers the whole Schengen area, not just Portugal, and it is a rolling window, so recent trips count. Our Taster and Season plans are designed to fit within it. To stay longer you need a national visa, applied for before you travel. This is guidance only, not legal advice.',
  },
  {
    id: 'd8-vs-d7',
    tab: 'visas-admin',
    q: 'What is the difference between the D8 and the D7 visa?',
    a: 'The D8, often called the digital nomad visa, is for people working remotely for employers or clients outside Portugal. The D7 is for people with regular passive income, such as pensions, rental income, dividends or royalties. Both can lead to residence. Which one fits depends on your income, work and plans, and our partner immigration lawyers, {visaPartner}, will confirm the right route for you. This is guidance only, not legal advice.',
  },
  {
    id: 'income-requirements',
    tab: 'visas-admin',
    q: 'How much income do I need for a D8 or D7 visa?',
    a: 'The D8 currently requires remote-work income of at least {d8Income} a month for a single applicant, which is four times the Portuguese minimum wage. The D7 threshold is linked to the minimum wage, currently around {d7Income} a month for a single applicant. Both rise when the minimum wage rises, and extra amounts apply for a partner and children. Savings and other evidence may also be considered. Your figures will be confirmed by our partner lawyers, {visaPartner}. This is guidance only, not legal advice.',
  },
  {
    id: 'who-handles-visa-applications',
    tab: 'visas-admin',
    q: 'Do you handle my visa application?',
    a: 'We guide you, but we do not submit visa applications ourselves. Applications are prepared and handled by our partner immigration lawyers, {visaPartner}, who are qualified to advise on your case. We help you understand the options, gather documents, and coordinate timings with your home and plan. Final requirements always come from the Portuguese consulate and AIMA. This is guidance only, not legal advice.',
  },
  {
    id: 'nif-and-bank-accounts',
    tab: 'visas-admin',
    q: 'Do I need a NIF and a Portuguese bank account?',
    a: 'A NIF is your Portuguese tax number, and you need one for almost everything: a lease, utilities, a phone contract and opening a bank account. Non-residents can get one through a fiscal representative, which we help arrange. A Portuguese bank account is usually required for visa applications and makes paying rent and bills much easier. We help with both as part of the Season, Full year and Family season plans.',
  },
  {
    id: 'ees-and-etias',
    tab: 'visas-admin',
    q: 'What are EES and ETIAS?',
    a: 'EES, the EU Entry/Exit System, is now in operation. Non-EU travelers register fingerprints and a facial image at the border on their first entry, replacing passport stamps. ETIAS is a separate online travel authorization for visa-exempt travelers, with a fee of {etiasFee}. It is currently {etiasStatus}. Only ever apply through the official EU travel portal. This is guidance only, not legal advice.',
  },
  {
    id: 'taxes',
    tab: 'visas-admin',
    q: 'Will I have to pay tax in Portugal?',
    a: 'It depends on how long you stay, where you are tax resident and your home country’s rules. Spending more than 183 days in Portugal in a year, or having a habitual residence here, can make you tax resident. We do not give tax advice. Please speak to a qualified tax adviser in Portugal and in your home country before you commit to a long stay, and we are happy to introduce you to one.',
  },

  // Families & accessibility
  {
    id: 'schools-for-children',
    tab: 'families-accessibility',
    q: 'What are the options for schools?',
    a: 'Lisbon, Cascais, Porto, the Algarve and Madeira have international schools with British, American and IB curricula, and many children also thrive in Portuguese state or private schools. Places at popular international schools can be limited, so start early, ideally six to nine months ahead. On the Family season plan we help you shortlist schools, arrange visits and manage applications. Fees are paid directly to the school.',
  },
  {
    id: 'family-season-timing',
    tab: 'families-accessibility',
    q: 'Can we come for just one school term?',
    a: 'Yes. Many international schools accept students for a single term, and a term of three to four months is our most popular family season. Note that a stay longer than {schengenDays} days in any {schengenWindow}-day period needs a national visa for visa-exempt travelers, so a full term may require one. We will help you plan dates and visas together.',
  },
  {
    id: 'accessibility',
    tab: 'families-accessibility',
    q: 'Can you plan a season for someone with access needs?',
    a: 'Yes. Tell us what you need and we will only suggest homes that meet it, with step-free access, lifts, walk-in showers or ground-floor bedrooms where required. Some towns, such as Lisbon and Porto, are very hilly and have uneven cobbled streets, while others, like Tavira and Campo de Ourique in Lisbon, are flatter. We will be honest about what each place is like.',
  },
  {
    id: 'pets',
    tab: 'families-accessibility',
    q: 'Can I bring my dog or cat?',
    a: 'Often, yes. Some of our homes accept pets, and Portugal is generally dog-friendly. Pets travelling from outside the EU need a microchip, a rabies vaccination and an animal health certificate, and some countries require a blood test months in advance. We will match you with pet-friendly homes and point you to vets in your destination.',
  },
  {
    id: 'childcare-and-activities',
    tab: 'families-accessibility',
    q: 'Can you arrange childcare and activities?',
    a: 'Yes. We can introduce you to vetted babysitters and nannies, holiday camps and after-school clubs, from surf and football to music and art. Portuguese family life is very child-friendly, and children are welcome in almost every restaurant.',
  },

  // Miscellaneous
  {
    id: 'data-and-documents',
    tab: 'miscellaneous',
    q: 'How do you handle my documents and personal data?',
    a: 'Passport scans, income documents and visa paperwork are stored encrypted and shared only with our partner immigration lawyers, {visaPartner}, when you ask us to. Access is logged, and we never sell or share your data for marketing. You can ask us to delete your documents at any time, and we will do so within {deletionDays} days, unless the law requires us to keep something.',
  },
  {
    id: 'do-i-need-portuguese',
    tab: 'miscellaneous',
    q: 'Do I need to speak Portuguese?',
    a: 'No, especially in Lisbon, Porto and the Algarve, where English is widely spoken. But a little Portuguese goes a long way, particularly in smaller towns and with older neighbors. We offer classes and language exchanges in every plan, and locals really appreciate the effort.',
  },
  {
    id: 'eu-citizens',
    tab: 'miscellaneous',
    q: 'I am an EU citizen. Is anything different?',
    a: 'Yes, it is much simpler. EU, EEA and Swiss citizens can live in Portugal without a visa. For stays over three months you register your residence with the local council. Everything else in our plans, from the home to the community, works in the same way.',
  },
  {
    id: 'time-zone',
    tab: 'miscellaneous',
    q: 'What time zone is Portugal in?',
    a: 'Mainland Portugal and Madeira are on Western European Time, the same as the UK, with summer time from late March to late October. The Azores are one hour behind. That makes Portugal convenient for working with Europe, and overlaps with the US East Coast in the afternoon.',
  },
];

export function faqsByTab(tab: FaqTab): Faq[] {
  return faqs.filter((f) => f.tab === tab);
}

export function getFaqs(ids: string[]): Faq[] {
  return ids.map((id) => faqs.find((f) => f.id === id)).filter((f): f is Faq => Boolean(f));
}

import type { Testimonial } from './types';

/** Every testimonial is a PLACEHOLDER until we have real, consented guest reviews. */
export const testimonials: Testimonial[] = [
  {
    name: 'Maya & Daniel',
    from: 'Toronto, Canada',
    stay: 'Season · 3 months in Lisbon',
    title: 'We came to work and stayed for the evenings',
    quote:
      'We both work remotely and worried about time zones and Wi-Fi. Both were fine from day one. What surprised us was how quickly we had friends: the long-table dinner in our first week changed everything.',
    image: 'lisbonRooftopsSea',
    placeholder: true,
  },
  {
    name: 'The Harper family',
    from: 'Bristol, UK',
    stay: 'Family season · 1 school term in Cascais',
    title: 'The children still talk about it every day',
    quote:
      'Our specialist found a school, a house near the beach and a surf club for the kids before we had even packed. It was the calmest big move we have ever made, and the children came home speaking a little Portuguese.',
    image: 'familyBeach',
    placeholder: true,
  },
  {
    name: 'Sam',
    from: 'Melbourne, Australia',
    stay: 'Season · 2 months in Ericeira',
    title: 'A career break that actually felt like a break',
    quote:
      'I needed to stop and think after ten years in the same job. I surfed most mornings, walked the cliffs in the afternoons and ate far too much fish. I went home with a clear head and a new plan.',
    image: 'surfWave',
    placeholder: true,
  },
  {
    name: 'Linda & Robert',
    from: 'Portland, USA',
    stay: 'Full year · D7 visa in Tavira',
    title: 'The paperwork was the easy part',
    quote:
      'We were nervous about the visa. The partner lawyers handled the application, and our specialist made sure we understood every step. Now we have a favorite café, a Portuguese class and neighbors who bring us oranges.',
    image: 'beachMorning',
    placeholder: true,
  },
  {
    name: 'Léa',
    from: 'Lyon, France',
    stay: 'Full year · 6 months in Porto',
    title: 'Porto gave me room to make things',
    quote:
      'I am an illustrator and needed a change of light. My apartment in Bonfim had a proper desk by a big window, and the ceramics course gave me a whole new direction for my work.',
    image: 'portoRibeira',
    placeholder: true,
  },
  {
    name: 'The Okafor family',
    from: 'London, UK',
    stay: 'Family season · school year in Madeira',
    title: 'A year of spring for all four of us',
    quote:
      'We spent our weekends on levada walks and in the lava pools, and our weekdays working and at school like normal. Having one person who handled everything meant we could simply enjoy it.',
    image: 'forestPath',
    placeholder: true,
  },
];

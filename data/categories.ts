import type { Category } from './types';

/** Experience prices are PLACEHOLDERS in base EUR. */
export const categories: Category[] = [
  {
    slug: 'neighborhoods',
    number: '01',
    name: 'Neighborhoods',
    label: 'neighborhoods',
    intro:
      'The quickest way to feel at home is to know your streets. From Alfama’s lanes in Lisbon to Bonfim in Porto and the old town of Funchal, we walk you through the bakeries, markets and corners that locals actually use.',
    image: 'lisbonAlfama',
    experiences: [
      {
        slug: 'alfama-at-dawn',
        title: 'Alfama at dawn: “Bread, fado and washing lines”',
        tag: 'Guided walk',
        duration: '3h',
        where: 'Lisbon',
        description:
          'An early walk through Lisbon’s oldest quarter before the day-trippers arrive. We start with fresh bread and coffee, climb past the viewpoints and stop at a small fado house where the owner tells the neighborhood’s story. You finish knowing where to shop, eat and sit in the sun.',
        includedIn: ['taster', 'season', 'full-year', 'family-season'],
        image: 'lisbonAlfama',
        cutoutImage: 'coffeeToast',
      },
      {
        slug: 'porto-beyond-the-river',
        title: 'Porto beyond the river: “Bonfim and the quiet east”',
        tag: 'Guided walk',
        duration: '3h',
        where: 'Porto',
        description:
          'A slow walk through Porto’s residential east, away from the Ribeira crowds. We visit a traditional grocer, a ceramics studio and a café where the same neighbors meet every morning. It is the best introduction to everyday Porto life.',
        includedIn: ['season', 'full-year', 'family-season'],
        image: 'portoRiverside',
        cutoutImage: 'pottery',
      },
      {
        slug: 'funchal-market-morning',
        title: 'Funchal market morning: “Fruit you have never tasted”',
        tag: 'Guided walk',
        duration: '2h',
        where: 'Madeira',
        description:
          'A morning in Funchal’s farmers’ market and the old town around it, tasting island fruit and learning what is in season. We finish on a street of painted doors with a cup of poncha or coffee. Practical tips on shopping and daily life are part of the walk.',
        fromPrice: 35,
        image: 'alleyWalk',
        cutoutImage: 'feast',
      },
    ],
  },
  {
    slug: 'surf-and-sea',
    number: '02',
    name: 'Surf & sea',
    label: 'surf & sea',
    intro:
      'Portugal has more than 800 kilometres of Atlantic coast. Learn to surf in Ericeira, swim in the warm lagoon waters off Tavira or watch whales from a small boat in the Azores, with people who know the sea well.',
    image: 'surfBarrel',
    experiences: [
      {
        slug: 'ericeira-surf-month',
        title: 'Ericeira surf month: “From foam to green waves”',
        tag: 'Weekly class',
        duration: 'Twice weekly, 4 weeks',
        where: 'Ericeira',
        description:
          'Eight small-group lessons with a certified coach, matched to your level and the day’s conditions. Boards and wetsuits are included, and sessions move between beginner beaches and gentle reef breaks. By the end of the month most guests are catching unbroken waves on their own.',
        fromPrice: 280,
        image: 'surfWave',
        cutoutImage: 'surfBarrel',
      },
      {
        slug: 'ria-formosa-by-boat',
        title: 'Ria Formosa by boat: “Islands, oysters and flamingos”',
        tag: 'Day trip',
        duration: '5h',
        where: 'Tavira & the eastern Algarve',
        description:
          'A small boat trip through the lagoon’s channels and salt marshes, with a local skipper who has fished here all his life. We stop on a barrier island to swim, visit an oyster farm and watch the birdlife. Bring a hat and a swimsuit.',
        fromPrice: 65,
        image: 'beachMorning',
        cutoutImage: 'feast',
      },
      {
        slug: 'azores-whales-and-dolphins',
        title: 'Whales and dolphins: “Out into the open Atlantic”',
        tag: 'Day trip',
        duration: '3h',
        where: 'The Azores (São Miguel)',
        description:
          'A trip with a marine biologist on a small, responsibly run boat, guided by lookouts on the cliffs who spot the whales. Common dolphins are seen on most trips, and sperm whales are often present. Spring and summer bring the best chances of seeing migrating species.',
        fromPrice: 70,
        image: 'diving',
        cutoutImage: 'beachSunset',
      },
    ],
  },
  {
    slug: 'food-and-markets',
    number: '03',
    name: 'Food & markets',
    label: 'food & markets',
    intro:
      'Portuguese food is generous, seasonal and built on good markets. Cook with a home cook in Porto, learn the Alentejo’s slow-cooked dishes in Évora or simply learn to shop well at your local market in Lisbon.',
    image: 'feast',
    experiences: [
      {
        slug: 'market-to-table-lisbon',
        title: 'Market to table: “Shop, cook, eat”',
        tag: 'Workshop',
        duration: '4h',
        where: 'Lisbon',
        description:
          'Meet a home cook at the market hall, choose fish and vegetables together and learn how to tell what is fresh. Back in her kitchen you cook three classic dishes and sit down to eat them with a glass of wine. You go home with recipes and the confidence to shop like a local.',
        fromPrice: 85,
        image: 'feast',
        cutoutImage: 'dinner',
      },
      {
        slug: 'petiscos-night-porto',
        title: 'Petiscos night: “Small plates, long evening”',
        tag: 'Food walk',
        duration: '3h',
        where: 'Porto',
        description:
          'An evening of small plates at four family-run tascas, from bolinhos de bacalhau to slow-cooked tripe for the brave. Your guide explains the history of each dish and how to order without a menu. Drinks are included, and so is a final glass of tawny port.',
        fromPrice: 75,
        image: 'dinner',
        cutoutImage: 'wineToast',
      },
      {
        slug: 'alentejo-kitchen',
        title: 'Alentejo kitchen: “Bread, herbs and patience”',
        tag: 'Workshop',
        duration: '5h',
        where: 'Évora & the Alentejo',
        description:
          'A day in a farmhouse kitchen learning the Alentejo’s simple, herb-rich cooking: açorda, migas and slow-roasted pork. We bake bread in a wood oven and finish with a long lunch outdoors. A good way to understand why people here never rush a meal.',
        fromPrice: 90,
        image: 'feast',
        cutoutImage: 'vineyard',
      },
    ],
  },
  {
    slug: 'language',
    number: '04',
    name: 'Language',
    label: 'language',
    intro:
      'A little Portuguese changes everything, from the market to the neighbors. We arrange friendly group and private classes in Lisbon, Porto and Coimbra, plus language exchanges where you practise over coffee.',
    image: 'cafeInterior',
    experiences: [
      {
        slug: 'portuguese-for-daily-life',
        title: 'Portuguese for daily life: “Café, market, pharmacy”',
        tag: 'Weekly class',
        duration: 'Weekly, 8 weeks',
        where: 'Lisbon, Porto or Coimbra',
        description:
          'A small group course focused on European Portuguese for real situations: ordering, shopping, small talk and appointments. Classes are two hours a week with a native teacher, plus short homework you can do on your commute. Most guests can manage everyday conversations by the end.',
        fromPrice: 240,
        includedIn: ['full-year'],
        image: 'cafeInterior',
        cutoutImage: 'coffeeTable',
      },
      {
        slug: 'language-exchange-evenings',
        title: 'Language exchange evenings: “Trocar palavras”',
        tag: 'Community evening',
        duration: '2h, weekly',
        where: 'Lisbon and Porto',
        description:
          'A relaxed weekly evening where Portuguese speakers who want to practise English meet guests who want to practise Portuguese. Tables switch language every half hour. It is the easiest way to make local friends.',
        includedIn: ['season', 'full-year', 'family-season'],
        image: 'friendsView',
        cutoutImage: 'coffeeToast',
      },
      {
        slug: 'coimbra-immersion',
        title: 'Coimbra immersion: “Two weeks in Portuguese”',
        tag: 'Intensive course',
        duration: '2 weeks',
        where: 'Coimbra',
        description:
          'Four hours of class each morning in a historic university town, with afternoon activities in Portuguese. You stay in a home in the old town and practise everywhere you go. Ideal for guests on a longer stay who want to make real progress quickly.',
        fromPrice: 520,
        image: 'alleyWalk',
        cutoutImage: 'planning',
      },
    ],
  },
  {
    slug: 'wine-country',
    number: '05',
    name: 'Wine country',
    label: 'wine country',
    intro:
      'Portugal makes extraordinary wine at very fair prices. Spend a weekend in the Douro’s terraced vineyards, taste the bold reds of the Alentejo or join a harvest, guided by the families who make it.',
    image: 'vineyard',
    experiences: [
      {
        slug: 'douro-harvest-weekend',
        title: 'Douro harvest weekend: “Pick, tread, taste”',
        tag: 'Weekend escape',
        duration: '2 days',
        where: 'Douro Valley',
        description:
          'Two days on a family quinta during the September harvest. You pick grapes in the morning, help with treading in the old stone lagares in the evening and share the workers’ lunch in between. Accommodation, meals and train tickets from Porto are included.',
        fromPrice: 420,
        includedIn: ['full-year'],
        image: 'vineyard',
        cutoutImage: 'wineToast',
      },
      {
        slug: 'alentejo-wine-and-cork',
        title: 'Alentejo wine and cork: “From oak to glass”',
        tag: 'Day trip',
        duration: '7h',
        where: 'Évora & the Alentejo',
        description:
          'A day visiting a small winery that ages wine in clay amphorae, followed by a walk through a cork oak forest with a cork harvester. Lunch is at a country restaurant. You learn why the Alentejo landscape looks the way it does.',
        fromPrice: 120,
        image: 'wineCellar',
        cutoutImage: 'vineyard',
      },
      {
        slug: 'port-lodge-evening',
        title: 'Port lodge evening: “Tawny, ruby, white”',
        tag: 'Tasting',
        duration: '2h',
        where: 'Porto',
        description:
          'A private tasting in a family-owned port lodge, guided by the cellar master. You compare styles and ages and learn how port is made and blended. A good evening to bring visiting friends.',
        fromPrice: 45,
        image: 'portoBridgeNight',
        cutoutImage: 'wineToast',
      },
    ],
  },
  {
    slug: 'hiking-and-nature',
    number: '06',
    name: 'Hiking & nature',
    label: 'hiking & nature',
    intro:
      'Some of Europe’s best walking is in Portugal. Follow Madeira’s levadas through laurel forest, walk the Rota Vicentina cliffs in the Algarve or hike between crater lakes in the Azores.',
    image: 'hikers',
    experiences: [
      {
        slug: 'levada-walks',
        title: 'Levada walks: “Along the water, through the clouds”',
        tag: 'Guided hike',
        duration: '5h',
        where: 'Madeira',
        description:
          'A guided walk along one of Madeira’s historic irrigation channels, through laurel forest that has grown here for millions of years. Routes are chosen for your fitness and the day’s weather. Transport, snacks and a local guide are included.',
        fromPrice: 55,
        includedIn: ['season', 'full-year'],
        image: 'forestPath',
        cutoutImage: 'hikers',
      },
      {
        slug: 'rota-vicentina-weekend',
        title: 'Rota Vicentina weekend: “Cliffs and fishermen’s trails”',
        tag: 'Weekend escape',
        duration: '2 days',
        where: 'Lagos & the western Algarve',
        description:
          'Two days walking the Fishermen’s Trail along the wild southwest coast, with luggage moved for you between guesthouses. Expect sandy paths, high cliffs and empty beaches. Dinner is fresh fish in a village restaurant.',
        fromPrice: 340,
        image: 'beachSunset',
        cutoutImage: 'hikers',
      },
      {
        slug: 'sete-cidades-crater-hike',
        title: 'Sete Cidades: “The rim of the crater”',
        tag: 'Guided hike',
        duration: '4h',
        where: 'The Azores (São Miguel)',
        description:
          'A ridge walk around the huge Sete Cidades crater, looking down on its twin lakes, one blue and one green. The path is mostly gentle, and the views change with every cloud. We finish with a soak in a thermal pool.',
        fromPrice: 50,
        image: 'mistyHills',
        cutoutImage: 'forestPath',
      },
    ],
  },
  {
    slug: 'craft-and-azulejos',
    number: '07',
    name: 'Craft & azulejos',
    label: 'craft & azulejos',
    intro:
      'Portugal’s hand-painted tiles cover churches, stations and ordinary houses. Learn to paint your own in Lisbon, throw pots with a ceramicist in Porto or meet the people who weave, carve and cork-craft across the country.',
    image: 'pottery',
    experiences: [
      {
        slug: 'paint-your-own-azulejo',
        title: 'Paint your own azulejo: “Cobalt on white”',
        tag: 'Workshop',
        duration: '3h',
        where: 'Lisbon',
        description:
          'A small workshop with a tile painter, learning the traditional technique of painting cobalt blue onto glazed tiles. You design and paint your own tile, which is fired and ready to collect a week later. No drawing skills needed.',
        fromPrice: 60,
        includedIn: ['season', 'family-season'],
        image: 'lisbonComercio',
        cutoutImage: 'pottery',
      },
      {
        slug: 'ceramics-course-porto',
        title: 'Ceramics course: “Clay, wheel, kiln”',
        tag: 'Weekly class',
        duration: 'Weekly, 6 weeks',
        where: 'Porto',
        description:
          'A six-week course in a small studio, learning to throw, trim and glaze your own cups and bowls. Classes are small and relaxed, and there is open studio time between sessions. You keep everything you make.',
        fromPrice: 220,
        image: 'pottery',
        cutoutImage: 'coffeeTable',
      },
      {
        slug: 'cork-craft-day',
        title: 'Cork craft day: “Bark that grows back”',
        tag: 'Workshop',
        duration: '4h',
        where: 'Évora & the Alentejo',
        description:
          'Meet a craftsman who works with cork, learn how it is harvested every nine years without harming the tree, and make a small object of your own. The visit includes a walk among cork oaks. A good family activity.',
        fromPrice: 55,
        image: 'vineyard',
        cutoutImage: 'pottery',
      },
    ],
  },
  {
    slug: 'community',
    number: '08',
    name: 'Community',
    label: 'community',
    intro:
      'A season is only as good as the people you share it with. In every destination, from Lisbon to Ericeira and Ponta do Sol, we host dinners, walks and coworking days that turn neighbors into friends.',
    image: 'communityDinner',
    experiences: [
      {
        slug: 'long-table-dinner',
        title: 'The long table: “Dinner with everyone”',
        tag: 'Community dinner',
        duration: '3h, monthly',
        where: 'Every destination',
        description:
          'A monthly dinner for guests, our local people and a few friends, around one long table in a family restaurant. It is simple, generous and the place where most friendships start. Partners and children are always welcome.',
        includedIn: ['taster', 'season', 'full-year', 'family-season'],
        image: 'communityDinner',
        cutoutImage: 'wineToast',
      },
      {
        slug: 'coworking-fridays',
        title: 'Coworking Fridays: “Work together, lunch together”',
        tag: 'Weekly meetup',
        duration: 'Weekly',
        where: 'Lisbon, Porto, Ericeira and Madeira',
        description:
          'A weekly shared workday at a coworking space, with a group lunch in the middle. Bring your laptop and your questions about life in Portugal. It is an easy way to meet other remote workers without forcing it.',
        includedIn: ['taster', 'season', 'full-year'],
        image: 'coworking',
        cutoutImage: 'coworkingLaugh',
      },
      {
        slug: 'sunset-walks',
        title: 'Sunset walks: “The golden hour club”',
        tag: 'Community walk',
        duration: '2h, weekly',
        where: 'Coast and islands',
        description:
          'A weekly walk along the coast timed to the sunset, ending at a café or beach bar. Pace is gentle and everyone is welcome. Locals often join, especially in summer.',
        includedIn: ['season', 'full-year', 'family-season'],
        image: 'friendsSunset',
        cutoutImage: 'beachSunset',
      },
    ],
  },
  {
    slug: 'island-life',
    number: '09',
    name: 'Island life',
    label: 'island life',
    intro:
      'Madeira and the Azores are Portugal at its most dramatic: volcanic, green and surrounded by deep ocean. Swim in natural lava pools, soak in hot springs in Furnas or settle into Ponta do Sol’s remote-work community.',
    image: 'forestPath',
    experiences: [
      {
        slug: 'furnas-hot-springs',
        title: 'Furnas hot springs: “Stew from the ground”',
        tag: 'Day trip',
        duration: '6h',
        where: 'The Azores (São Miguel)',
        description:
          'A day in the volcanic valley of Furnas, watching cozido stew being lifted out of the hot earth where it has cooked for hours. After lunch, soak in warm, iron-rich thermal pools in a botanical garden. Bring a dark swimsuit, because the water stains.',
        fromPrice: 75,
        image: 'mistyHills',
        cutoutImage: 'feast',
      },
      {
        slug: 'madeira-lava-pools',
        title: 'Lava pools: “Swim in the rocks”',
        tag: 'Day trip',
        duration: '6h',
        where: 'Madeira',
        description:
          'A drive along Madeira’s north coast to the natural lava pools of Porto Moniz, with stops at waterfalls and viewpoints on the way. Swim in calm, sea-filled pools sheltered from the waves. Lunch is grilled fish in a fishing village.',
        fromPrice: 70,
        image: 'diving',
        cutoutImage: 'beachMorning',
      },
      {
        slug: 'ponta-do-sol-settle-in',
        title: 'Ponta do Sol: “A week to settle in”',
        tag: 'Welcome week',
        duration: '1 week',
        where: 'Madeira',
        description:
          'A first week designed for island life: an introduction to the remote-work community, a bus and car-hire briefing, a market morning and a first levada walk. You end the week with friends and a routine. Included in every Madeira stay.',
        includedIn: ['taster', 'season', 'full-year', 'family-season'],
        image: 'beachSunset',
        cutoutImage: 'coworkingLaugh',
      },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

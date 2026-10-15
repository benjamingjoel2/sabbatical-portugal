import type { Destination, MonthClimate, Region } from './types';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Rows are [highC, lowC, seaC (null inland), rainDays], January to December. Typical values, PLACEHOLDER. */
function climate(rows: [number, number, number | null, number][]): MonthClimate[] {
  return rows.map(([highC, lowC, seaC, rainDays], i) => {
    const month: MonthClimate = { month: MONTHS[i], highC, lowC, rainDays };
    if (seaC !== null) month.seaC = seaC;
    return month;
  });
}

export const regionLabels: Record<Region, string> = {
  city: 'Cities',
  coast: 'Coast',
  countryside: 'Countryside',
  islands: 'Islands',
};

export const destinations: Destination[] = [
  {
    slug: 'lisbon',
    name: 'Lisbon',
    shortName: 'Lisbon',
    region: 'city',
    vibe: 'Seven hills, river light and a café on every corner.',
    bestFor: ['Remote workers', 'Couples', 'Culture lovers'],
    monthlyBudgetFrom: 2600,
    overview:
      'Lisbon is a capital that still feels walkable, with trams climbing past tiled façades and viewpoints at the top of almost every street. You can work from a sunny apartment in the morning, eat grilled sardines at lunch and be on a beach by the Tagus estuary within half an hour. It is the easiest place in Portugal to arrive, settle and meet people quickly.',
    whoFor:
      'People who want a real city rhythm, good food and an easy social life, with the sea never far away.',
    neighborhoods: [
      {
        name: 'Príncipe Real',
        blurb: 'Leafy squares, independent shops and quiet streets a short walk from Bairro Alto’s evenings.',
        image: 'lisbonRooftopsSea',
      },
      {
        name: 'Campo de Ourique',
        blurb: 'A flat, residential grid with a great market hall, bakeries and an easy family feel.',
        image: 'lisbonTram',
      },
      {
        name: 'Alfama',
        blurb: 'The oldest quarter: steep lanes, washing lines, fado on warm nights and river views.',
        image: 'lisbonAlfama',
      },
    ],
    costs: { rentOneBed: 1500, coworkingMonth: 200, coffee: 1.2, dinnerForTwo: 55 },
    climate: climate([
      [15, 8, 15, 10],
      [16, 9, 15, 9],
      [19, 10, 15, 8],
      [20, 12, 16, 9],
      [23, 14, 17, 6],
      [27, 16, 19, 3],
      [29, 18, 20, 1],
      [29, 18, 20, 1],
      [27, 17, 20, 4],
      [23, 15, 19, 8],
      [18, 11, 17, 10],
      [15, 9, 16, 11],
    ]),
    internet: {
      typicalMbps: 500,
      note: 'Fibre is standard in most central buildings, with 500 Mbps to 1 Gbps common. Mobile 5G coverage is strong.',
    },
    community:
      'The largest remote-work and expat community in Portugal, with meetups, language exchanges and coworking events most nights of the week.',
    image: 'lisbonAlfama',
    heroImage: 'lisbonRooftopsSea',
    map: { frame: 'mainland', x: 22, y: 66 },
  },
  {
    slug: 'porto',
    name: 'Porto',
    shortName: 'Porto',
    region: 'city',
    vibe: 'Granite, river mist and port lodges glowing at dusk.',
    bestFor: ['Creatives', 'Food lovers', 'Remote workers'],
    monthlyBudgetFrom: 2200,
    overview:
      'Porto is compact, hilly and full of character, built in granite and azulejo along the Douro river. Life here is a little calmer and a little cheaper than in Lisbon, with a strong local identity and a serious food scene. The Atlantic beaches of Foz and Matosinhos are a short bus ride from the centre.',
    whoFor:
      'People who like a city with texture and a slightly slower pace, and who don’t mind a rainier winter in exchange for it.',
    neighborhoods: [
      {
        name: 'Bonfim',
        blurb: 'A residential, creative neighborhood with new cafés, galleries and calm streets east of the centre.',
        image: 'portoRiverside',
      },
      {
        name: 'Cedofeita',
        blurb: 'Design shops, small restaurants and easy access to everything, ten minutes’ walk from the river.',
        image: 'portoRibeira',
      },
      {
        name: 'Foz do Douro',
        blurb: 'Where the river meets the ocean: seafront walks, sunsets and a quieter, village feel.',
        image: 'portoGoldenHour',
      },
    ],
    costs: { rentOneBed: 1150, coworkingMonth: 160, coffee: 1, dinnerForTwo: 45 },
    climate: climate([
      [14, 5, 14, 13],
      [15, 6, 13, 11],
      [17, 8, 14, 11],
      [18, 9, 14, 12],
      [20, 11, 15, 9],
      [23, 14, 17, 5],
      [25, 15, 18, 3],
      [25, 15, 18, 3],
      [24, 14, 18, 6],
      [21, 12, 17, 11],
      [17, 9, 15, 12],
      [14, 7, 14, 13],
    ]),
    internet: {
      typicalMbps: 500,
      note: 'Fibre is widely available across the city. Older granite buildings can have thick walls, so we check Wi-Fi in every room.',
    },
    community:
      'A growing, friendly remote-work scene, plus a strong arts and university crowd. Easier to get to know locals than in Lisbon.',
    image: 'portoRibeira',
    heroImage: 'portoGoldenHour',
    map: { frame: 'mainland', x: 38, y: 30 },
  },
  {
    slug: 'cascais-sintra',
    name: 'Cascais & Sintra',
    shortName: 'Cascais',
    region: 'coast',
    vibe: 'Seaside promenades, forested hills and Lisbon 40 minutes away.',
    bestFor: ['Families', 'Couples', 'Outdoor lovers'],
    monthlyBudgetFrom: 2800,
    overview:
      'Cascais is a polished seaside town with a long coastal promenade, sheltered beaches and a direct train to Lisbon. Inland, the hills of Sintra are cooler and greener, full of palaces, misty forest trails and old quintas. Together they offer a calmer, outdoor life with the capital close enough for a day.',
    whoFor:
      'Families and couples who want safe streets, beaches and good schools nearby, without giving up city access.',
    neighborhoods: [
      {
        name: 'Cascais centro',
        blurb: 'Walk to the beach, the market and the train, with cafés and restaurants on every street.',
        image: 'beachMorning',
      },
      {
        name: 'Estoril',
        blurb: 'Residential and green, with a long seafront path linking small beaches all the way to Cascais.',
        image: 'familyBeach',
      },
      {
        name: 'Sintra village',
        blurb: 'Cooler, wooded and romantic, with palaces above and hiking trails from the doorstep.',
        image: 'forestPath',
      },
    ],
    costs: { rentOneBed: 1600, coworkingMonth: 190, coffee: 1.2, dinnerForTwo: 60 },
    climate: climate([
      [15, 9, 15, 10],
      [16, 9, 15, 9],
      [18, 10, 15, 8],
      [19, 11, 16, 8],
      [21, 13, 17, 5],
      [24, 15, 18, 3],
      [26, 17, 19, 1],
      [27, 17, 19, 1],
      [26, 17, 19, 4],
      [22, 15, 18, 8],
      [18, 12, 17, 10],
      [16, 10, 16, 11],
    ]),
    internet: {
      typicalMbps: 500,
      note: 'Fibre is standard in Cascais and Estoril. A few rural Sintra properties rely on 4G or 5G routers, which we test before you arrive.',
    },
    community:
      'A settled international community, many of them families, with clubs, sailing, surf schools and weekend markets.',
    image: 'beachMorning',
    heroImage: 'beachSunset',
    map: { frame: 'mainland', x: 17, y: 67 },
  },
  {
    slug: 'ericeira',
    name: 'Ericeira',
    shortName: 'Ericeira',
    region: 'coast',
    vibe: 'A whitewashed fishing town on a world-class surf coast.',
    bestFor: ['Surfers', 'Career breaks', 'Remote workers'],
    monthlyBudgetFrom: 2300,
    overview:
      'Ericeira is a small fishing town of white and blue houses above the Atlantic, at the heart of a protected surf reserve. Mornings start with checking the waves, days are for work or long cliff walks, and evenings end with fresh fish by the harbour. Lisbon is about 50 minutes away by car or bus.',
    whoFor:
      'Anyone who wants the ocean to set the rhythm of their days, from first-time surfers to people taking a proper break.',
    neighborhoods: [
      {
        name: 'Old town',
        blurb: 'Cobbled lanes, small squares and sea views, with everything within a few minutes’ walk.',
        image: 'beachSunset',
      },
      {
        name: 'Ribamar',
        blurb: 'A quiet village just north of town, close to the main reef breaks.',
        image: 'surfWave',
      },
      {
        name: 'Foz do Lizandro',
        blurb: 'A wide river-mouth beach to the south, good for beginners and long evening walks.',
        image: 'beachMorning',
      },
    ],
    costs: { rentOneBed: 1250, coworkingMonth: 170, coffee: 1, dinnerForTwo: 50 },
    climate: climate([
      [15, 8, 14, 11],
      [15, 8, 14, 10],
      [17, 9, 14, 9],
      [18, 10, 15, 9],
      [19, 12, 16, 6],
      [22, 14, 17, 3],
      [24, 15, 18, 1],
      [24, 16, 18, 2],
      [24, 15, 18, 4],
      [21, 14, 17, 9],
      [18, 11, 16, 11],
      [15, 9, 15, 12],
    ]),
    internet: {
      typicalMbps: 300,
      note: 'Fibre covers the town itself. Outlying villas can be slower, so we list a tested speed for every home.',
    },
    community:
      'A tight, outdoorsy community of surfers, remote workers and young families. Easy to meet people in the water or at the weekly dinners.',
    image: 'surfBarrel',
    heroImage: 'surfWave',
    map: { frame: 'mainland', x: 18, y: 61 },
  },
  {
    slug: 'comporta',
    name: 'Comporta',
    shortName: 'Comporta',
    region: 'coast',
    vibe: 'Rice fields, pine forest and empty white beaches.',
    bestFor: ['Couples', 'Slow living', 'Creatives'],
    monthlyBudgetFrom: 3200,
    overview:
      'Comporta is a string of low-key villages between rice paddies, cork and pine forest and a long Atlantic beach. Life is barefoot and unhurried, with storks on the chimneys and sandy roads to the sea. It is quiet outside summer, which is exactly why people come.',
    whoFor:
      'People who want nature and space more than nightlife, and who are happy to drive for supplies and company.',
    neighborhoods: [
      {
        name: 'Comporta village',
        blurb: 'The small centre, with a few restaurants, a grocery and the rice museum.',
        image: 'beachMorning',
      },
      {
        name: 'Carvalhal',
        blurb: 'A quieter village to the south with access to wide, empty beaches.',
        image: 'beachSunset',
      },
      {
        name: 'Melides',
        blurb: 'Rolling hills, a lagoon by the sea and a growing creative community.',
        image: 'mistyHills',
      },
    ],
    costs: { rentOneBed: 1900, coworkingMonth: 180, coffee: 1.3, dinnerForTwo: 70 },
    climate: climate([
      [16, 6, 15, 8],
      [17, 7, 15, 7],
      [20, 8, 15, 6],
      [21, 10, 16, 7],
      [24, 12, 17, 5],
      [28, 14, 19, 2],
      [30, 16, 20, 1],
      [30, 16, 20, 1],
      [28, 15, 20, 3],
      [24, 13, 19, 6],
      [19, 9, 17, 8],
      [16, 7, 16, 9],
    ]),
    internet: {
      typicalMbps: 150,
      note: 'Fibre is reaching more homes, but many rural houses use 4G or 5G routers. We test every home and add a backup router where needed.',
    },
    community:
      'Small and seasonal. Off-season it is a handful of creatives, families and long-stayers, and we organise regular dinners to bring them together.',
    image: 'beachMorning',
    heroImage: 'beachSunset',
    map: { frame: 'mainland', x: 27, y: 74 },
  },
  {
    slug: 'lagos-western-algarve',
    name: 'Lagos & the western Algarve',
    shortName: 'Lagos',
    region: 'coast',
    vibe: 'Golden cliffs, sea caves and a lively harbour town.',
    bestFor: ['Outdoor lovers', 'Families', 'Sun seekers'],
    monthlyBudgetFrom: 2300,
    overview:
      'Lagos is a historic walled town with a busy marina and some of the most dramatic coastline in Europe: ochre cliffs, grottoes and sheltered coves. West of town the coast turns wild towards Sagres and the Costa Vicentina, with surf, hiking and very few buildings. Winters are mild and sunny, which makes it a favourite for long stays.',
    whoFor:
      'People who want sunshine most of the year, an active outdoor life and an easy, sociable town.',
    neighborhoods: [
      {
        name: 'Lagos old town',
        blurb: 'Inside and around the old walls: markets, cafés and the beach a few minutes away.',
        image: 'beachSunset',
      },
      {
        name: 'Praia da Luz',
        blurb: 'A relaxed village with a long beach and a strong family and international community.',
        image: 'familyBeach',
      },
      {
        name: 'Sagres',
        blurb: 'The southwestern tip of Europe, wind-swept and surf-focused, with huge skies.',
        image: 'surfWave',
      },
    ],
    costs: { rentOneBed: 1250, coworkingMonth: 160, coffee: 1, dinnerForTwo: 50 },
    climate: climate([
      [16, 9, 16, 7],
      [17, 9, 15, 6],
      [19, 10, 16, 5],
      [20, 12, 16, 5],
      [23, 14, 17, 3],
      [26, 16, 19, 1],
      [28, 18, 21, 0],
      [28, 19, 22, 0],
      [27, 18, 21, 2],
      [23, 15, 20, 5],
      [19, 12, 18, 6],
      [17, 10, 17, 7],
    ]),
    internet: {
      typicalMbps: 300,
      note: 'Fibre is widely available in Lagos and Luz. Some rural homes towards Sagres rely on 5G routers.',
    },
    community:
      'A big, friendly international community of surfers, sailors, families and remote workers, with plenty of meetups year-round.',
    image: 'beachSunset',
    heroImage: 'beachMorning',
    map: { frame: 'mainland', x: 24, y: 92 },
  },
  {
    slug: 'tavira-eastern-algarve',
    name: 'Tavira & the eastern Algarve',
    shortName: 'Tavira',
    region: 'coast',
    vibe: 'A quiet river town, salt pans and warm island beaches.',
    bestFor: ['Retirees', 'Slow living', 'Couples'],
    monthlyBudgetFrom: 2000,
    overview:
      'Tavira is one of the prettiest towns in the Algarve: a Roman bridge, church towers, hipped roofs and a river running into the Ria Formosa lagoon. The beaches are on barrier islands reached by small ferries, and the sea is the warmest in mainland Portugal. It is calm, traditional and very easy to live in.',
    whoFor:
      'People who want warm weather, a gentle pace and a real Portuguese town rather than a resort.',
    neighborhoods: [
      {
        name: 'Tavira centre',
        blurb: 'Both banks of the river, with the market, cafés and ferries to the island beaches.',
        image: 'beachMorning',
      },
      {
        name: 'Santa Luzia',
        blurb: 'A small fishing village known for octopus, with a waterfront promenade.',
        image: 'beachSunset',
      },
      {
        name: 'Cabanas de Tavira',
        blurb: 'A relaxed lagoon village facing a long island beach, popular with families.',
        image: 'familyBeach',
      },
    ],
    costs: { rentOneBed: 1050, coworkingMonth: 140, coffee: 0.9, dinnerForTwo: 45 },
    climate: climate([
      [17, 7, 16, 6],
      [18, 8, 15, 5],
      [20, 10, 16, 5],
      [22, 11, 17, 5],
      [25, 14, 19, 3],
      [29, 17, 21, 1],
      [31, 19, 23, 0],
      [31, 19, 24, 0],
      [29, 18, 23, 2],
      [25, 15, 21, 4],
      [20, 11, 19, 6],
      [18, 9, 17, 7],
    ]),
    internet: {
      typicalMbps: 300,
      note: 'Fibre in town and most surrounding villages. Expect reliable speeds for video calls.',
    },
    community:
      'A settled community of long-stayers and retirees, plus local life that carries on all year. Smaller and quieter than the western Algarve.',
    image: 'beachMorning',
    heroImage: 'beachSunset',
    map: { frame: 'mainland', x: 55, y: 92 },
  },
  {
    slug: 'evora-alentejo',
    name: 'Évora & the Alentejo',
    shortName: 'Évora',
    region: 'countryside',
    vibe: 'A walled Roman town in a sea of cork oaks and vines.',
    bestFor: ['Culture lovers', 'Wine lovers', 'Slow living'],
    monthlyBudgetFrom: 1900,
    overview:
      'Évora is a UNESCO-listed university town with a Roman temple, whitewashed lanes and a lively main square, surrounded by the rolling plains of the Alentejo. Days are slow and generous, built around long lunches, local wine and country walks among cork oaks and olive groves. In 2027 the town is European Capital of Culture, with a year-long programme of events.',
    whoFor:
      'People who want space, quiet and culture at a gentle price, and who enjoy the countryside more than the beach.',
    neighborhoods: [
      {
        name: 'Inside the walls',
        blurb: 'The historic centre, with the Praça do Giraldo, the cathedral and everything on foot.',
        image: 'alleyWalk',
      },
      {
        name: 'Rural Évora',
        blurb: 'Quintas and farmhouses among cork oaks, ten to twenty minutes from town by car.',
        image: 'vineyard',
      },
      {
        name: 'Monsaraz',
        blurb: 'A tiny hilltop village above the Alqueva lake, famous for its dark, starry skies.',
        image: 'mistyHills',
      },
    ],
    costs: { rentOneBed: 900, coworkingMonth: 120, coffee: 0.9, dinnerForTwo: 40 },
    climate: climate([
      [13, 5, null, 9],
      [15, 6, null, 8],
      [18, 8, null, 7],
      [20, 9, null, 8],
      [24, 12, null, 6],
      [29, 15, null, 2],
      [33, 16, null, 1],
      [33, 16, null, 1],
      [29, 15, null, 3],
      [23, 12, null, 7],
      [17, 8, null, 9],
      [14, 6, null, 9],
    ]),
    internet: {
      typicalMbps: 300,
      note: 'Fibre is good in town. Rural quintas often use 5G routers, which we test and back up before you arrive.',
    },
    community:
      'A university town with a young local crowd and a small but growing international community, set to be busier during the 2027 culture year.',
    image: 'vineyard',
    heroImage: 'mistyHills',
    map: { frame: 'mainland', x: 50, y: 68 },
    highlight: 'European Capital of Culture 2027',
  },
  {
    slug: 'douro-valley',
    name: 'Douro Valley',
    shortName: 'Douro',
    region: 'countryside',
    vibe: 'Terraced vineyards falling steeply to a slow green river.',
    bestFor: ['Wine lovers', 'Writers', 'Hikers'],
    monthlyBudgetFrom: 2100,
    overview:
      'The Douro Valley is one of the oldest wine regions in the world, with hand-built terraces stepping down to the river for mile after mile. Small villages, family quintas and riverside railway stations set the scale of daily life. It is deeply peaceful, especially outside the harvest, and Porto is under two hours away by train.',
    whoFor:
      'People who want deep quiet and beautiful views to write, think or simply rest, with wine as a very pleasant side effect.',
    neighborhoods: [
      {
        name: 'Pinhão',
        blurb: 'A small riverside village at the heart of the valley, with a tiled train station.',
        image: 'vineyard',
      },
      {
        name: 'Peso da Régua',
        blurb: 'The largest town in the valley, with shops, a market and good rail links to Porto.',
        image: 'wineCellar',
      },
      {
        name: 'Lamego',
        blurb: 'A handsome cathedral town on the south bank, with a famous baroque stairway.',
        image: 'mistyHills',
      },
    ],
    costs: { rentOneBed: 850, coworkingMonth: 100, coffee: 0.9, dinnerForTwo: 45 },
    climate: climate([
      [12, 3, null, 11],
      [14, 4, null, 9],
      [18, 6, null, 8],
      [20, 8, null, 10],
      [24, 11, null, 8],
      [29, 14, null, 4],
      [33, 15, null, 2],
      [33, 15, null, 2],
      [28, 13, null, 5],
      [22, 10, null, 9],
      [16, 6, null, 10],
      [12, 4, null, 11],
    ]),
    internet: {
      typicalMbps: 150,
      note: 'Variable. Village homes often have fibre, while hillside quintas use 4G or 5G. We only offer homes that pass a video-call test.',
    },
    community:
      'Small and rural. Most of your community will be winemakers, neighbors and fellow guests, and we organise regular get-togethers.',
    image: 'vineyard',
    heroImage: 'mistyHills',
    map: { frame: 'mainland', x: 55, y: 28 },
  },
  {
    slug: 'coimbra',
    name: 'Coimbra',
    shortName: 'Coimbra',
    region: 'city',
    vibe: 'A university hill town of libraries, river walks and student songs.',
    bestFor: ['Language learners', 'Budget-conscious', 'Writers'],
    monthlyBudgetFrom: 1700,
    overview:
      'Coimbra is home to one of the oldest universities in Europe, set on a hill above the Mondego river. It is a real Portuguese city with a young population, affordable living and very little tourist gloss. The coast at Figueira da Foz is under an hour away, and both Lisbon and Porto are easy by fast train.',
    whoFor:
      'People who want to live like a local, learn Portuguese properly and keep costs down, in a city with real history.',
    neighborhoods: [
      {
        name: 'Alta',
        blurb: 'The old upper town around the university, with steep lanes and wide views.',
        image: 'alleyWalk',
      },
      {
        name: 'Baixa',
        blurb: 'The lower town: shops, cafés and the riverside, flat and easy to get around.',
        image: 'cafeInterior',
      },
      {
        name: 'Santa Clara',
        blurb: 'Across the river, quieter and residential, with green parks and city views.',
        image: 'forestPath',
      },
    ],
    costs: { rentOneBed: 800, coworkingMonth: 110, coffee: 0.8, dinnerForTwo: 35 },
    climate: climate([
      [14, 5, null, 12],
      [16, 6, null, 10],
      [19, 8, null, 10],
      [20, 9, null, 11],
      [23, 11, null, 8],
      [27, 14, null, 4],
      [29, 15, null, 2],
      [30, 15, null, 2],
      [27, 14, null, 5],
      [22, 12, null, 10],
      [17, 8, null, 11],
      [14, 6, null, 12],
    ]),
    internet: {
      typicalMbps: 500,
      note: 'Fibre is standard across the city, with reliable speeds for calls and uploads.',
    },
    community:
      'Mostly local and academic. Language exchanges and university events make it easy to meet Portuguese people rather than only other visitors.',
    image: 'alleyWalk',
    heroImage: 'alleyWalk',
    map: { frame: 'mainland', x: 38, y: 45 },
  },
  {
    slug: 'madeira',
    name: 'Madeira (Funchal and Ponta do Sol)',
    shortName: 'Madeira',
    region: 'islands',
    vibe: 'Spring all year, cliffside levadas and Atlantic sunsets.',
    bestFor: ['Remote workers', 'Hikers', 'Families'],
    monthlyBudgetFrom: 2200,
    overview:
      'Madeira is a volcanic island of steep green mountains, banana terraces and walking trails that follow old irrigation channels called levadas. Funchal is a proper small city with markets, gardens and a harbour, while Ponta do Sol on the sunny south coast has an established remote-work community. Temperatures barely change through the year, so winter here feels like late spring.',
    whoFor:
      'People who want mild weather all year, outdoor adventure on the doorstep and an easy community from the first week.',
    neighborhoods: [
      {
        name: 'Funchal old town',
        blurb: 'Painted doors, the farmers’ market and the seafront, with everything on foot.',
        image: 'alleyWalk',
      },
      {
        name: 'Ponta do Sol',
        blurb: 'A small, sunny village on the south coast, popular with remote workers.',
        image: 'beachSunset',
      },
      {
        name: 'Calheta',
        blurb: 'Further west, with a sheltered sandy beach, a marina and quiet hillside homes.',
        image: 'beachMorning',
      },
    ],
    costs: { rentOneBed: 1200, coworkingMonth: 150, coffee: 1, dinnerForTwo: 50 },
    climate: climate([
      [19, 13, 18, 7],
      [19, 13, 17, 6],
      [20, 13, 17, 6],
      [20, 14, 18, 5],
      [21, 15, 19, 3],
      [23, 17, 20, 2],
      [25, 19, 22, 1],
      [26, 20, 23, 1],
      [26, 20, 24, 3],
      [24, 18, 23, 6],
      [22, 16, 21, 7],
      [20, 14, 19, 8],
    ]),
    internet: {
      typicalMbps: 300,
      note: 'Fibre in Funchal and most of the south coast. Mountain villages can be patchier, which we flag on each home.',
    },
    community:
      'One of the best-organised remote-work communities in Europe, especially around Ponta do Sol, plus a long-standing international crowd in Funchal.',
    image: 'forestPath',
    heroImage: 'forestPath',
    map: { frame: 'madeira', x: 50, y: 50 },
  },
  {
    slug: 'azores',
    name: 'The Azores (São Miguel)',
    shortName: 'Azores',
    region: 'islands',
    vibe: 'Crater lakes, hot springs and whales in the open Atlantic.',
    bestFor: ['Nature lovers', 'Hikers', 'Slow living'],
    monthlyBudgetFrom: 1900,
    overview:
      'São Miguel is the largest island of the Azores, halfway between Europe and North America. It is intensely green, with volcanic crater lakes, tea plantations, thermal pools and dairy pastures running down to the sea. Ponta Delgada is a small, friendly city, and the rest of the island is a short drive away.',
    whoFor:
      'People who love nature and changeable weather, and want somewhere truly different without leaving Portugal or the EU.',
    neighborhoods: [
      {
        name: 'Ponta Delgada',
        blurb: 'The island’s capital: black-and-white pavements, a marina and most of the cafés.',
        image: 'mistyHills',
      },
      {
        name: 'Furnas',
        blurb: 'A valley village of hot springs, steaming fumaroles and stew cooked in the ground.',
        image: 'forestPath',
      },
      {
        name: 'Ribeira Grande',
        blurb: 'The north coast, with surf beaches, a tea estate nearby and a growing creative scene.',
        image: 'surfWave',
      },
    ],
    costs: { rentOneBed: 950, coworkingMonth: 120, coffee: 0.9, dinnerForTwo: 40 },
    climate: climate([
      [17, 12, 17, 15],
      [17, 11, 16, 13],
      [17, 11, 16, 13],
      [18, 12, 17, 11],
      [20, 13, 18, 9],
      [22, 15, 19, 7],
      [24, 17, 21, 6],
      [25, 18, 23, 6],
      [24, 17, 22, 9],
      [22, 16, 21, 12],
      [19, 14, 19, 13],
      [18, 13, 18, 15],
    ]),
    internet: {
      typicalMbps: 200,
      note: 'Fibre in Ponta Delgada and larger villages, linked to the mainland by subsea cable. Rural homes vary, so we test each one.',
    },
    community:
      'Small, welcoming and outdoorsy, with a mix of islanders, returning emigrants and nature-loving newcomers.',
    image: 'mistyHills',
    heroImage: 'diving',
    map: { frame: 'azores', x: 55, y: 50 },
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

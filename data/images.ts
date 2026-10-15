/**
 * Image library. Unsplash photo IDs, each checked by eye.
 * `portugal: true` means the photo shows an identifiable place in Portugal.
 * `portugal: false` images are neutral placeholders: replace them with real
 * location photography before launch (search "TODO-PHOTO").
 */
export interface Img {
  id: string;
  alt: string;
  portugal: boolean;
}

const img = (id: string, alt: string, portugal = false): Img => ({ id, alt, portugal });

export const images = {
  // Portugal: verified locations
  portoGoldenHour: img('1513735492246-483525079686', 'Porto and the Douro river at golden hour, with the Dom Luís I bridge', true),
  portoRibeira: img('1555881400-74d7acaacd8b', 'Colourful houses of Porto’s Ribeira along the Douro river', true),
  portoRiverside: img('1564644929137-34b018daf461', 'Porto’s riverside hills seen across the Douro at sunset', true),
  portoBridgeNight: img('1569959220744-ff553533f492', 'The Dom Luís I bridge lit up over the Douro at dusk', true),
  lisbonAlfama: img('1501927023255-9063be98970c', 'Terracotta rooftops of Alfama, Lisbon, under a soft blue sky', true),
  lisbonRooftopsSea: img('1536663815808-535e2280d2c2', 'Lisbon rooftops stepping down towards the Tagus', true),
  lisbonComercio: img('1548707309-dcebeab9ea9b', 'Praça do Comércio and the Rua Augusta arch in Lisbon', true),
  lisbonBaixaRoofs: img('1580323956656-26bbb1206e34', 'Lisbon’s Baixa rooftops and Praça do Comércio from above', true),
  lisbonNight: img('1525207934214-58e69a8f8a3e', 'Lisbon’s hills and São Jorge castle at night', true),
  lisbonTram: img('1585208798174-6cedd86e019a', 'A yellow tram on a sunny Lisbon street', true),

  // Neutral placeholders (TODO-PHOTO: replace with location photography)
  surfBarrel: img('1502680390469-be75c86b636f', 'A surfer inside a turquoise wave'),
  surfWave: img('1455729552865-3658a5d39692', 'A surfer riding a breaking wave'),
  beachSunset: img('1473116763249-2faaef81ccda', 'Waves rolling onto a beach at sunset'),
  beachMorning: img('1507525428034-b723cf961d3e', 'A quiet beach with gentle waves in morning light'),
  familyBeach: img('1475503572774-15a45e5d60b9', 'A family holding hands walking into the sea'),
  vineyard: img('1506377247377-2a5b3b417ebb', 'A glass of red wine overlooking rows of vines'),
  wineToast: img('1510812431401-41d2bd2722f3', 'Friends raising glasses of red wine'),
  wineCellar: img('1528823872057-9c018a7a7553', 'Steel vats lining a winery cellar'),
  mistyHills: img('1500534314209-a25ddb2bd429', 'Layers of misty hills at dawn'),
  forestPath: img('1447752875215-b2761acb3c5d', 'A wooden footbridge through a green forest'),
  diving: img('1544551763-46a013bb70d5', 'A diver among a shoal of fish in clear water'),
  coffeeToast: img('1495474472287-4d71bcdd2085', 'Two hands holding cups of coffee with latte art'),
  coffeeTable: img('1509042239860-f550ce710b93', 'Cappuccinos on a café table among plants'),
  dinner: img('1414235077428-338989a2e8c0', 'A plated dinner on a candlelit table'),
  feast: img('1504674900247-0877df9cc836', 'Shared plates of grilled food on a wooden table'),
  cafeInterior: img('1555396273-367ea4eb4db5', 'A bright café with people working at tables'),
  coworking: img('1522202176988-66273c2fd55f', 'Three people working together on laptops'),
  coworkingLaugh: img('1543269865-cbf427effbad', 'Friends laughing around a table with laptops'),
  communityDinner: img('1517457373958-b7bdd4587205', 'A crowd gathered under string lights at an evening event'),
  friendsSunset: img('1511632765486-a01980e01a18', 'Friends with arms around each other watching a sunset'),
  friendsView: img('1529156069898-49953e39b3ac', 'A group of friends sitting together looking at the view'),
  hikers: img('1539635278303-d4002c07eae3', 'Friends laughing together on a mountain hike'),
  alleyWalk: img('1527631746610-bca00a040d60', 'A traveler with a backpack walking down a narrow old street'),
  pottery: img('1590422749897-47036da0b0ff', 'A stack of handmade ceramic cups'),
  yoga: img('1506126613408-eca07ce68773', 'Someone meditating on a deck at sunrise'),
  planning: img('1488646953014-85cb44e25828', 'A notebook, map and camera laid out for trip planning'),
  child: img('1503454537195-1dcabb73ffb9', 'A smiling child with paint on her face'),
  specialist: img('1590650153855-d9e808231d41', 'A smiling woman standing at a desk with a laptop'),

  // Homes (placeholders)
  homeLiving: img('1502672260266-1c1ef2d93688', 'A bright living room with plants and a sofa'),
  homeLounge: img('1524758631624-e2822e304c36', 'A light-filled lounge with armchairs and a desk'),
  homeBlue: img('1493809842364-78817add7ffb', 'A living room with a blue sofa and herringbone floor'),
  homeBedroom: img('1615874959474-d609969a20ed', 'A calm bedroom with linen bedding and plants'),
  homeKitchen: img('1556911220-bff31c812dba', 'A bright kitchen with lemons on the counter'),
  homeWarm: img('1618221195710-dd6b41faaea6', 'A warm living room with tall windows and wooden furniture'),
  homeNeutral: img('1616486338812-3dadae4b4ace', 'A neutral living room with a linen sofa'),
  homeLoft: img('1600210492486-724fe5c67fb0', 'An open living space with leather sofa and gallery wall'),
  homeOpen: img('1600607687939-ce8a6c25118c', 'An open-plan living room with wood panelling'),
  homeStudio: img('1513694203232-719a280e022f', 'A simple studio with a black sofa and plants'),
  villaPool: img('1416331108676-a22ccb276e35', 'A whitewashed country house with arches around a pool at dusk'),
  whiteHousePool: img('1600596542815-ffad4c1539a9', 'A white house with a pool under a blue sky'),
  modernPool: img('1580587771525-78b9dba3b914', 'A modern house with a long pool and lawn'),
  gardenPool: img('1582268611958-ebfd161ef9cf', 'A low house opening onto a pool and garden'),

  // People (placeholders for illustrative portraits)
  personA: img('1438761681033-6461ffad8d80', 'Portrait of a woman with short red hair'),
  personB: img('1472099645785-5658abf4ff4e', 'Portrait of a smiling man with glasses'),
  personC: img('1494790108377-be9c29b29330', 'Portrait of a laughing woman'),
  personD: img('1500648767791-00dcc994a43e', 'Portrait of a man with short dark hair'),
  personE: img('1507003211169-0a1dd7228f2d', 'Portrait of a smiling man with a beard'),
  personF: img('1517841905240-472988babdf9', 'Portrait of a woman in a denim jacket'),
  personG: img('1534528741775-53994a69daeb', 'Portrait of a woman in soft blue light'),
  personH: img('1544005313-94ddf0286df2', 'Portrait of a woman with long brown hair'),
  personI: img('1567784177951-6fa58317e16b', 'Portrait of a young man outdoors'),
} satisfies Record<string, Img>;

export type ImageKey = keyof typeof images;

export function unsplash(key: ImageKey | Img, w = 1600, q = 75): string {
  const i = typeof key === 'string' ? images[key] : key;
  return `https://images.unsplash.com/photo-${i.id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

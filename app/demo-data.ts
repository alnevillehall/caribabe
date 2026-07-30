export type DemoExperience = {
  id: number;
  title: string;
  location: string;
  island: string;
  image: string;
  duration: string;
  category: "Food" | "Culture" | "Nature" | "Water" | "Nightlife";
  tag: string;
  description: string;
};

export type HotArea = {
  id: string;
  country: "Jamaica" | "Saint Lucia" | "Barbados" | "Curaçao" | "Dominica";
  name: string;
  image: string;
  vibe: string;
  highlights: string[];
  foodMoment: string;
  sourceName: string;
  sourceUrl: string;
};

export type JournalStory = {
  slug: string;
  title: string;
  eyebrow: string;
  excerpt: string;
  image: string;
  readTime: string;
};

export type DemoUser = {
  name: string;
  email: string;
  homeAirport: string;
  travelStyle: string;
  joinedAt: string;
};

export type DemoTripItem = {
  id: string;
  day: number;
  time: string;
  title: string;
  location: string;
  type: string;
};

export type DemoTrip = {
  id: string;
  name: string;
  island: string;
  dates: string;
  items: DemoTripItem[];
  updatedAt: string;
};

export type PartnerProfile = {
  businessName: string;
  contactName: string;
  email: string;
  category: string;
  description: string;
  submitted: boolean;
};

export const storageKeys = {
  user: "go-bjoun:demo-user",
  places: "go-bjoun:saved-places",
  experiences: "go-bjoun:saved-experiences",
  trips: "go-bjoun:demo-trips",
  partner: "go-bjoun:demo-partner",
} as const;

export const hotAreas: HotArea[] = [
  {
    id: "kingston",
    country: "Jamaica",
    name: "Kingston",
    image: "/images/hero.jpg",
    vibe: "Music, galleries, hillside views, and a city that stays out late.",
    highlights: ["Downtown art and history", "Blue Mountain foothills", "Sound-system nights"],
    foodMoment: "Build in a slow lunch, a patty stop, and a late-night jerk run.",
    sourceName: "Visit Jamaica",
    sourceUrl: "https://www.visitjamaica.com/resort-areas/",
  },
  {
    id: "montego-bay",
    country: "Jamaica",
    name: "Montego Bay",
    image: "/images/catamaran.jpg",
    vibe: "Easy north-coast energy with reef time, a walkable strip, and day-trip range.",
    highlights: ["Marine park snorkeling", "Hip Strip evenings", "Rose Hall history"],
    foodMoment: "Start with a beach breakfast, then follow the scent of grilled fish and pepper shrimp.",
    sourceName: "Visit Jamaica",
    sourceUrl: "https://www.visitjamaica.com/resort-areas/montego-bay/",
  },
  {
    id: "negril",
    country: "Jamaica",
    name: "Negril",
    image: "/images/st-lucia.jpg",
    vibe: "Barefoot days, long sunsets, cliff jumps, and reggae after dark.",
    highlights: ["Seven Mile Beach", "Cliffside sunsets", "Live reggae"],
    foodMoment: "Plan for slow beach lunches and a sunset table above the cliffs.",
    sourceName: "Visit Jamaica",
    sourceUrl: "https://www.visitjamaica.com/deals-jamaica/negril/",
  },
  {
    id: "ocho-rios",
    country: "Jamaica",
    name: "Ocho Rios",
    image: "/images/waterfall.jpg",
    vibe: "Waterfalls, gardens, and bright-blue river days on the north coast.",
    highlights: ["Dunn’s River Falls", "Blue Hole", "Craft markets"],
    foodMoment: "Break up a waterfall day with local fruit, patties, and a coastal seafood stop.",
    sourceName: "Visit Jamaica",
    sourceUrl: "https://www.visitjamaica.com/resort-areas/",
  },
  {
    id: "rodney-bay-gros-islet",
    country: "Saint Lucia",
    name: "Rodney Bay & Gros Islet",
    image: "/images/st-lucia.jpg",
    vibe: "Calm-water days that turn into marina dinners and a famous Friday night out.",
    highlights: ["Reduit Beach", "Pigeon Island", "Friday street party"],
    foodMoment: "Come hungry for grilled seafood, Caribbean street food, and waterfront dinners.",
    sourceName: "Saint Lucia Tourism Authority",
    sourceUrl: "https://stlucia.org/en_uk/places-to-visit/gros-islet/",
  },
  {
    id: "soufriere-st-lucia",
    country: "Saint Lucia",
    name: "Soufrière",
    image: "/images/st-lucia.jpg",
    vibe: "Pitons, rainforest, volcanic coast, and an unhurried south-west rhythm.",
    highlights: ["Sugar Beach", "Anse Chastanet", "Pitons views"],
    foodMoment: "Pair a beach swim with cocoa-rich Creole cooking in the village.",
    sourceName: "Saint Lucia Tourism Authority",
    sourceUrl: "https://stlucia.org/en/itinerary-sea-beach/",
  },
  {
    id: "castries",
    country: "Saint Lucia",
    name: "Castries",
    image: "/images/hero.jpg",
    vibe: "A working capital of markets, harbour views, and everyday island motion.",
    highlights: ["Central Market", "Harbour viewpoints", "Cathedral and streets"],
    foodMoment: "Use the market as your compass for fresh fruit, bakes, and a local lunch.",
    sourceName: "Saint Lucia Tourism Authority",
    sourceUrl: "https://stlucia.org/en_uk/places-to-visit/best-things-to-do/",
  },
  {
    id: "marigot-bay",
    country: "Saint Lucia",
    name: "Marigot Bay",
    image: "/images/catamaran.jpg",
    vibe: "A green, sheltered pause between busy north-coast and dramatic south-coast days.",
    highlights: ["Sailing", "Quiet water", "Hillside views"],
    foodMoment: "Save this one for a relaxed waterside lunch and a golden-hour drink.",
    sourceName: "Saint Lucia Tourism Authority",
    sourceUrl: "https://stlucia.org/en/itinerary-sea-beach/",
  },
  {
    id: "bridgetown-carlisle",
    country: "Barbados",
    name: "Bridgetown & Carlisle Bay",
    image: "/images/barbados.jpg",
    vibe: "UNESCO streets, turquoise water, rum history, and a capital with real pace.",
    highlights: ["Historic Garrison", "Pebbles Beach", "Carlisle Bay"],
    foodMoment: "Link a heritage walk with a rum stop and a seaside fish lunch.",
    sourceName: "Visit Barbados",
    sourceUrl: "https://www.visitbarbados.org/bridgetown",
  },
  {
    id: "holetown",
    country: "Barbados",
    name: "Holetown",
    image: "/images/resort.jpg",
    vibe: "West-coast ease with polished beach clubs, small coves, and evening cocktails.",
    highlights: ["West-coast swimming", "Limegrove", "Sunset drinks"],
    foodMoment: "Make room for a long dinner after a late swim.",
    sourceName: "Visit Barbados",
    sourceUrl: "https://www.visitbarbados.org/things-to-do/experiences/nightlife",
  },
  {
    id: "st-lawrence-gap",
    country: "Barbados",
    name: "St Lawrence Gap",
    image: "/images/villa.jpg",
    vibe: "The island’s after-dark corridor for live music, dancing, and easy dining.",
    highlights: ["Live music", "Bars and restaurants", "South-coast beaches"],
    foodMoment: "Choose a table early, then let the night stretch into live music.",
    sourceName: "Visit Barbados",
    sourceUrl: "https://www.visitbarbados.org/things-to-do/experiences/nightlife",
  },
  {
    id: "bathsheba",
    country: "Barbados",
    name: "Bathsheba",
    image: "/images/barbados.jpg",
    vibe: "Atlantic drama, surf culture, giant rock pools, and a wilder east coast.",
    highlights: ["Soup Bowl surf", "Rock pools", "Scotland District"],
    foodMoment: "Bring snacks for the coast, then seek out a rum-shop lunch inland.",
    sourceName: "Visit Barbados",
    sourceUrl: "https://www.visitbarbados.org/things-to-do/itineraries/barbados-beach-lovers",
  },
  {
    id: "willemstad",
    country: "Curaçao",
    name: "Willemstad",
    image: "/images/curacao.jpg",
    vibe: "Colour, design, waterfront walks, and a UNESCO-listed city with creative pulse.",
    highlights: ["Punda and Otrobanda", "Queen Emma Bridge", "Street art"],
    foodMoment: "Start in Punda, then make an evening of Pietermaai’s small bars and tables.",
    sourceName: "Curaçao Tourism Board",
    sourceUrl: "https://www.curacao.com/fr/article/curacao-pour-familles",
  },
  {
    id: "pietermaai",
    country: "Curaçao",
    name: "Pietermaai",
    image: "/images/curacao.jpg",
    vibe: "A compact, character-rich district for music, design, and slow dinners.",
    highlights: ["Nieuwestraat", "Cocktail bars", "Walkable evenings"],
    foodMoment: "This is the address for a dinner-led night—book the table, then wander.",
    sourceName: "Curaçao Tourism Board",
    sourceUrl: "https://www.curacao.com/en/article/curacao-in-5-days",
  },
  {
    id: "jan-thiel",
    country: "Curaçao",
    name: "Jan Thiel",
    image: "/images/catamaran.jpg",
    vibe: "Beach days with a social edge, good water time, and a lively food scene.",
    highlights: ["Beach clubs", "Snorkeling", "Sunset swims"],
    foodMoment: "Stay for the beachside kitchens after the afternoon heat falls away.",
    sourceName: "Curaçao Tourism Board",
    sourceUrl: "https://www.curacao.com/en/article/curacao-in-5-days",
  },
  {
    id: "mambo-beach",
    country: "Curaçao",
    name: "Mambo Beach",
    image: "/images/curacao.jpg",
    vibe: "An easy all-day coast for swimming, sun, happy hour, and people-watching.",
    highlights: ["Beach promenade", "Water sports", "Happy hour"],
    foodMoment: "Turn a beach stop into an early dinner with your feet still in the sand.",
    sourceName: "Curaçao Tourism Board",
    sourceUrl: "https://www.curacao.com/en/article/curacao-in-5-days",
  },
  {
    id: "roseau",
    country: "Dominica",
    name: "Roseau",
    image: "/images/waterfall.jpg",
    vibe: "A small capital framed by sea, river, and rainforest-covered hills.",
    highlights: ["Old streets", "Morne Bruce", "Botanic gardens"],
    foodMoment: "Begin at the market, then follow the day’s catch into a Creole lunch.",
    sourceName: "Discover Dominica",
    sourceUrl: "https://legacy.discoverdominica.com/en/places/77/roseau",
  },
  {
    id: "soufriere-scotts-head",
    country: "Dominica",
    name: "Soufrière & Scotts Head",
    image: "/images/waterfall.jpg",
    vibe: "A volcanic south-west corner for marine reserve swims and slow village life.",
    highlights: ["Marine reserve", "Hot springs", "Scotts Head views"],
    foodMoment: "Go simple: fresh fish, root vegetables, and a long sea-view lunch.",
    sourceName: "Discover Dominica",
    sourceUrl: "https://legacy.discoverdominica.com/en/lists/25/sightseeing",
  },
  {
    id: "portsmouth",
    country: "Dominica",
    name: "Portsmouth",
    image: "/images/waterfall.jpg",
    vibe: "A quieter north-west base for river, bay, and rainforest days.",
    highlights: ["Indian River", "Prince Rupert Bay", "Cabrits"],
    foodMoment: "Use a river day as the excuse for a relaxed local lunch by the water.",
    sourceName: "Discover Dominica",
    sourceUrl: "https://legacy.discoverdominica.com/en/places/77/roseau",
  },
  {
    id: "calibishie",
    country: "Dominica",
    name: "Calibishie",
    image: "/images/waterfall.jpg",
    vibe: "A north-east village where rainforest and sea meet within a short walk.",
    highlights: ["Black-sand coves", "Kalinago Territory nearby", "Rainforest edge"],
    foodMoment: "Keep the plan light and look for a small sea-to-table kitchen after the beach.",
    sourceName: "Discover Dominica",
    sourceUrl: "https://legacy.discoverdominica.com/en/places/74/calibishie",
  },
];

export const demoExperiences: DemoExperience[] = [
  {
    id: 1,
    title: "Boston Bay jerk stop",
    location: "Port Antonio, Jamaica",
    island: "Jamaica",
    image: "/images/jamaica.jpg",
    duration: "A slow lunch",
    category: "Food",
    tag: "Taste the coast",
    description: "Follow a Portland beach day with smoky jerk, festival, and a cold drink by the sea.",
  },
  {
    id: 2,
    title: "Kingston record shop & supper",
    location: "Kingston, Jamaica",
    island: "Jamaica",
    image: "/images/hero.jpg",
    duration: "An evening",
    category: "Culture",
    tag: "City rhythm",
    description: "Build an evening around music, a gallery stop, and a table with local flavour.",
  },
  {
    id: 3,
    title: "Gros Islet street-party plates",
    location: "Gros Islet, Saint Lucia",
    island: "Saint Lucia",
    image: "/images/st-lucia.jpg",
    duration: "Friday night",
    category: "Food",
    tag: "After dark",
    description: "A food-led night of grilled seafood, street plates, and music spilling into the road.",
  },
  {
    id: 4,
    title: "Soufrière coast and cocoa",
    location: "Soufrière, Saint Lucia",
    island: "Saint Lucia",
    image: "/images/st-lucia.jpg",
    duration: "A full day",
    category: "Nature",
    tag: "Pitons day",
    description: "Shape a day around the Pitons, a reef swim, and a cocoa-rich Creole meal.",
  },
  {
    id: 5,
    title: "Oistins fish-fry night",
    location: "Christ Church, Barbados",
    island: "Barbados",
    image: "/images/barbados.jpg",
    duration: "Friday night",
    category: "Food",
    tag: "Island classic",
    description: "A lively food-first evening for grilled fish, music, and an easy south-coast breeze.",
  },
  {
    id: 6,
    title: "Bathsheba surf and rum-shop pause",
    location: "Bathsheba, Barbados",
    island: "Barbados",
    image: "/images/barbados.jpg",
    duration: "A half day",
    category: "Nature",
    tag: "Atlantic side",
    description: "Trade the calm coast for a wilder landscape, then settle into a slower local lunch.",
  },
  {
    id: 7,
    title: "Pietermaai dinner wander",
    location: "Willemstad, Curaçao",
    island: "Curaçao",
    image: "/images/curacao.jpg",
    duration: "An evening",
    category: "Food",
    tag: "Colour after dark",
    description: "Use the city’s creative quarter for a drawn-out dinner and a few perfectly placed bars.",
  },
  {
    id: 8,
    title: "Jan Thiel swim to supper",
    location: "Jan Thiel, Curaçao",
    island: "Curaçao",
    image: "/images/catamaran.jpg",
    duration: "An afternoon",
    category: "Water",
    tag: "Beach to table",
    description: "A no-rush beach plan: water first, then a casual table as the coast cools down.",
  },
  {
    id: 9,
    title: "Roseau market breakfast",
    location: "Roseau, Dominica",
    island: "Dominica",
    image: "/images/waterfall.jpg",
    duration: "A morning",
    category: "Food",
    tag: "Market morning",
    description: "Start with fruit, bakes, and market talk before the rainforest takes over the day.",
  },
  {
    id: 10,
    title: "Calibishie sea-to-table day",
    location: "Calibishie, Dominica",
    island: "Dominica",
    image: "/images/waterfall.jpg",
    duration: "A full day",
    category: "Nature",
    tag: "Nature island",
    description: "Keep this north-east day loose: a cove, a walk, and whatever the local kitchen is serving.",
  },
];

export const journalStories: JournalStory[] = [
  {
    slug: "kingston-after-dark",
    title: "Kingston after dark: sound systems, small bars, real rhythm",
    eyebrow: "Jamaica · Nightlife",
    excerpt: "The places where selectors, chefs, and old friends shape a night that never feels programmed.",
    image: "/images/hero.jpg",
    readTime: "6 min",
  },
  {
    slug: "slow-road-to-soufriere",
    title: "Take the slow road to Soufrière",
    eyebrow: "Saint Lucia · Road trip",
    excerpt: "Fishing villages, warm bread, volcanic coastline, and every good reason to leave time unplanned.",
    image: "/images/st-lucia.jpg",
    readTime: "8 min",
  },
  {
    slug: "blue-mountain-mornings",
    title: "Blue Mountain mornings are worth the early alarm",
    eyebrow: "Jamaica · Coffee",
    excerpt: "A cool-air guide to hillside farms, tiny kitchens, and the island ritual behind every cup.",
    image: "/images/jamaica.jpg",
    readTime: "5 min",
  },
  {
    slug: "curacao-in-colour",
    title: "Curaçao, block by brilliant block",
    eyebrow: "Curaçao · Design",
    excerpt: "A walking route through the studios, murals, facades, and makers shifting the island’s visual language.",
    image: "/images/curacao.jpg",
    readTime: "7 min",
  },
];

export const starterTrip: DemoTrip = {
  id: "jamaica-long-weekend",
  name: "Jamaica long weekend",
  island: "Jamaica",
  dates: "14–18 August",
  updatedAt: new Date(0).toISOString(),
  items: [
    { id: "coffee-trail", day: 1, time: "09:30", title: "Blue Mountain coffee trail", location: "St Andrew", type: "Taste" },
    { id: "stush-lunch", day: 1, time: "13:00", title: "A long local lunch", location: "Jamaica", type: "Food" },
    { id: "golden-hour", day: 2, time: "17:30", title: "Golden-hour coast", location: "Montego Bay", type: "Water" },
  ],
};

export const tripSuggestions: DemoTripItem[] = [
  { id: "devon-house", day: 1, time: "16:00", title: "Devon House courtyard", location: "Kingston", type: "Culture" },
  { id: "lime-cay", day: 2, time: "10:00", title: "Lime Cay boat morning", location: "Port Royal", type: "Beach" },
  { id: "dub-club", day: 2, time: "20:30", title: "Kingston Dub Club", location: "St Andrew", type: "Music" },
  { id: "reach-falls", day: 3, time: "11:00", title: "Reach Falls swim", location: "Portland", type: "Nature" },
];

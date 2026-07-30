export type DemoExperience = {
  id: number;
  title: string;
  location: string;
  island: string;
  image: string;
  duration: string;
  price: number;
  tag: string;
  description: string;
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

export type DemoBooking = {
  id: string;
  experienceId: number;
  title: string;
  date: string;
  guests: number;
  total: number;
  status: "Confirmed";
  createdAt: string;
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
  bookings: "go-bjoun:demo-bookings",
  trips: "go-bjoun:demo-trips",
  partner: "go-bjoun:demo-partner",
} as const;

export const demoExperiences: DemoExperience[] = [
  {
    id: 1,
    title: "Catamaran into golden hour",
    location: "Montego Bay, Jamaica",
    island: "Jamaica",
    image: "/images/catamaran.jpg",
    duration: "3.5 hours",
    price: 125,
    tag: "On the water",
    description:
      "Sail beyond the shoreline with a small local crew, swim in a quiet cove, and watch the sky turn coral over the Caribbean.",
  },
  {
    id: 2,
    title: "Hidden falls & forest table",
    location: "Roseau, Dominica",
    island: "Dominica",
    image: "/images/waterfall.jpg",
    duration: "5 hours",
    price: 98,
    tag: "Wild island",
    description:
      "Follow a naturalist through rainforest trails to a secluded swimming hole, then share a seasonal Dominican lunch in the forest.",
  },
  {
    id: 3,
    title: "Barefoot villa supper",
    location: "Soufrière, Saint Lucia",
    island: "Saint Lucia",
    image: "/images/villa.jpg",
    duration: "2.5 hours",
    price: 170,
    tag: "After dark",
    description:
      "A private, open-air dinner shaped by island ingredients, a chef’s tasting menu, and an uninterrupted sea view.",
  },
  {
    id: 4,
    title: "Blue Mountain coffee morning",
    location: "St Andrew, Jamaica",
    island: "Jamaica",
    image: "/images/jamaica.jpg",
    duration: "4 hours",
    price: 82,
    tag: "Local craft",
    description:
      "Meet growers above the clouds, walk the hillside rows, and taste the harvest where it begins.",
  },
  {
    id: 5,
    title: "Reef, rum & island stories",
    location: "Bridgetown, Barbados",
    island: "Barbados",
    image: "/images/barbados.jpg",
    duration: "4.5 hours",
    price: 115,
    tag: "Guest pick",
    description:
      "A relaxed coast-to-table afternoon guided by a Barbadian storyteller, with reef time and a small-batch rum finish.",
  },
  {
    id: 6,
    title: "Colour lanes by bicycle",
    location: "Willemstad, Curaçao",
    island: "Curaçao",
    image: "/images/curacao.jpg",
    duration: "3 hours",
    price: 64,
    tag: "City rhythm",
    description:
      "Ride beyond the postcard through painted lanes, neighborhood kitchens, and the creative heart of Willemstad.",
  },
];

export const journalStories: JournalStory[] = [
  {
    slug: "kingston-after-dark",
    title: "Kingston after dark: sound systems, small bars, real rhythm",
    eyebrow: "Jamaica · Nightlife",
    excerpt:
      "The places where selectors, chefs, and old friends shape a night that never feels programmed.",
    image: "/images/hero.jpg",
    readTime: "6 min",
  },
  {
    slug: "slow-road-to-soufriere",
    title: "Take the slow road to Soufrière",
    eyebrow: "Saint Lucia · Road trip",
    excerpt:
      "Fishing villages, warm bread, volcanic coastline, and every good reason to leave time unplanned.",
    image: "/images/st-lucia.jpg",
    readTime: "8 min",
  },
  {
    slug: "blue-mountain-mornings",
    title: "Blue Mountain mornings are worth the early alarm",
    eyebrow: "Jamaica · Coffee",
    excerpt:
      "A cool-air guide to hillside farms, tiny kitchens, and the island ritual behind every cup.",
    image: "/images/jamaica.jpg",
    readTime: "5 min",
  },
  {
    slug: "curacao-in-colour",
    title: "Curaçao, block by brilliant block",
    eyebrow: "Curaçao · Design",
    excerpt:
      "A walking route through the studios, murals, facades, and makers shifting the island’s visual language.",
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
    {
      id: "coffee-trail",
      day: 1,
      time: "09:30",
      title: "Blue Mountain coffee trail",
      location: "St Andrew",
      type: "Taste",
    },
    {
      id: "stush-lunch",
      day: 1,
      time: "13:00",
      title: "Lunch at Stush in the Bush",
      location: "Free Hill",
      type: "Food",
    },
    {
      id: "golden-hour",
      day: 2,
      time: "17:30",
      title: "Catamaran into golden hour",
      location: "Montego Bay",
      type: "Sail",
    },
  ],
};

export const tripSuggestions: DemoTripItem[] = [
  {
    id: "devon-house",
    day: 1,
    time: "16:00",
    title: "Devon House courtyard",
    location: "Kingston",
    type: "Culture",
  },
  {
    id: "lime-cay",
    day: 2,
    time: "10:00",
    title: "Lime Cay boat morning",
    location: "Port Royal",
    type: "Beach",
  },
  {
    id: "dub-club",
    day: 2,
    time: "20:30",
    title: "Kingston Dub Club",
    location: "St Andrew",
    type: "Music",
  },
  {
    id: "reach-falls",
    day: 3,
    time: "11:00",
    title: "Reach Falls swim",
    location: "Portland",
    type: "Nature",
  },
];

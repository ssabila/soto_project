export const storyContent = {
  opening: {
    id: "opening",
    lines: [
      "Across thousands of islands…",
      "flavors are never the same.",
      "Different lands. Different cultures. Different hands.",
      "Yet one dish continues to appear.",
      "Soto.",
    ],
  },

  question: {
    id: "question",
    lines: [
      "How can one dish… carry so many different identities?",
      "What makes them all… soto?",
    ],
  },

  journey: {
    id: "journey",
    label: "Journey Begins",
    description: "Swipe to explore each soto across the archipelago.",
  },

  regions: [
    {
      id: "soto-betawi",
      region: "Jakarta",
      name: "Soto Betawi",
      lines: [
        "In the capital, richness defines the flavor.",
        "Creamy, bold, layered—",
        "shaped by a city of endless influences.",
      ],
    },
    {
      id: "soto-lamongan",
      region: "East Java",
      name: "Soto Lamongan",
      lines: [
        "Further east, simplicity becomes strength.",
        "A clear broth, elevated by koya—",
        "subtle, yet unforgettable.",
      ],
    },
    {
      id: "soto-kudus",
      region: "Central Java",
      name: "Soto Kudus",
      lines: [
        "Served in smaller portions…",
        "not because it lacks—",
        "but because it is enough.",
      ],
    },
    {
      id: "soto-padang",
      region: "Sumatra",
      name: "Soto Padang",
      lines: [
        "From the west, boldness takes over.",
        "Crispy beef, rich broth—",
        "a flavor that speaks with confidence.",
        "Strong. Direct. Unapologetic.",
      ],
    },
    {
      id: "soto-banjar",
      region: "Kalimantan",
      name: "Soto Banjar",
      lines: [
        "Across the rivers, the flavor softens.",
        "Light, aromatic, and comforting—",
        "a quiet expression of warmth.",
      ],
    },
    {
      id: "coto-makassar",
      region: "Sulawesi",
      name: "Coto Makassar",
      lines: [
        "In the south, depth defines the taste.",
        "Rich, nutty, and intense—",
        "built from spices and time.",
        "A flavor that lingers.",
      ],
    },
  ],

  unity: {
    id: "unity",
    lines: [
      "Each bowl tells a different story.",
      "Different islands.",
      "Different ingredients.",
      "Different philosophies.",
      "Yet they all share the same name.",
    ],
  },

  meaning: {
    id: "meaning",
    lines: [
      "Soto is more than a dish.",
      "It is a reflection of a nation.",
      "Diverse… yet deeply connected.",
    ],
  },

  closing: {
    id: "closing",
    lines: [
      "Because in the end, soto was never just about taste.",
      "It is about how different people…",
      "can still belong to the same table.",
    ],
  },

  makeYourOwn: {
    id: "make-your-own",
    lines: ["Every bowl tells a story.", "Now, it's your turn to create one."],
    resultTemplate: (region) => `You created a Soto inspired by ${region}`,
  },
};

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
      ],
    },
    {
      id: "soto-lamongan",
      region: "East Java",
      name: "Soto Lamongan",
      lines: [
      ],
    },
    {
      id: "soto-kudus",
      region: "Central Java",
      name: "Soto Kudus",
      lines: [
      ],
    },
    {
      id: "soto-padang",
      region: "Sumatra",
      name: "Soto Padang",
      lines: [
      ],
    },
    {
      id: "soto-banjar",
      region: "Kalimantan",
      name: "Soto Banjar",
      lines: [
      ],
    },
    {
      id: "coto-makassar",
      region: "Sulawesi",
      name: "Coto Makassar",
      lines: [
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

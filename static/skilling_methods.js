window.methods = [
  {
    name: 'Barbarian Assault',
    skill: 'Agility',
    base: 'return 308439 * 60 / 16',
    baseCost: 'return 0',
    modifiers: [],
    requirements: [
      {
        name: '4 other people who want to play Barbarian Assault',
      },
    ],
    desc: 'get bonus XP from playing Barbarian Assault Hard Mode waves 1-9 (16 min rounds)',
    bonus: true,
  },
  {
    name: 'Silverhawk Boots',
    skill: 'Agility',
    base: 'return 68800',
    baseCost: 'return getPrice(30915) / 860',
    modifiers: [
      {
        name: 'RaF',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Pulse Core',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Nimble Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Avatar',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    requirements: [
      {
        name: 'Silverhawk boots',
      },
      {
        name: '99 Agility',
      },
    ],
    desc: 'wear boots, get XP',
    lossless: true,
  },
  {
    name: '3-tick rocktails',
    skill: 'Cooking',
    base: 'return 1850 * 225',
    baseCost: 'return (getPrice(15270) - 1.1 * getPrice(15272)) / 225',
    modifiers: [
      {
        name: 'RaF',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Pulse Core',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Avatar',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Urns + Enhancer',
        effect() {
          return {bonus: 0.25};
        },
      },
    ],
    requirements: [
      {
        name: 'Cooking Gauntlets',
      },
      {
        name: 'Portable Ranges',
        effect() {
          return {base: 0.215};
        },
      },
      {
        name: 'Modified Souf Chef Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: '94 Cooking',
      },
    ],
    desc: 'Cook rocktails at portable range',
  },
  {
    name: 'Wines',
    skill: 'Cooking',
    base: 'return 4500 * 201',
    baseCost: 'return (getPrice(1937) + getPrice(1987) - getPrice(1993)) / 201',
    modifiers: [
      {
        name: 'RaF',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Pulse Core',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Avatar',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    requirements: [
      {
        name: 'Souf Chef Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: '35 Cooking',
      },
    ],
    desc: 'Make wines with yak',
  },
  {
    name: 'Guthixian Caches',
    skill: 'Divination',
    base: 'return 73400 * 60 / 4',
    baseCost: 'return 0',
    modifiers: [],
    requirements: [
      {
        name: '99 Divination',
      },
    ],
    daily: 'return 8 / 60',
    desc: 'Mobile perk, Children of Mah, and bladed dive highly recommended',
  },
  {
    name: 'Tree Run',
    skill: 'Farming',
    base: `treesThatCanDie = 12 * 13913.8 + 12516.6 + 23463 / 3;
    treesThatCantDie = 15000 + 8500 + 7 * 6380.4;
    return (0.86 * treesThatCanDie + treesThatCantDie) * 60 / 11`,
    baseCost: `const treesThatCanDie = 12 * 13913.8 + 12516.6 + 23463 / 3;
    const treesThatCantDie = 15000 + 8500 + 7 * 6380.4;
    const xp = 0.86 * treesThatCanDie + treesThatCantDie;
    const cost = 12 * getPrice(5316) + getPrice(5290) + getPrice(31437) / 3 + 7 * (getPrice(5288) + 10 * getPrice(2114) - 6 * getPrice(5972)) + 64 / 3 * (1500 + getPrice(6034));
    return cost/xp`,
    modifiers: [
      {
        name: 'RaF',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Pulse Core',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Avatar',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Urns + Enhancer',
        effect() {
          return {bonus: 0.25};
        },
      },
    ],
    requirements: [
      {
        name: '94 Farming',
      },
      {
        name: 'Farming Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    daily: 'return 11 / 60',
    desc: 'Full run (6 Magics, 7 Papaya, Calquat, Crystal Tree, .33 Elder, Arc Berries) + magic only run. Do spirit trees if you have them, but they are not part of the calculation',
  },
  {
    name: 'Dragon darts',
    skill: 'Fletching',
    base: 'return 25 * 55000',
    baseCost: 'return (0.9 * (getPrice(314) + getPrice(11232)) - 150) / 25',
    modifiers: [
      {
        name: 'Fletching Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'RaF',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Pulse Core',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Avatar',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    requirements: [
      {
        name: 'Portable Fletchers',
        effect() {
          return {base: 0.1};
        },
      },
      {
        name: '95 Fletching',
      },
    ],
    desc: 'Make dragon darts, sell to general store',
  },
  {
    name: 'Dragon arrows',
    skill: 'Fletching',
    base: 'return 15 * 45000',
    baseCost: 'return (0.9 * (getPrice(11237) + getPrice(53)) - 240) / 15',
    modifiers: [
      {
        name: 'Fletching Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'RaF',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Pulse Core',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Avatar',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    requirements: [
      {
        name: 'Portable Fletchers',
        effect() {
          return {base: 0.1};
        },
      },
      {
        name: '90 Fletching',
      },
    ],
    desc: 'Make dragon arrows, sell to general store',
  },
  {
    name: 'Dark arrows',
    skill: 'Fletching',
    base: 'return 17.5 * 45000',
    baseCost: 'return (0.9 * (getPrice(29729) + getPrice(53)) - 30) / 17.5',
    modifiers: [
      {
        name: 'Fletching Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'RaF',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Pulse Core',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Avatar',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    requirements: [
      {
        name: 'Portable Fletchers',
        effect() {
          return {base: 0.1};
        },
      },
      {
        name: '95 Fletching',
      },
    ],
    desc: 'Make dark arrows, sell to general store',
  },
  {
    name: 'Rune arrows',
    skill: 'Fletching',
    base: 'return 12.5 * 45000',
    baseCost: 'return (0.9 * (getPrice(892) + getPrice(53)) - 153) / 12.5',
    modifiers: [
      {
        name: 'Fletching Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'RaF',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Pulse Core',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Avatar',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    requirements: [
      {
        name: 'Portable Fletchers',
        effect() {
          return {base: 0.1};
        },
      },
      {
        name: '75 Fletching',
      },
    ],
    desc: 'Make rune arrows, sell to general store',
  },
  {
    name: 'Broad arrows',
    skill: 'Fletching',
    base: 'return 15 * 45000',
    baseCost: 'return 0.9 * (getPrice(44) + getPrice(53)) / 15',
    modifiers: [
      {
        name: 'Fletching Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'RaF',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Pulse Core',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Avatar',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    requirements: [
      {
        name: 'Portable Fletchers',
        effect() {
          return {base: 0.1};
        },
      },
      {
        name: '52 Fletching',
      },
    ],
    desc: 'Make broad arrows',
  },
  {
    name: 'Ornate Tortles',
    skill: 'Hunter',
    base: 'return 204 * 1585 * 60 / 15',
    baseCost: 'return 0',
    modifiers: [
      {
        name: 'RaF',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Avatar',
        effect() {
          return {bonus: 0.03};
        },
      },
      {
        name: 'Urns + Enhancer',
        effect() {
          return {bonus: 0.25};
        },
      },
      {
        name: "Hunter's outfit",
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Enhanced Yaktwee stick',
        effect() {
          return {bonus: 0.05};
        },
      },
    ],
    requirements: [
      {
        name: '96 hunter',
      },
    ],
    desc: "Hunt ornate tortles with Sliske's endgame set and tick manip trap laying",
  },
  {
    name: 'Crystal Skillchompas',
    skill: 'Hunter',
    base: 'return 2740 * 476',
    baseCost: 'return getPrice(40995) / -476',
    modifiers: [
      {
        name: 'RaF',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Avatar',
        effect() {
          return {bonus: 0.03};
        },
      },
      {
        name: 'Urns + Enhancer',
        effect() {
          return {bonus: 0.25};
        },
      },
      {
        name: "Hunter's outfit",
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Enhanced Yaktwee stick',
        effect() {
          return {bonus: 0.05};
        },
      },
    ],
    requirements: [
      {
        name: '97 hunter',
      },
    ],
    desc: "<a href='https://www.youtube.com/watch?v=xlwBeB5sttY' target='_blank'>Hunt crystal skillchompas with aggro pot, Sliske's endgame set, and tick manip trap laying</a> ",
  },
  {
    name: 'Goebiebands',
    skill: 'Woodcutting',
    base: 'return 48515 * 60 / 2',
    baseCost: 'return 0',
    modifiers: [],
    requirements: [
      {
        name: '99 Woodcutting',
      },
    ],
    daily: 'return 2 / 60',
    desc: 'Turn in 10 Goebieband supplies for Woodcutting XP',
  },
  {
    name: 'Divine Yews',
    skill: 'Woodcutting',
    base: 'return 2800 * 175',
    baseCost: 'return 40 * getPrice(32092) / (500 * 175)',
    modifiers: [
      {
        name: 'RaF',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Pulse Core',
        effect() {
          return {bonus: 0.1};
        },
      },
      {
        name: 'Avatar',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Shared Knowledge buff (Memorial to Guthix)',
        effect() {
          return {base: 0.25};
        },
      },
      {
        name: 'Cache Boost',
        effect() {
          return {base: 0.025};
        },
      },
    ],
    requirements: [
      {
        name: '60 Woodcutting',
      },
    ],
    daily: 'return 500 / 2800',
    desc: 'Cut divine yews with an extended divine location cap. Yews are hosted in w48 Burthorpe around reset time',
  },
];

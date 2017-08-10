/* eslint-disable max-len */
const urns = {
  name: 'Urns',
  effect() {
    return {bonus: 0.2};
  },
};
const urnEnhancer = {
  name: 'Urn Enhancer',
  effect() {
    return {bonus: 0.05};
  },
};
const raf = {
  name: 'RaF',
  effect() {
    return {bonus: 0.1};
  },
};

const ava3 = {
  name: 'Avatar',
  effect() {
    return {bonus: 0.03};
  },
};

const ava6 = {
  name: 'Avatar',
  effect() {
    return {bonus: 0.06};
  },
};
const pulse = {
  name: 'Pulse Core',
  effect() {
    return {bonus: 0.1};
  },
};

function arrowMethod(name, actionXP, arrowheadID, sell) {
  return {
    name,
    skill: 'Fletching',
    actionXP,
    actionsPerHour: 43000,
    baseCost: `return (0.9 * (getPrice(${arrowheadID}) + getPrice(53)) - ${sell}) / this.actionXP`,
    modifiers: [
      {
        name: 'Fletching Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      raf,
      pulse,
      ava6,
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
  };
}


function summoningMethod(name, actionXP, shards, primaryIngID, scrollID) {
  return {
    name,
    skill: 'Summoning',
    actionXP,
    actionsPerHour: 16750,
    baseCost: `return (${shards} * 25 + getPrice(${primaryIngID}) - 10 * getPrice(${scrollID})) / this.actionXP`,
    modifiers: [
      ava6,
      raf,
      pulse,
      {
        name: 'Shaman outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    requirements: [
      {
        name: '96 Summoning',
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=1rS81xB9iwQ" target="_blank">Taverley Shop method</a>',
  };
}


window.methods = [
  {
    name: 'Barbarian Assault',
    skill: 'Agility',
    actionXP: 308439,
    actionsPerHour: 60 / 16,
    baseCost: 'return 0',
    modifiers: [],
    requirements: [
      {
        name: '4 other people who want to play Barbarian Assault',
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=RuSfTG0yYpM" target="_blank">get bonus XP from playing Barbarian Assault Hard Mode waves 1-9 (16 min rounds)</a>',
    bonus: true,
  },
  {
    name: 'Silverhawk Boots',
    skill: 'Agility',
    actionXP: 860,
    actionsPerHour: 80,
    baseCost: 'return getPrice(30915) / this.actionXP',
    modifiers: [
      raf,
      {
        name: 'Nimble Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      ava3,
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
  // attack - SW, aby demon wildy, PSD shapeshifters, aby demon, airut
  {
    name: 'Flotsam Pawnbrokers',
    skill: 'Construction',
    actionXP: 1120,
    actionsPerHour: 1000,
    baseCost: 'return getPrice(8782) * 7.8 / this.actionXP',
    modifiers: [
      raf,
      ava3,
      {
        name: 'God Chisel',
        effect() {
          return {bonus: 0.01};
        },
      },
      {
        name: 'Construction Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    requirements: [
      {
        name: '73 Construction',
      },
      {
        name: 'Monkey Butler (Can use Demon Butler if feel like it)',
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=h6hRV9RuViw" target="_blank">Create and tear down flotsam pawnbrokers</a>',
  },
  {
    name: 'Mahogany Table Flatpack',
    skill: 'Construction',
    actionXP: 840,
    actionsPerHour: 400,
    baseCost: 'return getPrice(8782) * 6 / this.actionXP',
    modifiers: [
      raf,
      ava3,
      {
        name: 'God Chisel',
        effect() {
          return {bonus: 0.01};
        },
      },
      {
        name: 'Construction Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    requirements: [
      {
        name: '73 Construction',
      },
      {
        name: 'Monkey Butler (Can use Demon Butler if feel like it)',
      },
    ],
    desc: 'zzzz',
  },
  {
    name: 'Combat',
    skill: 'Constitution',
    base: 'return Infinity',
    baseCost: 'return 0',
    modifiers: [],
    requirements: [],
    desc: 'You\'d have to put in extra effort to not get this for free with 200m all combat skills',
  },
  {
    name: '3-tick rocktails',
    skill: 'Cooking',
    actionXP: 225,
    actionsPerHour: 1850,
    baseCost: 'return (getPrice(554) + getPrice(20374)) / 7737.5 + (getPrice(15270) - 1.1 * getPrice(15272)) / this.actionXP',
    modifiers: [
      raf,
      {
        name: 'Dwarven Army Axe',
        effect() {
          return {bonus: 3 / 225};
        },
      },
      pulse,
      ava6,
      urnEnhancer,
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
      urns,
      {
        name: '94 Cooking',
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=OMlT6PzmEjE" target="_blank">video guide</a>',
  },
  {
    name: '4-tick rocktails',
    skill: 'Cooking',
    actionXP: 225,
    actionsPerHour: 1400,
    baseCost: 'return (getPrice(554) + getPrice(20374)) / 7737.5 + (getPrice(15270) - 1.1 * getPrice(15272)) / this.actionXP',
    modifiers: [
      raf,
      {
        name: 'Dwarven Army Axe',
        effect() {
          return {bonus: 3 / 225};
        },
      },
      pulse,
      ava6,
      urnEnhancer,
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
      urns,
      {
        name: '94 Cooking',
      },
    ],
    desc: 'afk/altscape way of cooking rocktails',
  },
  {
    name: 'Wines',
    skill: 'Cooking',
    actionXP: 201,
    actionsPerHour: 5100,
    baseCost: 'return (getPrice(1937) + getPrice(1987) - getPrice(1993)) / this.actionXP',
    modifiers: [
      raf,
      pulse,
      ava6,
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
  // crafting dstones, diamonds, black dhide, red dhide
  // defence - SW
  {
    name: 'Guthixian Caches',
    skill: 'Divination',
    actionXP: 73400,
    actionsPerHour: 60 / 4,
    baseCost: 'return 0',
    modifiers: [],
    requirements: [
      {
        name: '99 Divination',
      },
    ],
    daily: 'return 2 / this.actionsPerHour',
    desc: 'Mobile perk, Children of Mah, and bladed dive highly recommended <a href="https://www.youtube.com/watch?v=EUMy0JuW1uw" target="_blank">older guide</a>',
  },
  // ancestral contract > cursed convert > ancestral > incan
  // dg
  {
    name: 'Tree Run',
    skill: 'Farming',
    base: `treesThatCanDie = 12 * 13913.8 + 12516.6 + 23463 / 3;
    treesThatCantDie = 15000 + 8500 + 7 * 6380.4;
    return (0.86 * treesThatCanDie + treesThatCantDie) * 60 / 11`,
    baseCost: `const xp = this.base * this.daily;
    const cost = 12 * getPrice(5316) + getPrice(5290) + getPrice(31437) / 3 + 7 * (getPrice(5288) + 10 * getPrice(2114) - 6 * getPrice(5972)) + 64 / 3 * (1500 + getPrice(6034));
    return cost / xp + (getPrice(561) + getPrice(40838)) / 7000`,
    modifiers: [
      raf,
      pulse,
      ava6,
      urnEnhancer,
    ],
    requirements: [
      {
        name: '94 Farming',
      },
      urns,
      {
        name: 'Farming Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    daily: 'return 11 / 60',
    // add updated videos with bladed dive
    desc: '<a href="https://www.youtube.com/watch?v=27gum6noa-U" target="_blank">Full run</a> (6 Magics, 7 Papaya, Calquat, Crystal Tree, .33 Elder, Arc Berries) + magic only run. Do spirit trees if you have them, but they are not part of the calculation',
  },
  // firemaking - BoC, curly roots, BA
  // fishing - WF, Wobb, Wobb contract, with/without chompas
  {
    name: 'Dragon darts',
    skill: 'Fletching',
    actionXP: 25,
    actionsPerHour: 55000,
    baseCost: 'return (0.9 * (getPrice(314) + getPrice(11232)) - 150) / this.actionXP',
    modifiers: [
      {
        name: 'Fletching Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      raf,
      pulse,
      ava6,
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
  arrowMethod('Dragon arrows', 15, 11237, 240),
  arrowMethod('Dark arrows', 17.5, 29729, 30),
  arrowMethod('Rune arrows', 12.5, 892, 153),
  arrowMethod('Broad arrows', 15, 44, 0),
  {
    name: 'Overloads from supers',
    skill: 'Herblore',
    actionXP: 2201,
    actionsPerHour: 460,
    baseCost: `const extremes = (0.9 * (getPrice(261) + getPrice(267) + getPrice(2481) + getPrice(4698) + 5 * getPrice(12539))
                                    + (getPrice(145) + getPrice(157) + getPrice(163) + getPrice(3042) + getPrice(169))) / 1.1;
    const totalCost = 0.983 * (extremes + getPrice(269));
    return totalCost / this.actionXP`,
    modifiers: [
      raf,
      pulse,
      ava6,
    ],
    requirements: [
      {
        name: 'Modified Botanist Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Portable Wells',
        effect() {
          return {base: 0.1};
        },
      },
      {
        name: '96 Herblore',
      },
    ],
    desc: 'Make overloads the normal way',
  },
  // 1 tick ovl
  {
    name: 'Ornate Tortles',
    skill: 'Hunter',
    actionXP: 204 * 1585,
    actionsPerHour: 60 / 15,
    baseCost: 'return (getPrice(4698) + getPrice(40878)) / 8000',
    modifiers: [
      raf,
      ava3,
      urnEnhancer,
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
        name: '96 Hunter',
      },
      urns,
    ],
    desc: '<a href="https://www.youtube.com/watch?v=ocDtzwSV1jM" target="_blank">Hunt ornate tortles with Sliske\'s endgame set and tick manip trap laying</a>',
  },
  {
    name: 'Crystal Skillchompas',
    skill: 'Hunter',
    actionXP: 476,
    actionsPerHour: 2400,
    baseCost: 'return (getPrice(4698) + getPrice(40878)) / 8000 - getPrice(40995) / this.actionXP',
    modifiers: [
      raf,
      ava3,
      urnEnhancer,
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
        name: '97 Hunter',
      },
      urns,
    ],
    desc: '<a href="https://www.youtube.com/watch?v=xlwBeB5sttY" target="_blank">Hunt crystal skillchompas with aggro pot, Sliske\'s endgame set, and tick manip trap laying</a>',
  },
  {
    name: 'Siphoning Gear',
    skill: 'Invention',
    base: 'return 622566',
    baseCost: 'return getPrice(36730) / 621000',
    modifiers: [],
    requirements: [
      {
        name: 'T90 gear',
      },
      {
        name: '60 Invention (for lv 12 items)',
      },
    ],
    desc: 'Siphon T90 weapons/armour (and crystal tools if desired). You will easily max out invention before all other skills',
    lossless: true,
  },
  // mage SW, wildy aby demons, aby demons
  // geysers, alaea, BA, crystallize?
  // frosts, airuts, rune dragon, searing ashes, scatter/bury, cleansing 5-tick and afk
  // ranged SW, widly aby demons, aby demons
  // soul RC, bloods
  {
    name: 'Movran Tasks',
    skill: 'Slayer',
    base: 'return 1000000',
    baseCost: 'return -4',
    modifiers: [
      raf,
      ava3,
    ],
    requirements: [
      {
        name: 'Max combat gear',
      },
      {
        name: '117 Slayer',
      },
    ],
    desc: '<a href="https://docs.google.com/spreadsheets/d/1hYNMQ_2QjhebZJsMCXEGDarEekOT1uZiPGx0i26ILps/edit#gid=0" target="_blank">Slayer is situational, but this spreadsheet gives a decent view into tasks you should do</a>',
  },
  // rune ceremonial daily, r2h/pl8leg
  // str = att
  summoningMethod('Pack Yak', 422.4 + 4.8, 211, 10818, 12435),
  summoningMethod('Steel titan', 435.2 + 4.9, 178, 1119, 12825),
  summoningMethod('Fire titan', 695.2 + 7.9, 198, 1442, 12824),
  summoningMethod('Moss titan', 695.2 + 7.9, 202, 1440, 12824),
  summoningMethod('Geyser titan', 783.2 + 8.9, 222, 1444, 12833),
  // prifpocket, dwarf traders
  {
    name: 'Goebiebands',
    skill: 'Woodcutting',
    actionXP: 48515,
    actionsPerHour: 60 / 2,
    baseCost: 'return 0',
    modifiers: [],
    requirements: [
      {
        name: '99 Woodcutting',
      },
    ],
    daily: 'return 2 / 60',
    desc: '<a href="https://www.youtube.com/watch?v=zSozFZsEXF0" target="_blank">Turn in 10 Goebieband supplies for Woodcutting XP</a>',
  },
  {
    name: 'Divine Yews',
    skill: 'Woodcutting',
    actionXP: 175,
    actionsPerHour: 2800,
    baseCost: 'return 40 * getPrice(32092) / (this.base * this.daily)',
    modifiers: [
      raf,
      pulse,
      ava6,
      {
        name: 'Lumberjack outfit',
        effect() {
          return {bonus: 0.05};
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
    daily: 'return 500 / this.actionsPerHour',
    desc: '<a href="https://www.youtube.com/watch?v=6XvOyUn6z_c" target="_blank">Cut divine yews with an extended divine location cap. Yews are hosted in w48 Burthorpe around reset time</a>',
  },
  // crystallize acadia, golden bamboo
];

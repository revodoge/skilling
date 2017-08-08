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
    desc: '<a href="https://www.youtube.com/watch?v=RuSfTG0yYpM" target="_blank">get bonus XP from playing Barbarian Assault Hard Mode waves 1-9 (16 min rounds)</a>',
    bonus: true,
  },
  {
    name: 'Silverhawk Boots',
    skill: 'Agility',
    base: 'return 860 * 80',
    baseCost: 'return getPrice(30915) / 860',
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
    base: 'return 1000 * 1120',
    baseCost: 'return getPrice(8782) * (.9 * 8 + .1 * 7) / 1120',
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
  // flatpack
  {
    name: 'Combat',
    skill: 'Constitution',
    base: 'return Infinity',
    baseCost: 'return 0',
    modifiers: [],
    requirements: [],
    desc: 'You get this for free with 200m combat skills',
  },
  {
    name: '3-tick rocktails',
    skill: 'Cooking',
    base: 'return 1850 * 225',
    baseCost: 'return (getPrice(554) + getPrice(20374)) / 7737.5 + (getPrice(15270) - 1.1 * getPrice(15272)) / 225',
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
    base: 'return 1400 * 225',
    baseCost: 'return (getPrice(554) + getPrice(20374)) / 7737.5 + (getPrice(15270) - 1.1 * getPrice(15272)) / 225',
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
    base: 'return 5100 * 201',
    baseCost: 'return (getPrice(1937) + getPrice(1987) - getPrice(1993)) / 201',
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
  // defence - SW
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
    base: 'return 25 * 55000',
    baseCost: 'return (0.9 * (getPrice(314) + getPrice(11232)) - 150) / 25',
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
  {
    name: 'Dragon arrows',
    skill: 'Fletching',
    base: 'return 15 * 43000',
    baseCost: 'return (0.9 * (getPrice(11237) + getPrice(53)) - 240) / 15',
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
  },
  {
    name: 'Dark arrows',
    skill: 'Fletching',
    base: 'return 17.5 * 43000',
    baseCost: 'return (0.9 * (getPrice(29729) + getPrice(53)) - 30) / 17.5',
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
    desc: 'Make dark arrows, sell to general store',
  },
  {
    name: 'Rune arrows',
    skill: 'Fletching',
    base: 'return 12.5 * 43000',
    baseCost: 'return (0.9 * (getPrice(892) + getPrice(53)) - 153) / 12.5',
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
        name: '75 Fletching',
      },
    ],
    desc: 'Make rune arrows, sell to general store',
  },
  {
    name: 'Broad arrows',
    skill: 'Fletching',
    base: 'return 15 * 43000',
    baseCost: 'return 0.9 * (getPrice(44) + getPrice(53)) / 15',
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
        name: '52 Fletching',
      },
    ],
    desc: 'Make broad arrows',
  },
  {
    name: 'Overloads from supers',
    skill: 'Herblore',
    base: 'return 2201 * 460',
    baseCost: `const extremes = (0.9 * (getPrice(261) + getPrice(267) + getPrice(2481) + getPrice(4698) + 5 * getPrice(12539))
                                    + (getPrice(145) + getPrice(157) + getPrice(163) + getPrice(3042) + getPrice(169))) / 1.1;
    const totalCost = 0.983 * (extremes + getPrice(269));
    return totalCost / 2201`,
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
    base: 'return 204 * 1585 * 60 / 15',
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
    base: 'return 3000 * 476',
    baseCost: 'return (getPrice(4698) + getPrice(40878)) / 8000 - getPrice(40995) / 476',
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
  // frosts, airuts, rune dragon, searing ashes, scatter/bury
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
  {
    name: 'Pack Yak',
    skill: 'Summoning',
    base: 'return 16750 * (422.4 + 4.8)',
    baseCost: 'return (211 * 25 + getPrice(10818) - 10 * getPrice(12435)) / (422.4 + 4.8)',
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
  },
  {
    name: 'Steel titan',
    skill: 'Summoning',
    base: 'return 16750 * (435.2 + 4.9)',
    baseCost: 'return (178 * 25 + getPrice(1119) - 10 * getPrice(12825)) / (435.2 + 4.9)',
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
        name: '99 Summoning',
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=1rS81xB9iwQ" target="_blank">Taverley Shop method</a>',
  },
  {
    name: 'Fire titan',
    skill: 'Summoning',
    base: 'return 16750 * (695.2 + 7.9)',
    baseCost: 'return (198 * 25 + getPrice(1442) - 10 * getPrice(12824)) / (695.2 + 7.9)',
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
        name: '79 Summoning',
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=1rS81xB9iwQ" target="_blank">Taverley Shop method</a>',
  },
  {
    name: 'Moss titan',
    skill: 'Summoning',
    base: 'return 16750 * (695.2 + 7.9)',
    baseCost: 'return (202 * 25 + getPrice(1440) - 10 * getPrice(12824)) / (695.2 + 7.9)',
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
        name: '79 Summoning',
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=1rS81xB9iwQ" target="_blank">Taverley Shop method</a>',
  },
  {
    name: 'Geyser titan',
    skill: 'Summoning',
    base: 'return 16750 * (783.2 + 8.9)',
    baseCost: 'return (222 * 25 + getPrice(1444) - 10 * getPrice(12833)) / (783.2 + 8.9)',
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
        name: '89 Summoning',
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=1rS81xB9iwQ" target="_blank">Taverley Shop method</a>',
  },
  // prifpocket, dwarf traders
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
    desc: '<a href="https://www.youtube.com/watch?v=zSozFZsEXF0" target="_blank">Turn in 10 Goebieband supplies for Woodcutting XP</a>',
  },
  {
    name: 'Divine Yews',
    skill: 'Woodcutting',
    base: 'return 2800 * 175',
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
    daily: 'return 500 / 2800',
    desc: '<a href="https://www.youtube.com/watch?v=6XvOyUn6z_c" target="_blank">Cut divine yews with an extended divine location cap. Yews are hosted in w48 Burthorpe around reset time</a>',
  },
  // crystallize acadia, golden bamboo
];

/* eslint-disable max-len,prefer-arrow-callback */
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

function arrowMethod(name, levelRequired, actionXP, arrowheadID, sell) {
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
        name: `${levelRequired} Fletching`,
      },
    ],
    desc: `Make ${name.toLowerCase()}, sell to general store`,
  };
}

function summoningMethod(name, levelRequired, actionXP, shards, primaryIngID, scrollID) {
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
        name: `${levelRequired} Summoning`,
      },
    ],
    desc: `<a href="https://www.youtube.com/watch?v=1rS81xB9iwQ" target="_blank">Taverley Shop method</a>, ${name.toLowerCase()} pouches`,
  };
}

function dhideShieldMethod(name, levelRequired, actionXP, costPerAction) {
  return {
    name,
    skill: 'Crafting',
    actionXP,
    actionsPerHour: 1820,
    baseCost: `return (${costPerAction}) / this.actionXP`,
    modifiers: [
      raf,
      pulse,
      ava6,
    ],
    requirements: [
      {
        name: 'Modified Artisan outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: `${levelRequired} Crafting`,
      },
      {
        name: 'Scroll of Proficiency',
      },
      {
        name: 'Portable Crafters',
        effect() {
          return {base: 0.1};
        },
      },
    ],
    desc: `Make ${name.toLowerCase()} with yak`,
  };
}

function cutGemMethod(name, levelRequired, actionXP, uncutID, cutID) {
  return {
    name,
    skill: 'Crafting',
    actionXP,
    actionsPerHour: 5300,
    baseCost: `return (0.95 * getPrice(${uncutID}) - 1.02 * getPrice(${cutID})) / this.actionXP`,
    modifiers: [
      raf,
      pulse,
      ava6,
      {
        name: 'Artisan outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    requirements: [
      {
        name: `${levelRequired} Crafting`,
      },
      {
        name: 'Crystal Chisel',
      },
      {
        name: 'Portable Crafters',
        effect() {
          return {base: 0.1};
        },
      },
    ],
    desc: `<a href="https://www.youtube.com/watch?v=PiwKyMAo4hA" target="_blank">Cut ${name.toLowerCase()}</a>, prices may differ if buying/selling in bulk`,
  };
}

function altarMethod(name, actionXP, itemID) {
  return {
    name,
    skill: 'Prayer',
    actionXP,
    actionsPerHour: 1900,
    baseCost: `return 0.98 * getPrice(${itemID}) / this.actionXP`,
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {
        name: 'Gilded Altar, or Chaos Altar in Wildy',
        effect() {
          return {bonus: 2.5};
        },
      },
      {
        name: 'Modified First Age Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Perfect Juju Prayer Potion',
        effect() {
          return {base: 0.05};
        },
      },
    ],
    desc: 'Run bones with alt',
  };
}

window.skillList = ['Attack', 'Defence', 'Strength', 'Constitution', 'Ranged', 'Prayer', 'Magic',
  'Cooking', 'Woodcutting', 'Fletching', 'Fishing', 'Firemaking', 'Crafting', 'Smithing',
  'Mining', 'Herblore', 'Agility', 'Thieving', 'Slayer', 'Farming', 'Runecrafting',
  'Hunter', 'Construction', 'Summoning', 'Dungeoneering', 'Divination', 'Invention'];

const prismania = window.skillList.map(function (skill) {
  return {
    name: 'Prismania',
    skill,
    base: 'return 10000000',
    baseCost: 'return 40',
    modifiers: [],
    requirements: [
      {
        name: 'Get Bond',
      },
    ],
    bonus: true,
    spinner: true,
    desc: 'You spin me right round',
  };
});
const smouldering = window.skillList.map(function (skill) {
  return {
    name: 'Smouldering Lamps',
    skill,
    base: 'return 8000000',
    baseCost: 'return 70',
    modifiers: [],
    requirements: [
      {
        name: 'Get Bond',
      },
    ],
    spinner: true,
    desc: 'You spin me right round',
  };
});

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
  // attack - SW, PSD shapeshifters, aby demon, airut
  {
    name: 'Abyssal Demons (wildy)',
    skill: 'Attack',
    actionXP: 661,
    actionsPerHour: 1800,
    baseCost: 'return 6000000 / this.base',
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {
        name: 'Noxious Scythe',
      },
      {
        name: '85 Slayer',
      },
      {
        name: 'Demon slayer gear',
        effect() {
          return {bonus: 0.08};
        },
      },
      {
        name: 'Slayer contracts',
        effect() {
          return {bonus: 0.2};
        },
      },
    ],
    wildy: true,
    desc: 'Loot with alt<a href="https://www.youtube.com/watch?v=RrIF_K9obQw" target="_blank">vid by Roskat</a>',
  },
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
    afk: true,
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
    afk: true,
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
  dhideShieldMethod('Green d\'hide Shields', 64, 248, '(4 - 0.4) * getPrice(1745) - getPrice(25794)'),
  dhideShieldMethod('Blue d\'hide Shields', 72, 280, '(4 - 0.35) * getPrice(2505) - getPrice(25796)'),
  dhideShieldMethod('Red d\'hide Shields', 78, 312, '(4 - 0.3) * getPrice(2507) - getPrice(25798)'),
  dhideShieldMethod('Black d\'hide Shields', 85, 344, '(4 - 0.25) * getPrice(2509) - getPrice(25800)'),
  cutGemMethod('Diamonds', 43, 107.5, 1617, 1601),
  cutGemMethod('Dragonstones', 55, 137.5, 1631, 1615),
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
    baseCost: `const xp = this.dailyXP;
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
  arrowMethod('Dragon arrows', 90, 15, 11237, 240),
  arrowMethod('Dark arrows', 95, 17.5, 29729, 30),
  arrowMethod('Rune arrows', 75, 12.5, 892, 153),
  arrowMethod('Broad arrows', 52, 15, 44, 0),
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
  altarMethod('Dragon Bones', 72, 536),
  altarMethod('Hardened Dragon Bones', 144, 35008),
  altarMethod('Airut Bones', 132.5, 30209),
  altarMethod('Frost Dragon Bones', 180, 18832),
  altarMethod('Reinforced Dragon Bones', 190, 35010),
  {
    name: 'Scatter/Bury: Dragon Bones + Infernal Ashes',
    skill: 'Prayer',
    actionXP: 2 * 72 + 62.5,
    actionsPerHour: 5500,
    baseCost: 'return (0.98 * getPrice(536) + getPrice(20268)) / this.actionXP',
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {
        name: 'Modified First Age Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Perfect Juju Prayer Potion',
        effect() {
          return {base: 0.05};
        },
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=wq4FA8qxAZ4" target="_blank">Video by Persiflage</a> Can also be done losslessly with other skills such as Herblore, Cooking',
  },
  {
    name: '5-tick cleansing crystals',
    skill: 'Prayer',
    actionXP: 2100,
    actionsPerHour: 1200,
    baseCost: 'return 110000 / this.actionXP',
    modifiers: [
      raf,
      ava6,
      {
        name: 'Voice of Seren',
        effect() {
          return {base: 0.2};
        },
      },
    ],
    requirements: [
      {
        name: 'Modified First Age Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Perfect Juju Prayer Potion',
        effect() {
          return {base: 0.05};
        },
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=tjN34chGyR4" target="_blank">Demonstration by Crusaderr</a>',
  },
  {
    name: 'Cleansing crystals',
    skill: 'Prayer',
    actionXP: 9800,
    actionsPerHour: 29,
    baseCost: 'return 110000 / this.actionXP',
    modifiers: [
      raf,
      ava6,
      {
        name: 'Voice of Seren',
        effect() {
          return {base: 0.2};
        },
      },
    ],
    requirements: [
      {
        name: 'Modified First Age Outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Perfect Juju Prayer Potion',
        effect() {
          return {base: 0.05};
        },
      },
    ],
    afk: true,
    desc: 'Tirannwn quiver 3 or 4 makes it completely AFK',
  },
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
  // r2h/pl8leg
  {
    name: 'Rune Ceremonial Sword',
    skill: 'Smithing',
    actionXP: 10487.5 * 1.1, // you can get perfect sword about half the time
    actionsPerHour: 60,
    baseCost: 'return 50 * getPrice(32092) / this.dailyXP',
    modifiers: [
      raf,
      ava6,
      {
        name: 'Blacksmith outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Falador Shield 4',
        effect() {
          return {base: 0.05};
        },
      },
      {
        name: 'Tinker 3',
        effect() {
          return {base: 0.0375};
        },
      },
    ],
    requirements: [
      {
        name: '99 Smithing',
      },
      {
        name: 'Daily challenge',
        effect() {
          return {bonus: 67395 / 145500}; // ???
        },
      },
      {
        name: 'Bonus Packs',
        effect() {
          return {bonus: 5 / 100}; // 50k bonus per 100 respect, 10k xp per respect
        },
      },
    ],
    daily: 'return 12 / this.actionsPerHour',
    desc: '<a href="https://www.youtube.com/watch?v=bpvjOI3sJ6I" target="_blank">Of course, I fear no demon</a>',
  },
  // str = att
  summoningMethod('Pack Yak', 96, 422.4 + 4.8, 211, 10818, 12435),
  summoningMethod('Steel titan', 99, 435.2 + 4.9, 178, 1119, 12825),
  summoningMethod('Fire titan', 79, 695.2 + 7.9, 198, 1442, 12824),
  summoningMethod('Moss titan', 79, 695.2 + 7.9, 202, 1440, 12824),
  summoningMethod('Geyser titan', 89, 783.2 + 8.9, 222, 1444, 12833),
  {
    name: 'Dwarf Traders',
    skill: 'Thieving',
    actionXP: 556.5,
    actionsPerHour: 1670,
    baseCost: 'return -1',
    modifiers: [
      raf,
      ava6,
      {
        name: 'Cheeky Monkey', // TODO: test the effect of this
        effect() {
          return {base: 0};
        },
      },
      {
        name: 'Black Ibis',
        effect() {
          return {bonus: 0.05};
        },
      },
    ],
    requirements: [
      {
        name: '90 Thieving',
      },
      {
        name: 'T3+ Five Finger Discount',
      },
      {
        name: 'Crystal Mask + Light Form',
      },
      {
        name: 'Ardy Cape 4 or Thieving Cape Perk',
      },
      {
        name: 'Soul-in-a-box',
      },
      {
        name: 'Featherfingered Necklace',
      },
      {
        name: 'Trahaern Exoskeleton (or camo outfit)',
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=-05YAUMEDPs" target="_blank">Aura makes a big difference, cheeky monkey is best but discontinued now</a>',
  },
  {
    name: 'Priffdinas Elves',
    skill: 'Thieving',
    base: 'return 420000',
    baseCost: 'return -3',
    modifiers: [
      raf,
      ava6,
      {
        name: 'Black Ibis',
        effect() {
          return {bonus: 0.05};
        },
      },
    ],
    requirements: [
      {
        name: '98 Thieving',
      },
      {
        name: 'Ardy Cape 4',
      },
      {
        name: 'Trahaern Exoskeleton (or camo outfit)',
      },
    ],
    afk: true,
    desc: '<a href="https://www.youtube.com/watch?v=-05YAUMEDPs" target="_blank">Aura makes a big difference, cheeky monkey is best but discontinued now</a>',
  },
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
    baseCost: 'return 40 * getPrice(32092) / this.dailyXP',
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
].concat(prismania, smouldering);

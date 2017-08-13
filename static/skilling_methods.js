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
        name: 'Fletcher\'s outfit',
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
      {name: `${levelRequired} Fletching`},
    ],
    desc: `Make ${name.toLowerCase()}${sell > 0 ? ', sell to general store' : ''}`,
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
    ],
    requirements: [
      {name: `${levelRequired} Summoning`},
      {
        name: 'Shaman\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    desc: 'Taverley Shop method <a href="https://www.youtube.com/watch?v=1rS81xB9iwQ" target="_blank">Video by Drowns</a>',
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
        name: 'Modified Artisan\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {name: `${levelRequired} Crafting`},
      {name: 'Scroll of Proficiency'},
      {
        name: 'Portable Crafters',
        effect() {
          return {base: 0.1};
        },
      },
    ],
    desc: `Make ${name.toLowerCase()} with a Mammoth`,
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
    ],
    requirements: [
      {name: `${levelRequired} Crafting`},
      {
        name: 'Artisan\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {name: 'Crystal Chisel'},
      {
        name: 'Portable Crafters',
        effect() {
          return {base: 0.1};
        },
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=PiwKyMAo4hA" target="_blank">Video by Persiflage</a>, prices may differ if buying/selling in bulk',
  };
}

function wildyAltarMethod(name, actionXP, itemID) {
  return {
    name: `${name} in wilderness`,
    skill: 'Prayer',
    actionXP,
    actionsPerHour: 2000,
    baseCost: `return 0.98 * getPrice(${itemID}) / this.actionXP`,
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {
        name: 'Chaos Altar in Wildy',
        effect() {
          return {base: 2.5};
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
    wildy: true,
    desc: '<a href="https://www.youtube.com/watch?v=7IO5E2Lzggo" target="_blank">Run bones with alt</a>',
  };
}

function altarMethod(name, boneXP, itemID) {
  return {
    name,
    skill: 'Prayer',
    actionXP: boneXP * 3.5,
    actionsPerHour: 1800,
    baseCost: `return 0.98 * getPrice(${itemID}) / this.actionXP`,
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {name: 'Gilded Altar'},
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
    base: 'return 15000000',
    baseCost: 'return 40',
    modifiers: [],
    requirements: [],
    bonus: true,
    spinner: true,
    desc: '<a href="http://www.runescape.com/a=12/bonds" target="_blank">Get Bond</a>',
  };
});
const smouldering = window.skillList.map(function (skill) {
  return {
    name: 'Smouldering Lamps',
    skill,
    base: 'return 10000000',
    baseCost: 'return 70',
    modifiers: [],
    requirements: [],
    spinner: true,
    desc: '<a href="http://www.runescape.com/a=12/bonds" target="_blank">Get Bond</a>',
  };
});

const meleeMethods = [
  // TODO: PSD shapeshifters, aby demon, airut
  {
    name: 'Abyssal Demons (wildy)',
    actionXP: 661,
    actionsPerHour: 1800,
    baseCost: 'return -6000000 / this.base',
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {name: 'Noxious Scythe'},
      {name: '85 Slayer'},
      {name: 'Spring Cleaner'},
      {
        name: 'Demon slayer gear',
        effect() {
          return {bonus: 0.08};
        },
      },
      {
        name: 'Slayer contracts',
        effect() {
          return {bonus: 0.33};
        },
      },
    ],
    wildy: true,
    desc: '<a href="https://www.youtube.com/watch?v=RrIF_K9obQw" target="_blank">Video by Roskat</a>, looting with alt highly recommended. + 130k ranged/def xp/hr from cannon and 145k prayer xp/hr from attuned ectoplasmator',
  },
  {
    name: 'Shattered Worlds (melee)',
    base: 'return 1610000',
    baseCost: 'return 2500000 / this.base',
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {name: 'Noxious Scythe'},
      {name: 'Vamp Scrim'},
      {name: 'Combat Gear'},
    ],
    desc: '<a href="https://www.youtube.com/watch?v=GWAetPN8dZ0" target="_blank">Video by Jona</a>',
  },
];

const attack = meleeMethods.map(function (m) {
  return Object.assign({skill: 'Attack'}, m);
});

const strength = meleeMethods.map(function (m) {
  return Object.assign({skill: 'Strength'}, m);
});

const defMelee = meleeMethods.map(function (m) {
  return Object.assign({skill: 'Defence'}, m);
});

window.methods = [
  {
    name: 'Barbarian Assault',
    skill: 'Agility',
    actionXP: 308439,
    actionsPerHour: 60 / 16,
    baseCost: 'return 0',
    modifiers: [],
    requirements: [{name: 'Barbarian Assault team'}],
    desc: 'Barbarian Assault Hard Mode waves 1-9 (16 min rounds) <a href="https://www.youtube.com/watch?v=RuSfTG0yYpM" target="_blank">Video by Crusaderr</a>',
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
      {name: 'Silverhawk boots'},
      {name: '99 Agility'},
    ],
    lossless: true,
    afk: true,
    desc: 'wear boots, get XP',
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
    ],
    requirements: [
      {name: '73 Construction'},
      {
        name: 'God Chisel',
        effect() {
          return {bonus: 0.01};
        },
      },
      {
        name: 'Constructor\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {name: 'Scroll of proficiency'},
      {name: 'Monkey Butler (Can use Demon Butler if you feel like it)'},
    ],
    desc: '<a href="https://www.youtube.com/watch?v=h6hRV9RuViw" target="_blank">Video by NRiver</a>, don\'t use AHK or you\'ll face the same fate as Damp Cat v1',
  },
  {
    name: 'Mahogany Table Flatpack',
    skill: 'Construction',
    actionXP: 840,
    actionsPerHour: 400,
    baseCost: 'return getPrice(8782) * 6 / this.actionXP',
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {name: '52 Construction'},
      {
        name: 'God Chisel',
        effect() {
          return {bonus: 0.01};
        },
      },
      {
        name: 'Constructor\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {name: 'Monkey Butler (Can use Demon Butler if you feel like it)'},
    ],
    afk: true,
    alt: 1,
    desc: 'Don\'t do it unless you have nothing else to AFK',
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
      pulse,
      ava6,
      urnEnhancer,
    ],
    requirements: [
      {name: 'Cooking Gauntlets/Cooking Skillcape'},
      {
        name: 'Dwarven Army Axe',
        effect() {
          return {bonus: 3 / 225 / 1.215};
        },
      },
      {
        name: 'Portable Ranges',
        effect() {
          return {base: 0.215};
        },
      },
      {
        name: 'Modified Sous chef\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      urns,
      {name: '94 Cooking'},
    ],
    desc: '<a href="https://www.youtube.com/watch?v=OMlT6PzmEjE" target="_blank">Video by Efficiency Experts Youtube</a>',
  },
  {
    name: '4-tick rocktails',
    skill: 'Cooking',
    actionXP: 225,
    actionsPerHour: 1400,
    baseCost: 'return (getPrice(554) + getPrice(20374)) / 7737.5 + (getPrice(15270) - 1.1 * getPrice(15272)) / this.actionXP',
    modifiers: [
      raf,
      pulse,
      ava6,
      urnEnhancer,
    ],
    requirements: [
      {name: 'Cooking Gauntlets/Cooking Skillcape'},
      {
        name: 'Dwarven Army Axe',
        effect() {
          return {bonus: 3 / 225 / 1.215};
        },
      },
      {
        name: 'Portable Ranges',
        effect() {
          return {base: 0.215};
        },
      },
      {
        name: 'Modified Sous chef\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      urns,
      {name: '94 Cooking'},
    ],
    afk: true,
    alt: 1,
    desc: '<a href="https://clips.twitch.tv/FlirtyZealousNoodleGivePLZ" target="_blank">Video by Dragonseance</a>',
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
      {name: '35 Cooking'},
    ],
    desc: '<a href="https://www.youtube.com/watch?v=9fAn3R76aUA" target="_blank">Video by Persiflage</a>, use a BoB',
  },
  dhideShieldMethod('Green d\'hide Shields', 64, 248, '(4 - 0.4) * getPrice(1745) - getPrice(25794)'),
  dhideShieldMethod('Blue d\'hide Shields', 72, 280, '(4 - 0.35) * getPrice(2505) - getPrice(25796)'),
  dhideShieldMethod('Red d\'hide Shields', 78, 312, '(4 - 0.3) * getPrice(2507) - getPrice(25798)'),
  dhideShieldMethod('Black d\'hide Shields', 85, 344, '(4 - 0.25) * getPrice(2509) - getPrice(25800)'),
  cutGemMethod('Diamonds', 43, 107.5, 1617, 1601),
  cutGemMethod('Dragonstones', 55, 137.5, 1631, 1615),
  {
    name: 'Shattered Worlds (ranged)',
    skill: 'Defence',
    base: 'return 1860000',
    baseCost: 'return 2500000 / this.base',
    modifiers: [
      raf,
      ava3,
    ],
    requirements: [
      {name: 'Mechanized Chins'},
      {name: 'Combat Gear'},
    ],
    desc: '<a href="https://www.youtube.com/watch?v=x4Yo8gN1dME&t=119" target="_blank">Video by Jona</a>',
  },
  {
    name: 'Guthixian Caches',
    skill: 'Divination',
    actionXP: 73400,
    actionsPerHour: 60 / 4,
    baseCost: 'return 0',
    modifiers: [],
    requirements: [{name: '99 Divination'}],
    daily: 'return 2 / this.actionsPerHour',
    desc: '<a href="https://www.youtube.com/watch?v=EUMy0JuW1uw" target="_blank">Video by Crusaderr</a>, non-solo Cres not worth after Children of Mah and Bladed Dive',
  },
  {
    name: 'Ancestral Energy w/ contract',
    skill: 'Divination',
    actionXP: 53.5,
    actionsPerHour: 2400, // 2.5 ticks per action
    baseCost: 'return (getPrice(558) + getPrice(40798)) / 9500',
    modifiers: [
      raf,
      urnEnhancer,
      ava6,
    ],
    requirements: [
      {name: '95 Divination'},
      {
        name: 'Arc contract',
        effect() {
          return {bonus: 0.25 * 360 / 53.5};
        },
      },
      {
        name: 'Diviner\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      urns,
    ],
    daily: 'return 0.5',
    afk: true,
    alt: 1,
    desc: 'Do a flagged ancestral energy plot with contracts, Energy-gathering scrimshaw and Elder Divination Outfit will speed this up a bit',
  },
  {
    name: 'Ancestral Energy',
    skill: 'Divination',
    actionXP: 53.5,
    actionsPerHour: 2400, // 2.5 ticks per action
    baseCost: 'return (getPrice(558) + getPrice(40798)) / 9500',
    modifiers: [
      raf,
      urnEnhancer,
      ava6,
    ],
    requirements: [
      {name: '95 Divination'},
      {
        name: 'Diviner\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      urns,
    ],
    afk: true,
    alt: 1,
    desc: '<a href="http://i.imgur.com/RglOU9y.png" target="_blank">Omid\'s arc rates</a>',
  },
  {
    name: 'Cursed Energy Convert',
    skill: 'Divination',
    actionXP: 1.5,
    actionsPerHour: 1480 * 100,
    baseCost: 'return (0.9275 * 400 - 1.5 * getPrice(29324)) / this.actionXP',
    modifiers: [
      raf,
      pulse,
      ava6,
    ],
    requirements: [
      {name: 'Divination Skillcape'},
      {
        name: 'Modified Diviner\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    desc: 'Buy from forums. Cost here is assumed at buying for 400 each',
  },
  // TODO: real dg, challenge
  {
    name: 'Sinkholes',
    skill: 'Dungeoneering',
    actionXP: 180000,
    actionsPerHour: 12,
    baseCost: 'return 0',
    modifiers: [],
    requirements: [{name: '120 Dungeoneering'}],
    daily: 'return 2 / this.actionsPerHour',
    desc: '<a href="https://www.youtube.com/watch?v=4zKvqL7zmJs" target="_blank">adrenaline91 exposed</a>',
  },
  {
    name: '5:5 Larges',
    skill: 'Dungeoneering',
    actionXP: 200000, // need to test
    actionsPerHour: 8.5,
    baseCost: 'return 0',
    modifiers: [],
    requirements: [{name: '120 Dungeoneering'}],
    desc: `<a href="https://docs.google.com/document/d/1Kluwf-R4wPAwRxC4vXcyIfrTVrzWaVzuu2BzJUXihYI" target="_blank">Guide by DG Service FC</a>, rates depend on team ability<br>
<a href="https://www.youtube.com/watch?v=LbLiwr1f4Uw" target="_blank">What not to do ;)</a>`,
  },
  {
    name: 'Tree Run',
    skill: 'Farming',
    base: `treesThatCanDie = 12 * 13913.8 + 12516.6 + 23463 / 3;
    treesThatCantDie = 15000 + 8500 + 7 * 6380.4;
    return (0.86 * treesThatCanDie + treesThatCantDie) * 60 / 10`,
    baseCost: `const xp = this.dailyXP;
    const cost = 12 * getPrice(5316) + getPrice(5290) + getPrice(31437) / 3 + 7 * (getPrice(5288) + 10 * getPrice(2114) - 6 * getPrice(5972)) + 64 / 3 * (1500 + getPrice(6034));
    return cost / xp + (getPrice(561) + getPrice(40838)) / 7000`,
    modifiers: [
      raf,
      pulse,
      ava6,
      urnEnhancer,
      {
        name: 'Farmer\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    requirements: [
      {name: '94 Farming'},
      urns,
    ],
    daily: 'return 10 / 60',
    // TODO: add updated videos with bladed dive
    desc: '<a href="https://www.youtube.com/watch?v=27gum6noa-U" target="_blank">Full run</a> (6 Magics, 7 Papaya, Calquat, Crystal Tree, Elder, Arc Berries) + magic only run. Do spirit trees if you have them, but they are not part of the calculation',
  },
  {
    name: 'Book of Char',
    skill: 'Firemaking',
    actionXP: 607.6,
    actionsPerHour: 384 * 60 / 4, // 4 mins including set up
    baseCost: 'return getPrice(1513) / this.actionXP',
    modifiers: [],
    requirements: [{name: 'Book of Char'}],
    daily: 'return 384 / this.actionsPerHour',
    desc: '<a href="https://www.reddit.com/r/NRiver/comments/3z99jl/book_of_char/" target="_blank">Guide by NRiver</a>, use Elder logs if limiting factor',
  },
  {
    name: 'Barbarian Assault',
    skill: 'Firemaking',
    actionXP: 812921,
    actionsPerHour: 60 / 16,
    baseCost: 'return 0',
    modifiers: [],
    requirements: [{name: 'Barbarian Assault team'}],
    desc: 'Barbarian Assault Hard Mode waves 1-9 (16 min rounds) <a href="https://www.youtube.com/watch?v=RuSfTG0yYpM" target="_blank">Video by Crusaderr</a>',
    bonus: true,
  },
  {
    name: 'Jadinko Lair',
    skill: 'Firemaking',
    actionXP: 1514.8,
    actionsPerHour: 515,
    baseCost: 'return 0',
    modifiers: [
      ava6,
      raf,
    ],
    requirements: [
      {name: '83 Woodcutting'},
      {name: 'Superheat Form'},
      {
        name: 'Ring of fire + Flame gloves',
        effect() {
          return {bonus: 0.05};
        },
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=Ff5Dgq8lZnA" target="_blank">Video by Dreyri the #1 Ironman</a>',
  },
  {
    name: 'Wobbegongs with Skillchompas and Scrimshaw',
    skill: 'Fishing',
    actionXP: (0.205 * (0.85 * 1.1 + 0.15 * (922.5 / 682.5)) + 0.785 * 0.05) * 682.5, // 20.5% success, 15% scrimshaw, 10% furnace proc on remaining
    actionsPerHour: 1500,
    baseCost: 'return getPrice(31597) / this.actionXP + (getPrice(555) + getPrice(20344)) / 9500 + getPrice(33896) / 3 / this.base',
    modifiers: [
      raf,
      urnEnhancer,
      ava6,
    ],
    requirements: [
      {name: '96 Fishing'},
      {
        name: 'Fishing outfit',
        effect() {
          return {bonus: 0.05};
        },
      },
      {name: 'T5 Call of the Seas'},
      {name: 'Fury Shark Outfit'},
      {
        name: 'Skillchompa',
      },
      {
        name: 'Crystal Rod w/ Honed 5 + Furnace 2',
      },
      urns,
    ],
    afk: true,
    alt: 1,
    desc: `<a href="https://www.youtube.com/watch?v=9ixyY9Wfzns" target="_blank">Video by Revodoge</a>, Whopper-baiting scrimshaw also makes spots last longer<br>
 Scrim makes xp/hr worse for doing contracts (Price is based on azure skillchompa but any type works fine)`,
  },
  {
    name: 'Wobbegongs with Skillchompas',
    skill: 'Fishing',
    actionXP: (0.205 * 1.1 + 0.785 * 0.05) * 682.5, // 20.5% success, 10% furnace proc on success
    actionsPerHour: 1500,
    baseCost: 'return getPrice(31597) / this.actionXP + (getPrice(555) + getPrice(20344)) / 9500',
    modifiers: [
      raf,
      urnEnhancer,
      ava6,
    ],
    requirements: [
      {name: '96 Fishing'},
      {
        name: 'Fishing outfit',
        effect() {
          return {bonus: 0.05};
        },
      },
      {name: 'T5 Call of the Seas'},
      {name: 'Fury Shark Outfit'},
      {
        name: 'Skillchompa',
      },
      {
        name: 'Crystal Rod w/ Honed 5 + Furnace 2',
      },
      urns,
    ],
    afk: true,
    alt: 1,
    desc: `<a href="https://www.youtube.com/watch?v=Ot5nrMIYKfw" target="_blank">Video by Marina</a> (Price is based on azure skillchompa but any type works fine)`,
  },
  {
    name: 'Wobbegongs',
    skill: 'Fishing',
    actionXP: 682.5,
    actionsPerHour: 0.205 * 1500, // 20.5% success, 4 ticks per attempt
    baseCost: 'return (getPrice(555) + getPrice(20344)) / 9500',
    modifiers: [
      raf,
      urnEnhancer,
      ava6,
    ],
    requirements: [
      {name: '96 Fishing'},
      {name: 'T5 Call of the Seas'},
      {
        name: 'Fishing outfit',
        effect() {
          return {bonus: 0.05};
        },
      },
      {name: 'Fury Shark Outfit'},
      {
        name: 'Crystal Rod w/ Honed 5 + Furnace 2',
        effect() {
          return {base: 0.1};
        },
      },
      urns,
    ],
    afk: true,
    alt: 1,
    desc: 'TFW can\'t afford skillchompas after update :(',
  },
  {
    name: 'Dragon darts',
    skill: 'Fletching',
    actionXP: 25,
    actionsPerHour: 55000,
    baseCost: 'return (0.9 * (getPrice(314) + getPrice(11232)) - 150) / this.actionXP',
    modifiers: [
      {
        name: 'Fletcher\'s outfit',
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
      {name: '95 Fletching'},
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
        name: 'Modified Botanist\'s outfit',
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
      {name: '96 Herblore'},
    ],
    desc: 'Use a Mammoth for the overloads',
  },
  // TODO: 1 tick ovl
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
    ],
    requirements: [
      {name: '96 Hunter'},
      {name: 'Sliske\'s Endgame'},
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
      urns,
    ],
    desc: '<a href="https://www.youtube.com/watch?v=ocDtzwSV1jM" target="_blank">Video by Revodoge</a>',
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
    ],
    requirements: [
      {name: '97 Hunter'},
      {name: '99 Agility'},
      {name: 'Sliske\'s Endgame'},
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
      urns,
    ],
    desc: '<a href="https://www.youtube.com/watch?v=6ETexKA64ok" target="_blank">Video by Jona</a>',
  },
  {
    name: 'Siphoning Gear',
    skill: 'Invention',
    base: 'return 622566',
    baseCost: 'return getPrice(36730) / 621000',
    modifiers: [],
    requirements: [
      {name: 'T90 gear'},
      {name: '60 Invention (for lv 12 items)'},
    ],
    desc: 'Siphon T90 weapons/armour (and crystal tools).',
    lossless: true,
  },
  // TODO: wildy aby demons, aby demons
  {
    name: 'Shattered Worlds (magic)',
    skill: 'Magic',
    base: 'return 1600000',
    baseCost: 'return 2500000 / this.base',
    modifiers: [
      raf,
      ava3,
    ],
    requirements: [
      {name: 'Noxious Staff'},
      {name: 'Combat Gear'},
    ],
    desc: '<a href="https://www.youtube.com/watch?v=x4Yo8gN1dME&t=119" target="_blank">Video by Jona</a>',
  },
  // TODO: alaea?
  {
    name: 'Warbands',
    skill: 'Mining',
    actionXP: 363862.5,
    actionsPerHour: 60 / 10,
    baseCost: 'return 0',
    modifiers: [],
    requirements: [{name: 'Warbands FC or yolo'}],
    daily: 'return 1 / this.actionsPerHour',
    wildy: true,
    desc: '<a href="https://www.youtube.com/watch?v=Q8cIBTd3hCY" target="_blank">Sexy Mining Exp! Warbands OP As Balls Gf Spins</a>',
  },
  {
    name: 'Barbarian Assault',
    skill: 'Mining',
    actionXP: 444763,
    actionsPerHour: 60 / 16,
    baseCost: 'return 0',
    modifiers: [],
    requirements: [{name: 'Barbarian Assault team'}],
    desc: 'Barbarian Assault Hard Mode waves 1-9 (16 min rounds) <a href="https://www.youtube.com/watch?v=RuSfTG0yYpM" target="_blank">Video by Crusaderr</a>',
    bonus: true,
  },
  {
    name: 'Lava Geyser with alt',
    skill: 'Mining',
    actionXP: 500,
    actionsPerHour: 860,
    baseCost: 'return getPrice(31597) / this.actionXP',
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {name: 'Birthright of the Dwarves'},
      {
        name: 'Golden mining suit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Skillchompas',
        effect() {
          return {base: 0.1};
        },
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=vvaFDMd_Wo4" target="_blank">Video by Marina</a>, XP drops without alt due to hopping limit. Skillchompa bonus XP works here',
  },
  wildyAltarMethod('Dragon Bones', 72, 536),
  wildyAltarMethod('Hardened Dragon Bones', 144, 35008),
  wildyAltarMethod('Airut Bones', 132.5, 30209),
  wildyAltarMethod('Frost Dragon Bones', 180, 18832),
  wildyAltarMethod('Reinforced Dragon Bones', 190, 35010),
  altarMethod('Dragon Bones', 72, 536),
  altarMethod('Hardened Dragon Bones', 144, 35008),
  altarMethod('Airut Bones', 132.5, 30209),
  altarMethod('Frost Dragon Bones', 180, 18832),
  altarMethod('Reinforced Dragon Bones', 190, 35010),
  {
    name: 'Scatter/Bury: Dragon Bones + Infernal Ashes',
    skill: 'Prayer',
    actionXP: 2 * 72 + 62.5,
    actionsPerHour: 5750,
    baseCost: 'return (0.98 * getPrice(536) + getPrice(20268)) / this.actionXP',
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {
        name: 'Modified First Age Outfit',
        effect() {
          return {bonus: 0.04};
        },
      },
    ],
    desc: `<a href="https://www.youtube.com/watch?v=wq4FA8qxAZ4" target="_blank">Video by Persiflage</a>, use a BoB<br>
Can also be done losslessly with other skills such as Herblore, Cooking`,
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
        name: 'First Age Outfit',
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
    desc: '<a href="https://www.youtube.com/watch?v=tjN34chGyR4" target="_blank">Video by Crusaderr</a>',
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
        name: 'First Age Outfit',
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
    alt: 1,
    desc: 'Tirannwn quiver 3 or 4 makes it completely AFK',
  },
  // TODO: wildy aby demons
  {
    name: 'Shattered Worlds (ranged)',
    skill: 'Ranged',
    base: 'return 1860000',
    baseCost: 'return 2500000 / this.base',
    modifiers: [
      raf,
      ava3,
    ],
    requirements: [
      {name: 'Mechanized Chinchompas'},
      {name: 'Combat Gear'},
    ],
    desc: '<a href="https://www.youtube.com/watch?v=x4Yo8gN1dME&t=119" target="_blank">Video by Jona</a>',
  },
  {
    name: 'Soul Runes',
    skill: 'Runecrafting',
    actionXP: 220,
    actionsPerHour: 440,
    baseCost: 'return (getPrice(7936) - 1.05 * 0.8 * getPrice(566)) / this.actionXP + (getPrice(7936) + getPrice(40918)) / 7000',
    modifiers: [
      raf,
      {
        name: 'Urn Enhancer',
        effect() {
          return {bonus: 0.05 * 3.5};
        },
      },
      ava3,
    ],
    requirements: [
      {name: '90 Runecrafting'},
      {name: 'Massive Pouches'},
      {name: 'Phite Club'},
      {name: 'Tokkul-zo or Max Cape'},
      {
        name: 'Abyss w/ Demonic Skull',
        effect() {
          return {bonus: 2.5};
        },
      },
      {
        name: 'Master runecrafter robes',
        effect() {
          return {bonus: 0.05};
        },
      },
      {name: 'Infinity Ethereal Outfit'},
      {
        name: 'Urns',
        effect() {
          return {bonus: 0.2 * 3.5};
        },
      },
    ],
    afk: true,
    alt: 1,
    desc: '<a href="https://www.youtube.com/watch?v=HaO7etpX5zk" target="_blank">Video by Jona</a>',
  },
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
      {name: 'Combat gear'},
      {name: '117 Slayer'},
    ],
    desc: '<a href="https://docs.google.com/spreadsheets/d/1hYNMQ_2QjhebZJsMCXEGDarEekOT1uZiPGx0i26ILps/edit#gid=0" target="_blank">Jona\'s spreadsheet</a>, tweak to match your needs',
  },
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
        name: 'Blacksmith\'s outfit',
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
    ],
    requirements: [
      {name: '99 Smithing'},
      {
        name: 'Daily challenge',
        effect() {
          return {bonus: 67395 / 145500}; // ???
        },
      },
      {
        name: 'Bonus Packs',
        effect() {
          return {bonus: 0.05}; // 50k bonus per 100 respect, 10k xp per respect
        },
      },
      {
        name: 'Hammer w/ Tinker 3',
        effect() {
          return {base: 0.0375};
        },
      },
    ],
    daily: 'return 12 / this.actionsPerHour',
    desc: '<a href="https://www.youtube.com/watch?v=bpvjOI3sJ6I" target="_blank">Of course, I fear no demon</a>',
  },
  {
    name: 'Rune 2h',
    skill: 'Smithing',
    actionXP: 225,
    actionsPerHour: 1580,
    baseCost: 'return (2.6 * getPrice(2363) - getPrice(1319)) / this.actionXP',
    modifiers: [
      {
        name: 'Blacksmith\'s outfit',
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
        name: 'Portable Forge',
        effect() {
          return {base: 0.1};
        },
      },
      {name: '99 Smithing'},
      {name: 'Scroll of Proficiency'},
      {name: 'Varrock Armour 4'},
      {
        name: 'Crystal hammer w/ Tinker 3 + Rapid 3',
        effect() {
          return {base: 0.0375};
        },
      },
    ],
    desc: 'Make Rune 2h/platelegs/plateskirts with a Mammoth, can sell in bulk to alchers',
  },
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
        name: 'Cheeky Monkey', // TODO: quantify the effect of this
        effect() {
          return {base: 0};
        },
      },
      {
        name: 'Black ibis outfit',
        effect() {
          return {bonus: 0.05};
        },
      },
    ],
    requirements: [
      {name: '90 Thieving'},
      {name: 'T3+ Five Finger Discount'},
      {name: 'Crystal Mask + Light Form'},
      {name: 'Ardy Cape 4 or Thieving Cape Perk'},
      {name: 'Soul-in-a-box'},
      {name: 'Featherfingered Necklace'},
      {name: 'Trahaern Exoskeleton / Master Camouflage Outfit)'},
    ],
    desc: '<a href="https://www.youtube.com/watch?v=-05YAUMEDPs" target="_blank">Video by Spudy</a> Aura makes a big difference, cheeky monkey is best but discontinued now, hold ava with alt',
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
        name: 'Black ibis outfit',
        effect() {
          return {bonus: 0.05};
        },
      },
    ],
    requirements: [
      {name: '98 Thieving'},
      {name: 'Ardy Cape 4'},
      {name: 'Trahaern Exoskeleton / Master Camouflage Outfit)'},
    ],
    afk: true,
    alt: 1,
    desc: 'VoS not factored in. Rotate between Meilyr, Crwys, Hefin, Trahaearn, Amlodd. Aura and Light Form don\'t make a big difference',
  },
  {
    name: 'Goebiebands',
    skill: 'Woodcutting',
    actionXP: 48515,
    actionsPerHour: 60 / 2,
    baseCost: 'return 0',
    modifiers: [],
    requirements: [{name: '99 Woodcutting'}],
    daily: 'return 2 / 60',
    desc: '<a href="https://www.youtube.com/watch?v=zSozFZsEXF0" target="_blank">Video by Crusaderr</a>, Minigames FC tracks the worlds',
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
      {name: '60 Woodcutting'},
      {
        name: 'Lumberjack clothing',
        effect() {
          return {bonus: 0.05};
        },
      },
    ],
    daily: 'return 500 / this.actionsPerHour',
    desc: 'Yews are hosted on w48 at reset. <a href="https://www.youtube.com/watch?v=6XvOyUn6z_c" target="_blank">Video by Alkan</a>',
  },
  {
    name: 'Crystallize Acadia',
    skill: 'Woodcutting',
    actionXP: 92,
    actionsPerHour: 0.9 * 1500,
    baseCost: 'return (getPrice(557) + getPrice(39010)) / 9500',
    modifiers: [
      raf,
      urnEnhancer,
      ava6,
    ],
    requirements: [
      {name: '47 Woodcutting'},
      {
        name: 'Lumberjack clothing',
        effect() {
          return {bonus: 0.05};
        },
      },
      {
        name: 'Crystal Hatchet w/ Honed 5 + Furnace 2',
        effect() {
          return {base: 0.1};
        },
      },
      {
        name: 'Crystallize + Light Form',
        effect() {
          return {base: 0.875};
        },
      },
      urns,
    ],
    desc: '<a href="https://www.youtube.com/watch?v=PCf8KBDuS04">Video by Maikeru</a>',
  }, // TODO: bamboo for AFK?
].concat(prismania, smouldering, attack, strength, defMelee);

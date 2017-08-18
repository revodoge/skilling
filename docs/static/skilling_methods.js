/* eslint-disable max-len,prefer-arrow-callback */
const urns = {
  name: 'Decorated urns',
  effect() {
    return {bonus: 0.2};
  },
};
const urnEnhancer = {
  name: 'Urn enhancer',
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
  name: 'Avatar (3%)',
  effect() {
    return {bonus: 0.03};
  },
};

const ava6 = {
  name: 'Avatar (6%)',
  effect() {
    return {bonus: 0.06};
  },
};
const pulse = {
  name: 'Pulse core',
  effect() {
    return {bonus: 0.1};
  },
};

function arrowMethod(name, levelRequired, actionXP, arrowheadName, sell) {
  return {
    name,
    skill: 'Fletching',
    actionXP,
    actionsPerHour: 43000,
    baseCost() {
      return (0.9 * (getPrice(arrowheadName) + getPrice('Feather')) - sell) / this.actionXP;
    },
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
      {name: `${levelRequired} Fletching`},
      {
        name: 'Portable fletcher',
        effect() {
          return {base: 0.1};
        },
      },
    ],
    desc: `Make ${name.toLowerCase()}${sell > 0 ? ', sell to general store' : ''}`,
  };
}

function summoningMethod(name, levelRequired, actionXP, shards, storeCost, primaryIngName, scrollName) {
  return {
    name,
    skill: 'Summoning',
    actionXP,
    actionsPerHour: 16750,
    baseCost() {
      return (shards * 25 + storeCost + getPrice(primaryIngName) - 10 * getPrice(scrollName)) / this.actionXP;
    },
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
    baseCost() {
      return costPerAction() / this.actionXP;
    },
    modifiers: [
      raf,
      pulse,
      ava6,
    ],
    requirements: [
      {name: `${levelRequired} Crafting`},
      {name: 'Scroll of dexterity'},
      {
        name: 'Portable crafter',
        effect() {
          return {base: 0.1};
        },
      },
      {
        name: 'Modified artisan\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    desc: `Make ${name.toLowerCase()} with a mammoth, sell in bulk on forums`,
  };
}

function cutGemMethod(name, levelRequired, actionXP, uncutName, cutName) {
  return {
    name,
    skill: 'Crafting',
    actionXP,
    actionsPerHour: 5300,
    baseCost() {
      return (0.95 * getPrice(uncutName) - 1.02 * getPrice(cutName)) / this.actionXP;
    },
    modifiers: [
      raf,
      pulse,
      ava6,
    ],
    requirements: [
      {name: `${levelRequired} Crafting`},
      {name: 'Crystal chisel'},
      {
        name: 'Portable crafter',
        effect() {
          return {base: 0.1};
        },
      },
      {
        name: 'Artisan\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=PiwKyMAo4hA" target="_blank">Video by Persiflage</a>, prices will differ if buying/selling in bulk on forums',
  };
}

function wildyAltarMethod(name, boneXP, boneName) {
  return {
    name: `${name} in wilderness`,
    skill: 'Prayer',
    actionXP: boneXP * 3.5,
    actionsPerHour: 2000,
    baseCost() {
      return 0.98 * getPrice(boneName) / this.actionXP;
    },
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {name: 'Chaos Temple (Wilderness)'},
      {
        name: 'Modified first age outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Perfect juju prayer potion',
        effect() {
          return {base: 0.05};
        },
      },
    ],
    wildy: true,
    desc: '<a href="https://www.youtube.com/watch?v=7IO5E2Lzggo" target="_blank">Run bones with alt</a>',
  };
}

function altarMethod(name, boneXP, boneName) {
  return {
    name,
    skill: 'Prayer',
    actionXP: boneXP * 3.5,
    actionsPerHour: 1800,
    baseCost() {
      return 0.98 * getPrice(boneName) / this.actionXP;
    },
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {name: 'Gilded Altar'},
      {
        name: 'Modified first age outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Perfect juju prayer potion',
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
    baseCost() {
      return 40;
    },
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
    baseCost() {
      return 150;
    },
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
    baseCost() {
      return -6000000 / this.base;
    },
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {name: '85 Slayer'},
      {name: 'Noxious scythe'},
      {name: 'Spring cleaner'},
      {
        name: 'Demon slayer gear',
        effect() {
          return {bonus: 0.08};
        },
      },
      {
        name: 'Slayer contract',
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
    baseCost() {
      return 2500000 / this.base;
    },
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {name: 'Noxious scythe'},
      {name: 'Vamp scrim'},
      {name: 'Combat gear'},
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
    baseCost() {
      return -getPrice('Barbarian assault ticket - hard wave 10') / this.actionXP;
    },
    modifiers: [],
    requirements: [{name: 'Barbarian Assault team'}],
    desc: 'Barbarian Assault Hard Mode waves 1-9 (16 min rounds) <a href="https://www.youtube.com/watch?v=RuSfTG0yYpM" target="_blank">Video by Crusaderr</a> (cost is based on G.E. price of BA tickets, which may not reflect street price)',
    bonus: true,
  },
  {
    name: 'Barbarian Assault 7-9',
    skill: 'Agility',
    actionXP: 186688,
    actionsPerHour: 60 / 7,
    baseCost() {
      return getPrice('Barbarian assault ticket - hard wave 10') / this.actionXP;
    },
    modifiers: [],
    requirements: [{name: 'Barbarian Assault team'}],
    desc: 'Barbarian Assault Hard Mode waves 1-9 (7 min rounds) <a href="https://www.youtube.com/watch?v=RuSfTG0yYpM" target="_blank">Video by Crusaderr</a> (cost is based on G.E. price of BA tickets, which may not reflect street price)',
    bonus: true,
  },
  {
    name: 'Silverhawk Boots',
    skill: 'Agility',
    actionXP: 860,
    actionsPerHour: 80,
    baseCost() {
      return getPrice('Silverhawk feathers') / this.actionXP;
    },
    modifiers: [
      raf,
      ava3,
    ],
    requirements: [
      {name: '99 Agility'},
      {name: 'Silverhawk boots'},
      {
        name: 'Nimble boots',
        effect() {
          return {bonus: 0.01};
        },
      },
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
    baseCost() {
      return getPrice('Mahogany plank') * 7.8 / this.actionXP;
    },
    modifiers: [
      raf,
      ava3,
    ],
    requirements: [
      {name: '73 Construction'},
      {name: 'Monkey butler (or demon butler)'},
      {name: 'Scroll of proficiency'},
      {
        name: 'Constructor\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'God chisel',
        effect() {
          return {bonus: 0.01};
        },
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=h6hRV9RuViw" target="_blank">Video by NRiver</a>, don\'t use AHK or you\'ll face the same fate as Damp Cat v1',
  },
  {
    name: 'Mahogany Table Flatpack',
    skill: 'Construction',
    actionXP: 840,
    actionsPerHour: 400,
    baseCost() {
      return getPrice('Mahogany plank') * 6 / this.actionXP;
    },
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {name: '52 Construction'},
      {name: 'Monkey butler (or demon butler)'},
      {
        name: 'Constructor\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'God chisel',
        effect() {
          return {bonus: 0.01};
        },
      },
    ],
    afk: true,
    alt: 1,
    desc: 'Not recommended',
  },
  {
    name: 'Combat',
    skill: 'Constitution',
    base: 'return Infinity',
    baseCost() {
      return 0;
    },
    modifiers: [],
    requirements: [],
    desc: 'You\'d have to put in extra effort to not get this for free with 200m all combat skills',
  },
  {
    name: '3-tick rocktails',
    skill: 'Cooking',
    actionXP: 225,
    actionsPerHour: 1850,
    baseCost() {
      return (getPrice('Fire rune') + getPrice('Decorated cooking urn (nr)')) / 7737.5 + (getPrice('Raw rocktail') - 1.1 * getPrice('Rocktail')) / this.actionXP;
    },
    modifiers: [
      raf,
      pulse,
      ava6,
      urnEnhancer,
    ],
    requirements: [
      {name: '94 Cooking'},
      {name: 'Cooking gauntlets/skillcape'},
      {
        name: 'Portable range',
        effect() {
          return {base: 0.215};
        },
      },
      urns,
      {
        name: 'Modified sous chef\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Dwarven army axe',
        effect() {
          return {bonus: 3 / 225 / 1.215};
        },
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=OMlT6PzmEjE" target="_blank">Video by Efficiency Experts Youtube</a>',
  },
  {
    name: '4-tick rocktails',
    skill: 'Cooking',
    actionXP: 225,
    actionsPerHour: 1400,
    baseCost() {
      return (getPrice('Fire rune') + getPrice('Decorated cooking urn (nr)')) / 7737.5 + (getPrice('Raw rocktail') - 1.1 * getPrice('Rocktail')) / this.actionXP;
    },
    modifiers: [
      raf,
      pulse,
      ava6,
      urnEnhancer,
    ],
    requirements: [
      {name: '94 Cooking'},
      {name: 'Cooking gauntlets/skillcape'},
      {
        name: 'Portable range',
        effect() {
          return {base: 0.215};
        },
      },
      urns,
      {
        name: 'Modified sous chef\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Dwarven army axe',
        effect() {
          return {bonus: 3 / 225 / 1.215};
        },
      },
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
    baseCost() {
      return (getPrice('Jug of water') + getPrice('Grapes') - getPrice('Jug of wine')) / this.actionXP;
    },
    modifiers: [
      raf,
      pulse,
      ava6,
    ],
    requirements: [
      {name: '35 Cooking'},
      {
        name: 'Sous chef\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=9fAn3R76aUA" target="_blank">Video by Persiflage</a>, use a BoB',
  },
  dhideShieldMethod('Green d\'hide Shields', 64, 248, function () {
    return (4 - 0.4) * getPrice('Green dragon leather') - getPrice('Green dragonhide shield');
  }),
  dhideShieldMethod('Blue d\'hide Shields', 72, 280, function () {
    return (4 - 0.35) * getPrice('Blue dragon leather') - getPrice('Blue dragonhide shield');
  }),
  dhideShieldMethod('Red d\'hide Shields', 78, 312, function () {
    return (4 - 0.3) * getPrice('Red dragon leather') - getPrice('Red dragonhide shield');
  }),
  dhideShieldMethod('Black d\'hide Shields', 85, 344, function () {
    return (4 - 0.25) * getPrice('Black dragon leather') - getPrice('Black dragonhide shield');
  }),
  cutGemMethod('Diamonds', 43, 107.5, 'Uncut diamond', 'Diamond'),
  cutGemMethod('Dragonstones', 55, 137.5, 'Uncut dragonstone', 'Dragonstone'),
  {
    name: 'Shattered Worlds (ranged)',
    skill: 'Defence',
    base: 'return 1860000',
    baseCost() {
      return 2500000 / this.base;
    },
    modifiers: [
      raf,
      ava3,
    ],
    requirements: [
      {name: 'Mechanized chins'},
      {name: 'Combat gear'},
    ],
    desc: '<a href="https://www.youtube.com/watch?v=x4Yo8gN1dME&t=119" target="_blank">Video by Jona</a>',
  },
  {
    name: 'Guthixian Caches',
    skill: 'Divination',
    actionXP: 73400,
    actionsPerHour: 60 / 4,
    baseCost() {
      return 0;
    },
    modifiers: [],
    requirements: [{name: '99 Divination'}],
    daily: 'return 2 / this.actionsPerHour',
    desc: '<a href="https://www.youtube.com/watch?v=EUMy0JuW1uw" target="_blank">Video by Crusaderr</a> (cost is based on G.E. price of BA tickets, which may not reflect street price), non-solo Cres not worth after Children of Mah and Bladed Dive',
  },
  {
    name: 'Ancestral Energy w/ contract',
    skill: 'Divination',
    actionXP: 53.5,
    actionsPerHour: 2400, // 2.5 ticks per action
    baseCost() {
      return (getPrice('Mind rune') + getPrice('Decorated divination urn (nr)')) / 9500;
    },
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
      urns,
      {
        name: 'Diviner\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    daily: 'return 0.5',
    afk: true,
    alt: 1,
    // TODO: add video
    desc: 'Do a flagged ancestral energy plot with contracts, Energy-gathering scrimshaw and Elder Divination Outfit will speed this up a bit',
  },
  {
    name: 'Ancestral Energy',
    skill: 'Divination',
    actionXP: 53.5,
    actionsPerHour: 2400, // 2.5 ticks per action
    baseCost() {
      return (getPrice('Mind rune') + getPrice('Decorated divination urn (nr)')) / 9500;
    },
    modifiers: [
      raf,
      urnEnhancer,
      ava6,
    ],
    requirements: [
      {name: '95 Divination'},
      urns,
      {
        name: 'Diviner\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
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
    baseCost() {
      return (0.9275 * 400 - 1.5 * getPrice('Incandescent energy')) / this.actionXP;
    },
    modifiers: [
      raf,
      pulse,
      ava6,
    ],
    requirements: [
      {name: 'Divination skillcape'},
      {
        name: 'Modified diviner\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    desc: 'Buy from forums. Cost here is assumed at buying for 400 each <a href="https://www.youtube.com/watch?v=IPQPW8vgL4o" target="_blank">RIP 2-ticking</a>',
  },
  // TODO: real dg, challenge
  {
    name: 'Sinkholes',
    skill: 'Dungeoneering',
    actionXP: 180000,
    actionsPerHour: 12,
    baseCost() {
      return 0;
    },
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
    baseCost() {
      return 0;
    },
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
    baseCost() {
      const cost = 12 * 0.9 * getPrice('Magic seed') + 0.9 * getPrice('Calquat tree seed') + 0.9 * getPrice('Elder seed') / 3 + 7 *
        (0.9 * getPrice('Papaya tree seed') + 10 * getPrice('Pineapple') - 6 * getPrice('Papaya fruit')) + 64 / 3 * (1500 + getPrice('Supercompost'));
      return cost / this.dailyXP + (getPrice('Nature rune') + getPrice('Decorated farming urn (nr)')) / 7000;
    },
    modifiers: [
      raf,
      pulse,
      ava6,
      urnEnhancer,
    ],
    requirements: [
      {name: '94 Farming'},
      urns,
      {
        name: 'Farmer\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    daily: 'return 10 / 60',
    // TODO: add updated videos with bladed dive
    desc: '<a href="https://www.youtube.com/watch?v=wu2h39fayAE" target="_blank">Full run</a> (6 Magics, 7 Papaya, Calquat, Crystal Tree, Elder, Arc Berries) + <a href="https://www.youtube.com/watch?v=DC50RaHmZ_8" target="_blank">magic only run</a>. Do spirit trees if you have them, but they are not part of the calculation',
  },
  {
    name: 'Book of Char',
    skill: 'Firemaking',
    actionXP: 607.6,
    actionsPerHour: 384 * 60 / 4, // 4 mins including set up
    baseCost() {
      return getPrice('Magic logs') / this.actionXP;
    },
    modifiers: [],
    requirements: [{name: 'Book of char'}],
    daily: 'return 384 / this.actionsPerHour',
    desc: '<a href="https://www.reddit.com/r/NRiver/comments/3z99jl/book_of_char/" target="_blank">Guide by NRiver</a>, use Elder logs if limiting factor',
  },
  {
    name: 'Barbarian Assault',
    skill: 'Firemaking',
    actionXP: 812921,
    actionsPerHour: 60 / 16,
    baseCost() {
      return -getPrice('Barbarian assault ticket - hard wave 10') / this.actionXP;
    },
    modifiers: [],
    requirements: [{name: 'Barbarian Assault team'}],
    desc: 'Barbarian Assault Hard Mode waves 1-9 (16 min rounds) <a href="https://www.youtube.com/watch?v=RuSfTG0yYpM" target="_blank">Video by Crusaderr</a> (cost is based on G.E. price of BA tickets, which may not reflect street price)',
    bonus: true,
  },
  {
    name: 'Barbarian Assault 7-9',
    skill: 'Firemaking',
    actionXP: 492035.5,
    actionsPerHour: 60 / 7,
    baseCost() {
      return getPrice('Barbarian assault ticket - hard wave 10') / this.actionXP;
    },
    modifiers: [],
    requirements: [{name: 'Barbarian Assault team'}],
    desc: 'Barbarian Assault Hard Mode waves 1-9 (7 min rounds) <a href="https://www.youtube.com/watch?v=RuSfTG0yYpM" target="_blank">Video by Crusaderr</a> (cost is based on G.E. price of BA tickets, which may not reflect street price)',
    bonus: true,
  },
  {
    name: 'Jadinko Lair',
    skill: 'Firemaking',
    actionXP: 1514.8,
    actionsPerHour: 515,
    baseCost() {
      return 0;
    },
    modifiers: [
      ava6,
      raf,
    ],
    requirements: [
      {name: '83 Woodcutting'},
      {name: 'Superheat form'},
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
    actionXP: (0.205 * (0.85 * 1.1 + 0.15 * (922.5 / 682.5)) + 0.795 * 0.05) * 682.5, // 20.5% success, 15% scrimshaw, 10% furnace proc on remaining
    actionsPerHour: 1500,
    baseCost() {
      return getPrice('Azure skillchompa') / this.actionXP + (getPrice('Water rune') + getPrice('Decorated fishing urn (nr)')) / 9500 + getPrice('Whopper-baiting scrimshaw') / 3 / this.base;
    },
    modifiers: [
      raf,
      urnEnhancer,
      ava6,
    ],
    requirements: [
      {name: '96 Fishing'},
      {name: 'T5 Call of the seas aura'},
      {name: 'Perfect juju fishing potion'},
      {name: 'Crystal rod w/ Honed 5 + Furnace 2'},
      urns,
      {name: 'Fury shark outfit'},
      {name: 'Skillchompas'},
      {
        name: 'Fishing outfit',
        effect() {
          return {bonus: 0.05};
        },
      },
    ],
    afk: true,
    alt: 1,
    desc: `<a href="https://www.youtube.com/watch?v=9ixyY9Wfzns" target="_blank">Video by Revodoge</a>, Whopper-baiting scrimshaw also makes spots last longer<br>
 Scrim makes xp/hr worse for doing contracts (Price is based on azure skillchompa but any type works fine)`,
  },
  {
    name: 'Wobbegongs with Skillchompas',
    skill: 'Fishing',
    actionXP: (0.205 * 1.1 + 0.795 * 0.05) * 682.5, // 20.5% success, 10% furnace proc on success
    actionsPerHour: 1500,
    baseCost() {
      return getPrice('Azure skillchompa') / this.actionXP + (getPrice('Water rune') + getPrice('Decorated fishing urn (nr)')) / 9500;
    },
    modifiers: [
      raf,
      urnEnhancer,
      ava6,
    ],
    requirements: [
      {name: '96 Fishing'},
      {name: 'T5 Call of the seas aura'},
      {name: 'Perfect juju fishing potion'},
      {name: 'Crystal rod w/ Honed 5 + Furnace 2'},
      urns,
      {name: 'Fury shark outfit'},
      {name: 'Skillchompas'},
      {
        name: 'Fishing outfit',
        effect() {
          return {bonus: 0.05};
        },
      },
    ],
    afk: true,
    alt: 1,
    desc: '<a href="https://www.youtube.com/watch?v=Ot5nrMIYKfw" target="_blank">Video by Marina</a> (Price is based on azure skillchompa but any type works fine)',
  },
  {
    name: 'Wobbegongs',
    skill: 'Fishing',
    actionXP: 1.1 * 682.5,
    actionsPerHour: 0.205 * 1500, // 20.5% success, 4 ticks per attempt
    baseCost() {
      return (getPrice('Water rune') + getPrice('Decorated fishing urn (nr)')) / 9500;
    },
    modifiers: [
      raf,
      urnEnhancer,
      ava6,
    ],
    requirements: [
      {name: '96 Fishing'},
      {name: 'T5 Call of the seas aura'},
      {name: 'Perfect juju fishing potion'},
      {name: 'Crystal rod w/ Honed 5 + Furnace 2'},
      urns,
      {name: 'Fury shark outfit'},
      {
        name: 'Fishing outfit',
        effect() {
          return {bonus: 0.05};
        },
      },
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
    baseCost() {
      return (0.9 * (getPrice('Feather') + getPrice('Dragon dart tip')) - 150) / this.actionXP;
    },
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
      {name: '95 Fletching'},
      {
        name: 'Portable fletcher',
        effect() {
          return {base: 0.1};
        },
      },
    ],
    desc: 'Make dragon darts, sell to general store',
  },
  arrowMethod('Dragon arrows', 90, 15, 'Dragon arrowheads', 240),
  arrowMethod('Dark arrows', 95, 17.5, 'Dark arrowheads', 30),
  arrowMethod('Rune arrows', 75, 12.5, 'Rune arrowheads', 153),
  arrowMethod('Broad arrows', 52, 15, 'Broad arrowheads', 0),
  {
    name: 'Overloads from supers',
    skill: 'Herblore',
    actionXP: 2201,
    actionsPerHour: 460,
    baseCost() {
      const extremes = (0.9 * (getPrice('Clean avantoe') + getPrice('Clean dwarf weed') + getPrice('Clean lantadyme') + getPrice('Mud rune') + 5 * getPrice('Grenwall spikes'))
        + (getPrice('Super attack (3)') + getPrice('Super strength (3)') + getPrice('Super defence (3)') + getPrice('Super magic potion (3)') + getPrice('Super ranging potion (3)'))) / 1.1;
      const totalCost = 0.983 * (extremes + getPrice('Clean torstol'));
      return totalCost / this.actionXP;
    },
    modifiers: [
      raf,
      pulse,
      ava6,
    ],
    requirements: [
      {name: '96 Herblore'},
      {
        name: 'Portable well',
        effect() {
          return {base: 0.1};
        },
      },
      {
        name: 'Modified botanist\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    desc: 'Use a mammoth for the overloads',
  },
  {
    name: '1-tick Overloads',
    skill: 'Herblore',
    actionXP: 2201,
    actionsPerHour: 575,
    baseCost() {
      const extremes = (0.9 * (getPrice('Clean avantoe') + getPrice('Clean dwarf weed') + getPrice('Clean lantadyme') + getPrice('Mud rune') + 5 * getPrice('Grenwall spikes'))
        + (getPrice('Super attack (3)') + getPrice('Super strength (3)') + getPrice('Super defence (3)') + getPrice('Super magic potion (3)') + getPrice('Super ranging potion (3)'))) / 1.1;
      const totalCost = 0.983 * (extremes + getPrice('Clean torstol'));
      return totalCost / this.actionXP;
    },
    modifiers: [
      raf,
      pulse,
      ava6,
    ],
    requirements: [
      {name: '96 Herblore'},
      {
        name: 'Portable well',
        effect() {
          return {base: 0.1};
        },
      },
      {
        name: 'Modified botanist\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    triHard: true,
    desc: '<a href="https://www.youtube.com/watch?v=Ixf14YZlsWc" target="_blank">Video by Marina</a>',
  },
  {
    name: 'Ornate Tortles',
    skill: 'Hunter',
    actionXP: 204 * 1585,
    actionsPerHour: 60 / 15,
    baseCost() {
      return (getPrice('Mud rune') + getPrice('Decorated hunter urn (nr)')) / 8000;
    },
    modifiers: [
      raf,
      ava3,
      urnEnhancer,
    ],
    requirements: [
      {name: '96 Hunter'},
      {name: 'Sliske\'s Endgame'},
      urns,
      {
        name: "Hunter's outfit",
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Enhanced yaktwee stick',
        effect() {
          return {bonus: 0.05};
        },
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=ocDtzwSV1jM" target="_blank">Video by Revodoge</a>',
  },
  {
    name: 'Crystal Skillchompas',
    skill: 'Hunter',
    actionXP: 476,
    actionsPerHour: 2400,
    baseCost() {
      return (getPrice('Mud rune') + getPrice('Decorated hunter urn (nr)')) / 8000 - getPrice('Crystal skillchompa') / this.actionXP;
    },
    modifiers: [
      raf,
      ava3,
      urnEnhancer,
    ],
    requirements: [
      {name: '97 Hunter'},
      {name: '99 Agility'},
      {name: 'Sliske\'s Endgame'},
      urns,
      {
        name: "Hunter's outfit",
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Enhanced yaktwee stick',
        effect() {
          return {bonus: 0.05};
        },
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=6ETexKA64ok" target="_blank">Video by Jona</a>',
  },
  {
    name: 'Siphoning Gear',
    skill: 'Invention',
    base: 'return 622566',
    baseCost() {
      return getPrice('Equipment siphon') / 621000;
    },
    modifiers: [],
    requirements: [
      {name: '60 Invention (for lv 12 items)'},
      {name: 'T90 gear'},
    ],
    lossless: true,
    desc: 'Siphon T90 weapons/armour (and crystal tools).',
  },
  // TODO: wildy aby demons, aby demons
  {
    name: 'Shattered Worlds (magic)',
    skill: 'Magic',
    base: 'return 1600000',
    baseCost() {
      return 2500000 / this.base;
    },
    modifiers: [
      raf,
      ava3,
    ],
    requirements: [
      {name: 'Noxious staff'},
      {name: 'Combat gear'},
    ],
    desc: '<a href="https://www.youtube.com/watch?v=x4Yo8gN1dME&t=119" target="_blank">Video by Jona</a>',
  },
  {
    name: 'Warbands',
    skill: 'Mining',
    actionXP: 363862.5,
    actionsPerHour: 60 / 10,
    baseCost() {
      return 0;
    },
    modifiers: [],
    requirements: [{name: 'Warbanding FC or yolo'}],
    daily: 'return 1 / this.actionsPerHour',
    wildy: true,
    desc: '<a href="https://www.youtube.com/watch?v=Q8cIBTd3hCY" target="_blank">Sexy Mining Exp! Warbands OP As Balls Gf Spins</a>',
  },
  {
    name: 'Barbarian Assault',
    skill: 'Mining',
    actionXP: 444763,
    actionsPerHour: 60 / 16,
    baseCost() {
      return -getPrice('Barbarian assault ticket - hard wave 10') / this.actionXP;
    },
    modifiers: [],
    requirements: [{name: 'Barbarian Assault team'}],
    desc: 'Barbarian Assault Hard Mode waves 1-9 (16 min rounds) <a href="https://www.youtube.com/watch?v=RuSfTG0yYpM" target="_blank">Video by Crusaderr</a> (cost is based on G.E. price of BA tickets, which may not reflect street price)',
    bonus: true,
  },
  {
    name: 'Barbarian Assault 7-9',
    skill: 'Mining',
    actionXP: 269200,
    actionsPerHour: 60 / 7,
    baseCost() {
      return getPrice('Barbarian assault ticket - hard wave 10') / this.actionXP;
    },
    modifiers: [],
    requirements: [{name: 'Barbarian Assault team'}],
    desc: 'Barbarian Assault Hard Mode waves 1-9 (7 min rounds) <a href="https://www.youtube.com/watch?v=RuSfTG0yYpM" target="_blank">Video by Crusaderr</a> (cost is based on G.E. price of BA tickets, which may not reflect street price)',
    bonus: true,
  },
  {
    name: 'Lava Geyser with alt',
    skill: 'Mining',
    actionXP: 500,
    actionsPerHour: 860,
    baseCost() {
      return getPrice('Azure skillchompa') / this.actionXP;
    },
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {name: 'Birthright of the Dwarves'},
      {
        name: 'Skillchompas',
        effect() {
          return {base: 0.1};
        },
      },
      {
        name: 'Golden mining suit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    triHard: true,
    desc: '<a href="https://www.youtube.com/watch?v=vvaFDMd_Wo4" target="_blank">Video by Marina</a>, XP drops without alt due to hopping limit. Skillchompa bonus XP works here',
  },
  {
    name: 'Alaea Crabs with Skillchompas',
    skill: 'Mining',
    actionXP: (0.158 * 1.1 + 0.842 * 0.05) * 692.5, // 15.8% success, 10% furnace proc on success
    actionsPerHour: 2000,
    baseCost() {
      return getPrice('Azure skillchompa') / this.actionXP + (getPrice('Earth rune') + getPrice('Decorated mining urn (nr)')) / 3125;
    },
    modifiers: [
      raf,
      urnEnhancer,
      ava6,
    ],
    requirements: [
      {name: '97 Mining'},
      {name: 'T4 Quarrymaster aura'}, // TODO: perfect juju??
      {name: 'Skillchompas'},
      {name: 'Crystal pickaxe w/ Honed 5 + Furnace 2'},
      urns,
      {name: 'Magic golem outfit'},
      {
        name: 'Golden mining suit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    afk: true,
    alt: 1,
    desc: '(Price is based on azure skillchompa but any type works fine)',
  },
  {
    name: 'Alaea Crabs',
    skill: 'Mining',
    actionXP: 0.158 * 1.1 * 692.5, // 15.8% success, 3 ticks per attempt
    actionsPerHour: 2000,
    baseCost() {
      return (getPrice('Earth rune') + getPrice('Decorated mining urn (nr)')) / 3125;
    },
    modifiers: [
      raf,
      urnEnhancer,
      ava6,
    ],
    requirements: [
      {name: '97 Mining'},
      {name: 'T4 Quarrymaster aura'},
      {name: 'Crystal pickaxe w/ Honed 5 + Furnace 2'},
      urns,
      {name: 'Magic golem outfit'},
      {
        name: 'Golden mining suit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    afk: true,
    alt: 1,
    desc: 'TFW can\'t afford skillchompas after update :(',
  },
  wildyAltarMethod('Dragon Bones', 72, 'Dragon bones'),
  wildyAltarMethod('Hardened Dragon Bones', 144, 'Hardened dragon bones'),
  wildyAltarMethod('Airut Bones', 132.5, 'Airut bones'),
  wildyAltarMethod('Frost Dragon Bones', 180, 'Frost dragon bones'),
  wildyAltarMethod('Reinforced Dragon Bones', 190, 'Reinforced dragon bones'),
  altarMethod('Dragon Bones', 72, 'Dragon bones'),
  altarMethod('Hardened Dragon Bones', 144, 'Hardened dragon bones'),
  altarMethod('Airut Bones', 132.5, 'Airut bones'),
  altarMethod('Frost Dragon Bones', 180, 'Frost dragon bones'),
  altarMethod('Reinforced Dragon Bones', 190, 'Reinforced dragon bones'),
  {
    name: 'Scatter/Bury: Dragon Bones + Infernal Ashes',
    skill: 'Prayer',
    actionXP: 2 * 72 + 62.5,
    actionsPerHour: 5750,
    baseCost() {
      return (0.98 * getPrice('Dragon bones') + getPrice('Infernal ashes')) / this.actionXP;
    },
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {
        name: 'Modified first age outfit',
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
    baseCost() {
      return 110000 / this.actionXP;
    },
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
        name: 'First age outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Perfect juju prayer potion',
        effect() {
          return {base: 0.05};
        },
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=tjN34chGyR4" target="_blank">Video by Crusaderr</a> (cost is based on G.E. price of BA tickets, which may not reflect street price)',
  },
  {
    name: 'Cleansing crystals',
    skill: 'Prayer',
    actionXP: 9800,
    actionsPerHour: 29,
    baseCost() {
      return 110000 / this.actionXP;
    },
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
        name: 'First age outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
      {
        name: 'Perfect juju prayer potion',
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
    baseCost() {
      return 2500000 / this.base;
    },
    modifiers: [
      raf,
      ava3,
    ],
    requirements: [
      {name: 'Mechanized chinchompas'},
      {name: 'Combat gear'},
    ],
    desc: '<a href="https://www.youtube.com/watch?v=x4Yo8gN1dME&t=119" target="_blank">Video by Jona</a>',
  },
  {
    name: 'Soul Runes',
    skill: 'Runecrafting',
    actionXP: 220,
    actionsPerHour: 440,
    baseCost() {
      return (getPrice('Pure essence') - 1.05 * 0.8 * getPrice('Soul rune')) / this.actionXP + (getPrice('Pure essence') + getPrice('Decorated runecrafting urn (nr)')) / 7000;
    },
    modifiers: [
      raf,
      {
        name: 'Urn enhancer',
        effect() {
          return {bonus: 0.05 * 3.5};
        },
      },
      ava3,
    ],
    requirements: [
      {name: '90 Runecrafting'},
      {name: '\'Phite Club'},
      {name: 'Massive pouches'},
      {name: 'Infinity ethereal outfit'},
      {name: 'Tokkul-zo or Max Cape'},
      {
        name: 'Abyss w/ Demonic skull',
        effect() {
          return {bonus: 2.5};
        },
      },
      {
        name: 'Urns',
        effect() {
          return {bonus: 0.2 * 3.5};
        },
      },
      {
        name: 'Master runecrafter robes',
        effect() {
          return {bonus: 0.05};
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
    baseCost() {
      return -4;
    },
    modifiers: [
      raf,
      ava3,
    ],
    requirements: [
      {name: '117 Slayer'},
      {name: 'Combat gear'},
    ],
    desc: '<a href="https://docs.google.com/spreadsheets/d/1hYNMQ_2QjhebZJsMCXEGDarEekOT1uZiPGx0i26ILps/edit#gid=0" target="_blank">Jona\'s spreadsheet</a>, tweak to match your needs',
  },
  {
    name: 'Rune Ceremonial Sword',
    skill: 'Smithing',
    actionXP: 10487.5 * 1.1, // you can get perfect sword about half the time
    actionsPerHour: 60,
    baseCost() {
      return 50 * getPrice('Vis wax') / this.dailyXP;
    },
    modifiers: [
      raf,
      ava6,
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
        name: 'Falador shield 4',
        effect() {
          return {base: 0.05};
        },
      },
      {
        name: 'Bonus packs',
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
    baseCost() {
      return (2.6 * getPrice('Rune bar') - getPrice('Rune 2h sword')) / this.actionXP;
    },
    modifiers: [
      raf,
      pulse,
      ava6,
    ],
    requirements: [
      {name: '99 Smithing'},
      {name: 'Scroll of efficiency'},
      {name: 'Varrock armour 4'},
      {
        name: 'Crystal hammer w/ Tinker 3 + Rapid 3',
        effect() {
          return {base: 0.0375};
        },
      },
      {
        name: 'Portable Forge',
        effect() {
          return {base: 0.1};
        },
      },
      {
        name: 'Blacksmith\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    desc: 'Make Rune 2h/platelegs/plateskirts with a mammoth, sell in bulk on forums',
  },
  summoningMethod('Pack Yak', 96, 422.4 + 4.8, 211, 50 - 15, 'Yak-hide', 'Winter storage scroll'),
  summoningMethod('Steel titan', 99, 435.2 + 4.9, 178, 2000 - 600, 'Steel platebody', 'Steel of legends scroll'),
  summoningMethod('Fire titan', 79, 695.2 + 7.9, 198, 4 - 1, 'Fire talisman', 'Titan\'s constitution scroll'),
  summoningMethod('Moss titan', 79, 695.2 + 7.9, 202, 4 - 1, 'Earth talisman', 'Titan\'s constitution scroll'),
  summoningMethod('Geyser titan', 89, 783.2 + 8.9, 222, 4 - 1, 'Water talisman', 'Boil scroll'),
  {
    name: 'Dwarf Traders',
    skill: 'Thieving',
    actionXP: 556.5,
    actionsPerHour: 1670,
    baseCost() {
      return -1;
    },
    modifiers: [
      raf,
      ava6,
      {
        name: 'Cheeky monkey', // TODO: quantify the effect of this
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
      {name: 'T3+ Five finger discount aura'},
      {name: 'Trahaern exoskeleton / Master camouflage outfit)'},
      {name: 'Crystal mask + Light form'},
      {name: 'Ardy cape 4 and/or Thieving skillcape'},
      {name: 'Featherfingered necklace'},
      {name: 'Soul-in-a-box'},
    ],
    desc: '<a href="https://www.youtube.com/watch?v=-05YAUMEDPs" target="_blank">Video by Spudy</a> Aura makes a big difference, cheeky monkey is best but discontinued now, hold ava with alt',
  },
  {
    name: 'Priffdinas Elves',
    skill: 'Thieving',
    base: 'return 420000',
    baseCost() {
      return -3;
    },
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
      {name: 'Trahaern exoskeleton / Master camouflage outfit)'},
      {name: 'Ardy cape 4'},
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
    baseCost() {
      return 0;
    },
    modifiers: [],
    requirements: [{name: '99 Woodcutting'}],
    daily: 'return 2 / 60',
    desc: '<a href="https://www.youtube.com/watch?v=zSozFZsEXF0" target="_blank">Video by Crusaderr</a> (cost is based on G.E. price of BA tickets, which may not reflect street price), Minigames FC tracks the worlds',
  },
  {
    name: 'Divine Yews',
    skill: 'Woodcutting',
    actionXP: 175,
    actionsPerHour: 2800,
    baseCost() {
      return 40 * getPrice('Vis wax') / this.dailyXP;
    },
    modifiers: [
      raf,
      pulse,
      ava6,
      {
        name: 'Shared knowledge buff (Memorial to Guthix)',
        effect() {
          return {base: 0.25};
        },
      },
      {
        name: 'Cache boost',
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
  { // TODO: better testing on success rate, add cost of runes
    name: 'Crystallize Acadia with Skillchompas',
    skill: 'Woodcutting',
    actionXP: 92,
    actionsPerHour: 1450, // 1500 max, give some wiggle room
    baseCost() {
      return 120 * 6 * (getPrice('Soul rune') + getPrice('Chaos rune') + getPrice('Fire rune') + getPrice('Water rune')) / this.base + getPrice('Azure skillchompa') / this.actionXP + (getPrice('Earth rune') + getPrice('Decorated woodcutting urn (nr)')) / 9500;
    },
    modifiers: [
      raf,
      urnEnhancer,
      {
        name: 'Urn enhancer',
        effect() {
          return {bonus: 0.05 / 1.875};
        },
      },
      ava6,
    ],
    requirements: [
      {name: '47 Woodcutting'},
      {name: 'Crystal hatchet w/ Honed 5'},
      {
        name: 'Urns',
        effect() {
          return {bonus: 0.2 / 1.875};
        },
      },
      {
        name: 'Crystallize + Light form',
        effect() {
          return {base: 0.875};
        },
      },
      {
        name: 'Skillchompa',
        effect() {
          return {base: 0.05};
        },
      },
      {
        name: 'Perfect juju woodcutting potion',
        effect() {
          return {base: 0.05};
        },
      },
      {name: 'T2+ Lumberjack aura'},
      {
        name: 'Lumberjack clothing',
        effect() {
          return {bonus: 0.05};
        },
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=PCf8KBDuS04">Video by Maikeru</a> (Price is based on azure skillchompa but any type works fine)',
  },
  {
    name: 'Crystallize Acadia',
    skill: 'Woodcutting',
    actionXP: 92,
    actionsPerHour: 1450, // 1500 max, give some wiggle room
    baseCost() {
      return 120 * 6 * (getPrice('Soul rune') + getPrice('Chaos rune') + getPrice('Fire rune') + getPrice('Water rune')) / this.base + (getPrice('Earth rune') + getPrice('Decorated woodcutting urn (nr)')) / 9500;
    },
    modifiers: [
      raf,
      urnEnhancer,
      {
        name: 'Urn enhancer',
        effect() {
          return {bonus: 0.05 / 1.875};
        },
      },
      ava6,
    ],
    requirements: [
      {name: '47 Woodcutting'},
      {name: 'Crystal hatchet w/ Honed 5'},
      {
        name: 'Urns',
        effect() {
          return {bonus: 0.2 / 1.875};
        },
      },
      {
        name: 'Crystallize + Light form',
        effect() {
          return {base: 0.875};
        },
      },
      {
        name: 'Perfect juju woodcutting potion',
        effect() {
          return {base: 0.05};
        },
      },
      {name: 'T2+ Lumberjack aura'},
      {
        name: 'Lumberjack clothing',
        effect() {
          return {bonus: 0.05};
        },
      },
    ],
    desc: '<a href="https://www.youtube.com/watch?v=PCf8KBDuS04">Video by Maikeru</a>',
  },
].concat(prismania, smouldering, attack, strength, defMelee);

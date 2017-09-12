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
    return {bonus: this.bonusActive ? 0.2 : 0.1};
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

function youtubeEmbed(videoId, startTime) {
  const timeArg = startTime ? `&amp;start=${startTime}` : '';
  return `<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0&amp;showinfo=0${timeArg}" frameborder="0" allowfullscreen></iframe>`;
}

function arrowMethod(name, levelRequired, actionXP, arrowheadName, sell) {
  return {
    name,
    skill: 'Fletching',
    actionXP,
    actionsPerHour: 43000,
    baseCostPerXp() {
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
    baseCostPerXp() {
      return (1 + shards * 25 + storeCost + getPrice(primaryIngName) - 10 * getPrice(scrollName)) / this.actionXP;
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
    desc: `Taverley Shop method<br>${youtubeEmbed('1rS81xB9iwQ')}`,
  };
}

function dhideMethod(name, levelRequired, actionXP, costPerAction) {
  return {
    name,
    skill: 'Crafting',
    actionXP,
    actionsPerHour: 1820,
    baseCostPerXp() {
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
    baseCostPerXp() {
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
    desc: `${youtubeEmbed('PiwKyMAo4hA')}<br>Prices will differ if buying/selling in bulk on forums`,
  };
}

function wildyAltarMethod(name, boneXP) {
  return {
    name: `${name} in wilderness`,
    skill: 'Prayer',
    actionXP: boneXP * 3.5,
    actionsPerHour: 2000,
    baseCostPerXp() {
      return 0.98 * getPrice(name) / this.actionXP;
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
    illuminationOnly: true,
    wildy: true,
    desc: `${youtubeEmbed('7IO5E2Lzggo')}<br>
           Unnote bones with Harrison if not using an alt, or else it is not really worth being in wildy`,
  };
}

function altarMethod(name, boneXP) {
  return {
    name,
    skill: 'Prayer',
    actionXP: boneXP * 3.5,
    actionsPerHour: 1800,
    baseCostPerXp() {
      return 0.98 * getPrice(name) / this.actionXP;
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
    illuminationOnly: true,
    desc: 'Run bones with alt for best XP rates',
  };
}

function scatterBuryMethod(boneName, boneXP, ashName, ashXP) {
  return {
    name: `Scatter/Bury: ${boneName} + ${ashName}`,
    skill: 'Prayer',
    actionXP: boneXP + ashXP,
    actionsPerHour: 5750,
    baseCostPerXp() {
      return (0.98 * getPrice(boneName) + getPrice(ashName)) / this.actionXP;
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
      {
        name: 'Dragon Rider amulet',
        effect() {
          return {base: this.dxpActive ? 0 : boneXP / (boneXP + ashXP)};
        },
      },
    ],
    desc: `Demonstration by Persiflage is F2P, use a BoB to further increase actions per hour<br>
           ${youtubeEmbed('wq4FA8qxAZ4')}<br>
           Can also be done losslessly with other skills such as Herblore, Cooking. Dragon Rider amulet does not stack with DXPW, but stacks with Illumination`,
  };
}

function baMethod(skill, roundXP) {
  return {
    name: 'Barbarian Assault',
    skill,
    actionXP: roundXP,
    actionsPerHour: 60 / 16,
    baseCostPerXp() {
      return -getPrice('Barbarian assault ticket - hard wave 10') / this.actionXP;
    },
    modifiers: [],
    requirements: [{name: 'Barbarian Assault team'}],
    bonusEarning: true,
    desc: `Rates based on 16 min rounds, and cost is based on GE price of BA tickets, which may not reflect street price<br>
           ${youtubeEmbed('RuSfTG0yYpM')}`,
  };
}

function ba79Method(skill, roundXP) {
  return {
    name: 'Barbarian Assault 7-9',
    skill,
    actionXP: roundXP,
    actionsPerHour: 60 / 7,
    baseCostPerXp() {
      return getPrice('Barbarian assault ticket - hard wave 10') / this.actionXP;
    },
    modifiers: [],
    requirements: [{name: 'Barbarian Assault team'}],
    bonusEarning: true,
    desc: `Rates based on 7 min rounds, and cost is based on GE price of BA tickets, which may not reflect street price<br>
           ${youtubeEmbed('RuSfTG0yYpM')}`,
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
    baseXpRate: 15000000,
    baseCostPerXp() {
      return 40;
    },
    modifiers: [],
    requirements: [],
    bonusEarning: true,
    spinner: true,
    desc: '<a href="http://www.runescape.com/a=12/bonds" target="_blank">Get Bond</a>',
  };
});
const smouldering = window.skillList.map(function (skill) {
  return {
    name: 'Smouldering Lamps',
    skill,
    baseXpRate: 10000000,
    baseCostPerXp() {
      return 150;
    },
    modifiers: [],
    requirements: [],
    spinner: true,
    noDxp: true,
    desc: '<a href="http://www.runescape.com/a=12/bonds" target="_blank">Get Bond</a>',
  };
});

const meleeMethods = [
  // TODO: PSD shapeshifters, aby demon, airut
  {
    name: 'Abyssal Demons (wildy) (melee)',
    actionXP: 661,
    actionsPerHour: 1800,
    baseCostPerXp() {
      return -6000000 / this.baseXpRate;
    },
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {name: '85 Slayer'},
      {name: 'Noxious scythe'},
      {name: 'Upgraded cannon'},
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
    desc: `${youtubeEmbed('RrIF_K9obQw', 360)}<br>
           Looting with alt highly recommended. + 130k ranged/def xp/hr from cannon and 145k prayer xp/hr from attuned ectoplasmator/urns`,
  },
  {
    name: 'Shattered Worlds (melee)',
    baseXpRate: 1610000,
    baseCostPerXp() {
      return 2500000 / this.baseXpRate;
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
    desc: `${youtubeEmbed('GWAetPN8dZ0')}<br>Actual rates will vary depending on your skill with combat<br>`,
  },
];

const magicMethods = [
  // TODO: wildy aby demons, aby demons
  {
    name: 'Shattered Worlds (magic)',
    baseXpRate: 1600000,
    baseCostPerXp() {
      return 2500000 / this.baseXpRate;
    },
    modifiers: [
      raf,
      ava3,
    ],
    requirements: [
      {name: 'Noxious staff'},
      {name: 'Combat gear'},
    ],
    desc: youtubeEmbed('x4Yo8gN1dME'),
  },
];

const rangedMethods = [
  // TODO: PSD shapeshifters, aby demon, airut
  {
    name: 'Abyssal Demons (wildy) (ranged)',
    actionXP: 661,
    actionsPerHour: 2100,
    baseCostPerXp() {
      return -6000000 / this.baseXpRate;
    },
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {name: '85 Slayer'},
      {name: 'Mechanized chinchompas'},
      {name: 'Upgraded cannon'},
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
    desc: `${youtubeEmbed('RrIF_K9obQw', 360)}<br>
           Looting with alt highly recommended. + 145k prayer xp/hr from attuned ectoplasmator/urns`,
  },
  {
    name: 'Shattered Worlds (ranged)',
    baseXpRate: 1860000,
    baseCostPerXp() {
      return 2500000 / this.baseXpRate;
    },
    modifiers: [
      raf,
      ava3,
    ],
    requirements: [
      {name: 'Mechanized chins'},
      {name: 'Combat gear'},
    ],
    desc: `${youtubeEmbed('x4Yo8gN1dME', 119)}<br>Actual rates will vary depending on your skill with combat<br>`,
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

const magic = magicMethods.map(function (m) {
  return Object.assign({skill: 'Magic'}, m);
});

const defMagic = magicMethods.map(function (m) {
  return Object.assign({skill: 'Defence'}, m);
});

const ranged = rangedMethods.map(function (m) {
  return Object.assign({skill: 'Ranged'}, m);
});

const defRanged = rangedMethods.map(function (m) {
  return Object.assign({skill: 'Defence'}, m);
});

window.methods = [
  baMethod('Agility', 308439),
  ba79Method('Agility', 186688),
  {
    name: 'Silverhawk Boots',
    skill: 'Agility',
    actionXP: 860,
    actionsPerHour: 80,
    baseCostPerXp() {
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
    name: 'Boutique Pawnbrokers',
    skill: 'Construction',
    actionXP: 1130,
    actionsPerHour: 1000,
    baseCostPerXp() {
      return (getPrice('Mahogany plank') * 7.8 + getPrice('Porthole')) / this.actionXP;
    },
    modifiers: [
      raf,
      ava3,
    ],
    requirements: [
      {name: '81 Construction'},
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
    desc: `${youtubeEmbed('h6hRV9RuViw')}<br>Don't use AHK or you'll face the same fate as Damp Cat v1`,
  },
  {
    name: 'Flotsam Pawnbrokers',
    skill: 'Construction',
    actionXP: 1120,
    actionsPerHour: 1000,
    baseCostPerXp() {
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
    desc: `${youtubeEmbed('h6hRV9RuViw')}<br>Don't use AHK or you'll face the same fate as Damp Cat v1`,
  },
  {
    name: 'Mahogany Table Flatpack',
    skill: 'Construction',
    actionXP: 840,
    actionsPerHour: 400,
    baseCostPerXp() {
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
    baseXpRate: Infinity,
    baseCostPerXp() {
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
    baseCostPerXp() {
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
    desc: youtubeEmbed('OMlT6PzmEjE'),
  },
  {
    name: '4-tick rocktails',
    skill: 'Cooking',
    actionXP: 225,
    actionsPerHour: 1400,
    baseCostPerXp() {
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
    desc: '<iframe src="https://clips.twitch.tv/embed?clip=FlirtyZealousNoodleGivePLZ&autoplay=false&tt_medium=clips_embed" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen="true"></iframe>',
  },
  {
    name: 'Wines',
    skill: 'Cooking',
    actionXP: 201,
    actionsPerHour: 5100,
    baseCostPerXp() {
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
    desc: `Demonstration is in F2P, use a BoB to increase actions per hour
           ${youtubeEmbed('9fAn3R76aUA')}`,
  },
  dhideMethod('Green d\'hide Shields', 64, 248, function () {
    return (4 - 0.4) * getPrice('Green dragon leather') - getPrice('Green dragonhide shield');
  }),
  dhideMethod('Blue d\'hide Shields', 72, 280, function () {
    return (4 - 0.35) * getPrice('Blue dragon leather') - getPrice('Blue dragonhide shield');
  }),
  dhideMethod('Red d\'hide Shields', 78, 312, function () {
    return (4 - 0.3) * getPrice('Red dragon leather') - getPrice('Red dragonhide shield');
  }),
  dhideMethod('Black d\'hide Shields', 85, 344, function () {
    return (4 - 0.25) * getPrice('Black dragon leather') - getPrice('Black dragonhide shield');
  }),
  cutGemMethod('Diamonds', 43, 107.5, 'Uncut diamond', 'Diamond'),
  cutGemMethod('Dragonstones', 55, 137.5, 'Uncut dragonstone', 'Dragonstone'),
  {
    name: 'Guthixian Caches',
    skill: 'Divination',
    actionXP: 73400,
    actionsPerHour: 60 / 4,
    baseCostPerXp() {
      return 0;
    },
    modifiers: [],
    requirements: [{name: '99 Divination'}],
    daily: 'return 2 / this.actionsPerHour',
    noBxp: true,
    noDxp: true,
    desc: `${youtubeEmbed('dD5OWa5mwnE')}<br>Solo/proper duo Cres is still worth, but good luck with that`,
  },
  {
    name: 'Ancestral Energy w/ contract',
    skill: 'Divination',
    actionXP: 53.5,
    actionsPerHour: 2400, // 2.5 ticks per action
    baseCostPerXp() {
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
    baseCostPerXp() {
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
    baseCostPerXp() {
      return (0.9275 * 350 - 1.5 * getPrice('Incandescent energy')) / this.actionXP;
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
    desc: 'Buy from forums. Cost here is assumed at buying for 350 each <a href="https://www.youtube.com/watch?v=IPQPW8vgL4o" target="_blank">RIP 2-ticking</a>',
  },
  // TODO: real dg, challenge
  {
    name: 'Sinkholes',
    skill: 'Dungeoneering',
    actionXP: 180000,
    actionsPerHour: 12,
    baseCostPerXp() {
      return 0;
    },
    modifiers: [],
    requirements: [{name: '120 Dungeoneering'}],
    daily: 'return 2 / this.actionsPerHour',
    noBxp: true,
    noDxp: true,
    desc: '<a href="https://www.youtube.com/watch?v=4zKvqL7zmJs" target="_blank">adrenaline91 exposed</a>',
  },
  {
    name: '5:5 Larges',
    skill: 'Dungeoneering',
    actionXP: 200000, // need to test
    actionsPerHour: 8.5,
    baseCostPerXp() {
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
    baseXpRate: (function () {
      const treesThatCanDie = 12 * 13913.8 + 12516.6 + 23463 / 3;
      const treesThatCantDie = 15000 + 8500 + 7 * 6380.4;
      return (0.86 * treesThatCanDie + treesThatCantDie) * 60 / 10;
    }()),
    baseCostPerXp() {
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
    baseCostPerXp() {
      return getPrice('Magic logs') / this.actionXP;
    },
    modifiers: [],
    requirements: [{name: 'Book of char'}],
    daily: 'return 384 / this.actionsPerHour',
    noBxp: true,
    noDxp: true,
    desc: '<a href="https://www.reddit.com/r/NRiver/comments/3z99jl/book_of_char/" target="_blank">Guide by NRiver</a>, use Elder logs if limiting factor',
  },
  baMethod('Firemaking', 812921),
  ba79Method('Firemaking', 492035.5),
  {
    name: 'Jadinko Lair',
    skill: 'Firemaking',
    actionXP: 1514.8,
    actionsPerHour: 515,
    baseCostPerXp() {
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
    desc: youtubeEmbed('Ff5Dgq8lZnA'),
  },
  {
    name: 'Wobbegongs with Skillchompas and Scrimshaw',
    skill: 'Fishing',
    actionXP: (0.205 * (0.85 * 1.1 + 0.15 * (922.5 / 682.5)) + 0.795 * 0.05) * 682.5, // 20.5% success, 15% scrimshaw, 10% furnace proc on remaining
    actionsPerHour: 1500,
    baseCostPerXp() {
      return getPrice('Azure skillchompa') / this.actionXP + (getPrice('Water rune') + getPrice('Decorated fishing urn (nr)')) / 9500 + getPrice('Whopper-baiting scrimshaw') / 3 / this.baseXpRate;
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
    desc: `${youtubeEmbed('9ixyY9Wfzns')}<br>
           Whopper-baiting scrimshaw also makes spots last longer, but makes xp/hr worse for doing contracts (Price is based on azure skillchompa but any type works fine)`,
  },
  {
    name: 'Wobbegongs with Skillchompas',
    skill: 'Fishing',
    actionXP: (0.205 * 1.1 + 0.795 * 0.05) * 682.5, // 20.5% success, 10% furnace proc on success
    actionsPerHour: 1500,
    baseCostPerXp() {
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
    desc: `${youtubeEmbed('Ot5nrMIYKfw')}<br>(Price is based on azure skillchompa but any type works fine)`,
  },
  {
    name: 'Wobbegongs',
    skill: 'Fishing',
    actionXP: 1.1 * 682.5,
    actionsPerHour: 0.205 * 1500, // 20.5% success, 4 ticks per attempt
    baseCostPerXp() {
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
    baseCostPerXp() {
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
    baseCostPerXp() {
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
    baseCostPerXp() {
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
    desc: youtubeEmbed('Ixf14YZlsWc'),
  },
  {
    name: 'Ornate Tortles',
    skill: 'Hunter',
    actionXP: 204 * 1585,
    actionsPerHour: 60 / 15,
    baseCostPerXp() {
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
    desc: youtubeEmbed('ocDtzwSV1jM'),
  },
  {
    name: 'Crystal Skillchompas',
    skill: 'Hunter',
    actionXP: 476,
    actionsPerHour: 2400,
    baseCostPerXp() {
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
    desc: youtubeEmbed('6ETexKA64ok'),
  },
  {
    name: 'Siphoning Gear',
    skill: 'Invention',
    baseXpRate: 622566,
    baseCostPerXp() {
      return getPrice('Equipment siphon') / 621000;
    },
    modifiers: [],
    requirements: [
      {name: '60 Invention (for lv 12 items)'},
      {name: 'T90 gear'},
    ],
    lossless: true,
    noDxp: true,
    desc: 'Siphon T90 weapons/armour (and crystal tools).',
  },
  {
    name: 'Warbands',
    skill: 'Mining',
    actionXP: 363862.5,
    actionsPerHour: 60 / 10,
    baseCostPerXp() {
      return 0;
    },
    modifiers: [],
    requirements: [{name: 'Warbanding FC or yolo'}],
    daily: 'return 1 / this.actionsPerHour',
    wildy: true,
    noBxp: true,
    noDxp: true,
    desc: '<a href="https://www.youtube.com/watch?v=Q8cIBTd3hCY" target="_blank">Sexy Mining Exp! Warbands OP As Balls Gf Spins</a>',
  },
  baMethod('Mining', 444763),
  ba79Method('Mining', 269200),
  {
    name: 'Lava Geyser with alt',
    skill: 'Mining',
    actionXP: 500,
    actionsPerHour: 860,
    baseCostPerXp() {
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
    desc: `${youtubeEmbed('vvaFDMd_Wo4')}<br>XP drops without alt due to hopping limit. Skillchompa bonus XP works here`,
  },
  {
    name: 'Alaea Crabs with Skillchompas',
    skill: 'Mining',
    actionXP: (0.158 * 1.1 + 0.842 * 0.05) * 692.5, // 15.8% success, 10% furnace proc on success
    actionsPerHour: 2000,
    baseCostPerXp() {
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
    desc: `${youtubeEmbed('Rq4-8O3TiaA')}<br>(Price is based on azure skillchompa but any type works fine)`,
  },
  {
    name: 'Alaea Crabs',
    skill: 'Mining',
    actionXP: 0.158 * 1.1 * 692.5, // 15.8% success, 3 ticks per attempt
    actionsPerHour: 2000,
    baseCostPerXp() {
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
  wildyAltarMethod('Dragon bones', 72),
  wildyAltarMethod('Hardened dragon bones', 144),
  wildyAltarMethod('Airut bones', 132.5),
  wildyAltarMethod('Frost dragon bones', 180),
  wildyAltarMethod('Reinforced dragon bones', 190),
  altarMethod('Dragon bones', 72),
  altarMethod('Hardened dragon bones', 144),
  altarMethod('Airut bones', 132.5),
  altarMethod('Frost dragon bones', 180),
  altarMethod('Reinforced dragon bones', 190),
  scatterBuryMethod('Dragon bones', 72, 'Infernal ashes', 62.5),
  scatterBuryMethod('Hardened dragon bones', 144, 'Infernal ashes', 62.5),
  scatterBuryMethod('Frost dragon bones', 180, 'Infernal ashes', 62.5),
  scatterBuryMethod('Reinforced dragon bones', 190, 'Infernal ashes', 62.5),
  scatterBuryMethod('Dragon bones', 72, 'Tortured ashes', 90),
  scatterBuryMethod('Hardened dragon bones', 144, 'Tortured ashes', 90),
  scatterBuryMethod('Frost dragon bones', 180, 'Tortured ashes', 90),
  scatterBuryMethod('Reinforced dragon bones', 190, 'Tortured ashes', 90),
  scatterBuryMethod('Dragon bones', 72, 'Searing ashes', 200),
  scatterBuryMethod('Hardened dragon bones', 144, 'Searing ashes', 200),
  scatterBuryMethod('Frost dragon bones', 180, 'Searing ashes', 200),
  scatterBuryMethod('Reinforced dragon bones', 190, 'Searing ashes', 200),
  {
    name: '5-tick cleansing crystals',
    skill: 'Prayer',
    actionXP: 2100,
    actionsPerHour: 1200,
    baseCostPerXp() {
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
    desc: youtubeEmbed('tjN34chGyR4'),
  },
  {
    name: 'Cleansing crystals',
    skill: 'Prayer',
    actionXP: 9800,
    actionsPerHour: 29,
    baseCostPerXp() {
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
  {
    name: 'Soul Runes',
    skill: 'Runecrafting',
    actionXP: 220,
    actionsPerHour: 440,
    baseCostPerXp() {
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
    desc: youtubeEmbed('HaO7etpX5zk'),
  },
  {
    name: 'Movran Tasks',
    skill: 'Slayer',
    baseXpRate: 1000000,
    baseCostPerXp() {
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
    baseCostPerXp() {
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
    desc: youtubeEmbed('bpvjOI3sJ6I'),
  },
  {
    name: 'Rune 2h',
    skill: 'Smithing',
    actionXP: 225,
    actionsPerHour: 1580,
    baseCostPerXp() {
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
    actionsPerHour: 0.73 * 6000 / (2 + 5 * 0.415 * 0.27), // 73% success rate, 41.5% stun rate without monkey
    baseCostPerXp() {
      return -1;
    },
    modifiers: [
      raf,
      ava6,
      {
        name: 'Ardy cloak 3', // TODO: quantify effects
        effect() {
          return {base: 0.0};
        },
      },
      {
        name: 'Cheeky monkey',
        effect() {
          return {base: 0.045};
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
      {name: 'T4+ Five finger discount aura'},
      {name: 'Trahaern exoskeleton / Master camouflage outfit)'},
      {name: 'Crystal mask + Light form'},
      {name: 'Thieving skillcape'},
      {name: 'Featherfingered necklace'},
      {name: 'Soul-in-a-box'},
    ],
    desc: `${youtubeEmbed('-05YAUMEDPs')}<br>Aura makes a big difference. skillcape > Ardy cloak if you don't have comp cape to use both. cheeky monkey is best familiar but discontinued now. hold ava with alt`,
  },
  {
    name: 'Priffdinas Elves',
    skill: 'Thieving',
    baseXpRate: 420000,
    baseCostPerXp() {
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
      {name: 'Ardy cape 3'},
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
    baseCostPerXp() {
      return 0;
    },
    modifiers: [],
    requirements: [{name: '99 Woodcutting'}],
    daily: 'return 2 / 60',
    noBxp: true,
    noDxp: true,
    desc: `${youtubeEmbed('zSozFZsEXF0')}<br>Minigames FC tracks the worlds`,
  },
  {
    name: 'Divine Yews',
    skill: 'Woodcutting',
    actionXP: 175,
    actionsPerHour: 2800,
    baseCostPerXp() {
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
    desc: `Yews are hosted on w48 at reset.<br>${youtubeEmbed('6XvOyUn6z_c')}`,
  },
  { // TODO: better testing on success rate, add cost of runes
    name: 'Crystallize Acadia with Skillchompas',
    skill: 'Woodcutting',
    actionXP: 92,
    actionsPerHour: 1450, // 1500 max, give some wiggle room
    baseCostPerXp() {
      return 120 * 6 * (getPrice('Soul rune') + getPrice('Chaos rune') + getPrice('Fire rune') + getPrice('Water rune')) / this.baseXpRate + getPrice('Azure skillchompa') / this.actionXP + (getPrice('Earth rune') + getPrice('Decorated woodcutting urn (nr)')) / 9500;
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
    desc: `${youtubeEmbed('PCf8KBDuS04')}<br>(Price is based on azure skillchompa but any type works fine)`,
  },
  {
    name: 'Crystallize Acadia',
    skill: 'Woodcutting',
    actionXP: 92,
    actionsPerHour: 1450, // 1500 max, give some wiggle room
    baseCostPerXp() {
      return 120 * 6 * (getPrice('Soul rune') + getPrice('Chaos rune') + getPrice('Fire rune') + getPrice('Water rune')) / this.baseXpRate + (getPrice('Earth rune') + getPrice('Decorated woodcutting urn (nr)')) / 9500;
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
    desc: youtubeEmbed('PCf8KBDuS04'),
  },
].concat(prismania, smouldering, attack, strength, defMelee, magic, defMagic, ranged, defRanged);

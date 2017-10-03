/* eslint-disable max-len */
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const itemPrices = {};
const getPrice = name => itemPrices[name.replace('\'', '\\\'')] || NaN;

window.loaded = new Promise((resolve, reject) => {
  const priceUrl = 'https://243.ip-149-56-134.net:8080/https://runescape.wikia.com/api.php?action=parse&page=Module%3AGEPrices/data&format=json';
  Vue.http.get(priceUrl, {responseType: 'json'}).then((response) => {
    if (!response.body) {
      return reject();
    }
    const items = response.body.parse.text['*'].match(/\[.*?(?=,)/g);
    items.forEach((item) => {
      const itemMatch = item.match(/\['(.*?)'] = (\d+)/);
      itemPrices[itemMatch[1]] = parseInt(itemMatch[2], 10);
    });
    return resolve(itemPrices);
  }, () => reject());
});

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
      return (name.includes('bones') ? 0.98 : 1) * getPrice(name) / this.actionXP;
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
      return (name.includes('bones') ? 0.98 : 1) * getPrice(name) / this.actionXP;
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
    triHard: true,
    desc: `Demonstration by Persiflage is F2P, use a BoB to further increase actions per hour<br>
           ${youtubeEmbed('wq4FA8qxAZ4')}<br>
           Can also be done losslessly with other skills such as Herblore, Cooking. Dragon Rider amulet does not stack with DXPW, but stacks with Illumination`,
  };
}

function autosanctifierMethod(itemName, itemXP) {
  return {
    name: `Autosanctifier: ${itemName}`,
    skill: 'Prayer',
    actionXP: itemXP * 3.5,
    actionsPerHour: 5700,
    baseCostPerXp() {
      const costPerDisassemble = 3.8 / 3000 * getPrice('Divine charge');
      const spiritualCost = (getPrice('Unicorn stallion pouch') + costPerDisassemble) / 1.19 * 80 / 50;
      const coverCost = (getPrice('Black dragonhide chaps') + costPerDisassemble) / 2.03 * 40 / 50;
      const piousCost = (getPrice('Tortured soul') + costPerDisassemble) / 0.02 / 50;
      const marrentillCost = getPrice('Clean marrentill') * 10 / 50;
      return ((itemName.includes('bones') ? 0.98 : 1) * getPrice(itemName)
        + spiritualCost + coverCost + piousCost + marrentillCost) / this.actionXP;
    },
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {name: '4 x Auto disassembler mk. II'},
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
    desc: `Disassemble Unicorn stallion pouches, Black dragonhide chaps, and Tortured souls using invention machines for components.
    You get enough components for an hour of training roughly every 3 days from your machines.
    XP rates do not factor in time to fetch components and make sanctifiers. It is recommended to save your sanctifiers for Illumination`,
  };
}

function autosanctifierScatterBuryMethod(boneName, boneXP, ashName, ashXP) {
  return {
    name: `Autosanctifier: ${boneName} + ${ashName}`,
    skill: 'Prayer',
    actionXP: (boneXP + ashXP) * 3.5,
    actionsPerHour: 5725,
    baseCostPerXp() {
      const costPerDisassemble = 3.8 / 3000 * getPrice('Divine charge');
      const spiritualCost = (getPrice('Unicorn stallion pouch') + costPerDisassemble) / 1.19 * 80 / 50;
      const coverCost = (getPrice('Black dragonhide chaps') + costPerDisassemble) / 2.03 * 40 / 50;
      const piousCost = (getPrice('Tortured soul') + costPerDisassemble) / 0.02 / 50;
      const marrentillCost = getPrice('Clean marrentill') * 10 / 50;
      return (0.98 * getPrice(boneName) + getPrice(ashName)
        + 2 * (spiritualCost + coverCost + piousCost + marrentillCost)) / this.actionXP;
    },
    modifiers: [
      raf,
      ava6,
    ],
    requirements: [
      {name: '4 x Auto disassembler mk. II'},
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
    desc: `Disassemble Unicorn stallion pouches, Black dragonhide chaps, and Tortured souls using invention machines for components.
    You get enough components for an hour of training roughly every 6 days from your machines.
    XP rates do not factor in time to fetch components and make sanctifiers. It is recommended to save your sanctifiers for Illumination`,
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

function bookOfChar(logType, logXp) {
  return {
    name: `Book of Char (${logType})`,
    skill: 'Firemaking',
    actionXP: logXp,
    actionsPerHour: 384 * 60 / 4, // 4 mins including set up
    baseCostPerXp() {
      return getPrice(logType) / this.actionXP;
    },
    modifiers: [],
    requirements: [{name: 'Book of char'}],
    daily() {
      return 384 / this.actionsPerHour;
    },
    noBxp: true,
    noDxp: true,
    mutuallyExclusive: true,
    desc: '<a href="https://www.reddit.com/r/NRiver/comments/3z99jl/book_of_char/" target="_blank">Guide by NRiver</a>, use more expensive logs if limiting factor',
  };
}

function treeRun(tree, fruit) {
  return {
    name: `Tree Run (${tree.protection ? 'Protected' : 'Unprotected'} ${tree.name} + 
                     ${fruit.protection ? 'Protected' : 'Unprotected'} ${fruit.name})`,
    skill: 'Farming',
    actionXP: (() => {
      const canDie = 12225.5 + 23473 / 3;
      const cantDie = 15000 + 9350;
      const treePatch = 12 * (tree.protection ? 1 : 0.86) * tree.xp;
      const fruitTreePatch = 7 * (fruit.protection ? 1 : 0.86) * fruit.xp;
      // TODO: more research on disease rates
      return (0.86 * canDie + cantDie + treePatch + fruitTreePatch);
    })(),
    actionsPerHour: 60 / 8.5,
    baseCostPerXp() {
      const cost =
        12 * (0.95 * getPrice(`${tree.name} seed`)
        + (tree.protection ? (tree.protection.qty * getPrice(tree.protection.item)) : 0))
        + 0.95 * getPrice('Calquat tree seed')
        + 0.95 * getPrice('Elder seed') / 3
        + 7 * (0.95 * getPrice(`${fruit.name} seed`)
        + (fruit.protection ? (fruit.protection.qty * getPrice(fruit.protection.item)) : 0)
        - 6 * (fruit.protection ? 1 : 0.86) * getPrice(fruit.product))
        + 64 / 3 * (1500 + getPrice('Supercompost'));
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
      {name: 'Scroll of life'},
      urns,
      {
        name: 'Farmer\'s outfit',
        effect() {
          return {bonus: 0.06};
        },
      },
    ],
    mutuallyExclusive: true,
    daily() {
      return 1 / this.actionsPerHour;
    },
    // TODO: add updated videos with bladed dive
    desc: `<a href="https://www.youtube.com/watch?v=wu2h39fayAE" target="_blank">Full run</a> (6 ${tree.name}, 7 ${fruit.name}, Calquat, Crystal Tree, Elder, Arc Berries) + <a href="https://www.youtube.com/watch?v=DC50RaHmZ_8" target="_blank">normal tree only run</a>.
           Pay leprechaun for automatic supercompost. Assuming unprotected Elder and Calquat. Do spirit trees if you have them, but they are not part of the calculation`,
  };
}

function potion({name, level, xp, primaries, secondaries, product, comboPot}) {
  const itemsPerPot = primaries.length + secondaries.length;
  const potsPerInv = Math.min(Math.floor(60 / itemsPerPot), 24);
  const actionsPerHour = Math.floor(potsPerInv * 6000 / (3.3 + 1.875 * potsPerInv)); // TODO: calibrate to a 1 hour tryhard video
  const requirements = [
    {name: `${level} Herblore`},
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
  ];
  const modifiers = [
    raf,
    pulse,
    ava6,
  ];
  if (comboPot) {
    requirements.push({
      name: 'Perfect juju herblore potion',
      effect() {
        return {base: 0.05};
      },
    });
    requirements.push({name: 'Potion recipe unlocked'});
    modifiers.push({
      name: 'Voice of Seren',
      effect() {
        return {base: 0.2};
      },
    });
  }
  return {
    name,
    skill: 'Herblore',
    actionXP: xp,
    actionsPerHour,
    baseCostPerXp() {
      const primariesCost = primaries.reduce((acc, ingredient) => acc + getPrice(ingredient), 0);
      const secondariesCost = secondaries.reduce((acc, ingredient) => acc + getPrice(ingredient), 0);
      const secondariesMultiplier = (secondaries.length * 10 - 1) / (secondaries.length * 10); // 10% scroll of cleansing change spread over all secondaries
      const productMultiplier = comboPot ? 1.05 : 1.1;
      const totalCost = primariesCost + secondariesCost * secondariesMultiplier - productMultiplier * getPrice(product);
      return totalCost / this.actionXP;
    },
    modifiers,
    requirements,
    hideMethod: true,
    desc: `Use a ${potsPerInv < 24 ? 'mammoth' : 'yak'} for max potions per hour.
    <b>Actual price will vary due to demand/supply of ingredients and finished potion and may differ greatly from the GE prices used here.
    If you do any PvM and are going for 120 or 200m, it is highly recommended you make overloads instead</b>`,
  };
}

window.skillList = ['Attack', 'Defence', 'Strength', 'Constitution', 'Ranged', 'Prayer', 'Magic',
  'Cooking', 'Woodcutting', 'Fletching', 'Fishing', 'Firemaking', 'Crafting', 'Smithing',
  'Mining', 'Herblore', 'Agility', 'Thieving', 'Slayer', 'Farming', 'Runecrafting',
  'Hunter', 'Construction', 'Summoning', 'Dungeoneering', 'Divination', 'Invention'];

const prismania = window.skillList.map(skill => ({
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
}));
const smouldering = window.skillList.map(skill => ({
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
}));

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

const attack = meleeMethods.map(m => Object.assign({skill: 'Attack'}, m));

const strength = meleeMethods.map(m => Object.assign({skill: 'Strength'}, m));

const defMelee = meleeMethods.map(m => Object.assign({skill: 'Defence'}, m));

const magic = magicMethods.map(m => Object.assign({skill: 'Magic'}, m));

const defMagic = magicMethods.map(m => Object.assign({skill: 'Defence'}, m));

const ranged = rangedMethods.map(m => Object.assign({skill: 'Ranged'}, m));

const defRanged = rangedMethods.map(m => Object.assign({skill: 'Defence'}, m));


const unprotectedMagic = {name: 'Magic', xp: 13913.8};
const unprotectedYew = {name: 'Yew', xp: 7150.9};
const unprotectedPalm = {name: 'Palm tree', xp: 10509.6, product: 'Coconut'};
const unprotectedPapaya = {name: 'Papaya tree', xp: 6453.9, product: 'Papaya fruit'};
const unprotectedPineapple = {name: 'Pineapple', xp: 4791.7, product: 'Pineapple'};
const protectedMagic = Object.assign({protection: {qty: 25, item: 'Coconut'}}, unprotectedMagic);
const protectedYew = Object.assign({protection: {qty: 25, item: 'Cactus spine'}}, unprotectedYew);
const protectedPalm = Object.assign({protection: {qty: 15, item: 'Papaya fruit'}}, unprotectedPalm);
const protectedPapaya = Object.assign({protection: {qty: 10, item: 'Pineapple'}}, unprotectedPapaya);
const protectedPineapple = Object.assign({protection: {qty: 10, item: 'Watermelon'}}, unprotectedPineapple);
const normalTrees = [unprotectedMagic, unprotectedYew, protectedMagic, protectedYew];
const fruitTrees = [
  unprotectedPalm, unprotectedPapaya, unprotectedPineapple,
  protectedPalm, protectedPapaya, protectedPineapple,
];
const treeRuns = normalTrees.map(normalTree => fruitTrees.map(fruitTree => treeRun(normalTree, fruitTree)));

const bones = [
  {name: 'Dragon bones', xp: 72},
  {name: 'Airut bones', xp: 132.5},
  {name: 'Hardened dragon bones', xp: 144},
  {name: 'Frost dragon bones', xp: 180},
  {name: 'Reinforced dragon bones', xp: 190},
];
const ashes = [
  {name: 'Infernal ashes', xp: 62.5},
  {name: 'Tortured ashes', xp: 90},
  {name: 'Searing ashes', xp: 200},
];
const altarMethods = [...bones, ...ashes].map(item => altarMethod(item.name, item.xp));
const wildyAltarMethods = [...bones, ...ashes].map(item => wildyAltarMethod(item.name, item.xp));
const autosanctifierMethods = [...bones, ...ashes].map(item => autosanctifierMethod(item.name, item.xp));
const scatterBuryMethods = bones.map(bone => ashes.map(ash => scatterBuryMethod(bone.name, bone.xp, ash.name, ash.xp)));
const autosanctifierScatterBuryMethods = bones.map(bone => ashes.map(ash => autosanctifierScatterBuryMethod(bone.name, bone.xp, ash.name, ash.xp)));

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
  dhideMethod('Green d\'hide Shields', 64, 248, () => (4 - 0.4) * getPrice('Green dragon leather') - getPrice('Green dragonhide shield')),
  dhideMethod('Blue d\'hide Shields', 72, 280, () => (4 - 0.35) * getPrice('Blue dragon leather') - getPrice('Blue dragonhide shield')),
  dhideMethod('Red d\'hide Shields', 78, 312, () => (4 - 0.3) * getPrice('Red dragon leather') - getPrice('Red dragonhide shield')),
  dhideMethod('Black d\'hide Shields', 85, 344, () => (4 - 0.25) * getPrice('Black dragon leather') - getPrice('Black dragonhide shield')),
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
    daily() {
      return 2 / this.actionsPerHour;
    },
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
    daily: () => 0.5,
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
    daily() {
      return 2 / this.actionsPerHour;
    },
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
  bookOfChar('Yew logs', 405),
  bookOfChar('Magic logs', 607.6),
  bookOfChar('Corrupted magic logs', 638),
  bookOfChar('Elder logs', 900),
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
  potion({
    name: 'Super prayer renewal',
    level: 96,
    xp: 208.2,
    primaries: ['Crystal flask'],
    secondaries: ['Prayer potion (4)', 'Prayer renewal (4)'],
    product: 'Super prayer renewal potion (6)',
    comboPot: true,
  }),
  potion({
    name: 'Super warmaster',
    level: 85,
    xp: 500,
    primaries: ['Crystal flask'],
    secondaries: ['Super attack (4)', 'Super strength (4)', 'Super defence (4)', 'Super magic potion (4)', 'Super ranging potion (4)'],
    product: 'Super warmaster\'s potion (6)',
    comboPot: true,
  }),
  potion({
    name: 'Super melee',
    level: 81,
    xp: 281.3,
    primaries: ['Crystal flask'],
    secondaries: ['Super attack (4)', 'Super strength (4)', 'Super defence (4)'],
    product: 'Super melee potion (6)',
    comboPot: true,
  }),
  potion({
    name: 'Grand defence',
    level: 79,
    xp: 146.3,
    primaries: ['Crystal flask'],
    secondaries: ['Super defence (4)', 'Defence potion (4)'],
    product: 'Grand defence potion (6)',
    comboPot: true,
  }),
  potion({
    name: 'Grand attack',
    level: 78,
    xp: 93.8,
    primaries: ['Crystal flask'],
    secondaries: ['Super attack (4)', 'Attack potion (4)'],
    product: 'Grand attack potion (6)',
    comboPot: true,
  }),
  potion({
    name: 'Grand magic',
    level: 77,
    xp: 155.7,
    primaries: ['Crystal flask'],
    secondaries: ['Super magic potion (4)', 'Magic potion (4)'],
    product: 'Grand magic potion (6)',
    comboPot: true,
  }),
  potion({
    name: 'Grand ranging',
    level: 76,
    xp: 144.4,
    primaries: ['Crystal flask'],
    secondaries: ['Super ranging potion (4)', 'Ranging potion (4)'],
    product: 'Grand ranging potion (6)',
    comboPot: true,
  }),
  potion({
    name: 'Grand strength',
    level: 75,
    xp: 123.8,
    primaries: ['Crystal flask'],
    secondaries: ['Super strength (4)', 'Strength potion (4)'],
    product: 'Grand strength potion (6)',
    comboPot: true,
  }),
  potion({
    name: 'Prayer renewal',
    level: 94,
    xp: 190,
    primaries: ['Fellstalk potion (unf)'],
    secondaries: ['Morchella mushroom'],
    product: 'Prayer renewal (3)',
  }),
  potion({
    name: 'Aggression potion',
    level: 82,
    xp: 185,
    primaries: ['Bloodweed potion (unf)'],
    secondaries: ['Searing ashes'],
    product: 'Aggression potion (3)',
  }),
  potion({
    name: 'Saradomin brew',
    level: 81,
    xp: 180,
    primaries: ['Toadflax potion (unf)'],
    secondaries: ['Crushed nest'],
    product: 'Saradomin brew (3)',
  }),
  potion({
    name: 'Zamorak brew',
    level: 78,
    xp: 175,
    primaries: ['Torstol potion (unf)'],
    secondaries: ['Jangerberries'],
    product: 'Zamorak brew (3)',
  }),
  potion({
    name: 'Super magic',
    level: 76,
    xp: 172.5,
    primaries: ['Lantadyme potion (unf)'],
    secondaries: ['Potato cactus'],
    product: 'Super magic potion (3)',
  }),
  potion({
    name: 'Super ranging',
    level: 72,
    xp: 162.5,
    primaries: ['Dwarf weed potion (unf)'],
    secondaries: ['Wine of Zamorak'],
    product: 'Super ranging potion (3)',
  }),
  potion({
    name: 'Antifire',
    level: 69,
    xp: 157.5,
    primaries: ['Lantadyme potion (unf)'],
    secondaries: ['Dragon scale dust'],
    product: 'Antifire (3)',
  }),
  potion({
    name: 'Super defence',
    level: 69,
    xp: 157.5,
    primaries: ['Cadantine potion (unf)'],
    secondaries: ['White berries'],
    product: 'Super defence (3)',
  }),
  potion({
    name: 'Super restore',
    level: 63,
    xp: 142.5,
    primaries: ['Snapdragon potion (unf)'],
    secondaries: ['Red spiders\' eggs'],
    product: 'Super restore (3)',
  }),
  potion({
    name: 'Super strength',
    level: 55,
    xp: 125,
    primaries: ['Kwuarm potion (unf)'],
    secondaries: ['Limpwurt root'],
    product: 'Super strength (3)',
  }),
  potion({
    name: 'Super energy',
    level: 52,
    xp: 117.5,
    primaries: ['Avantoe potion (unf)'],
    secondaries: ['Mort myre fungus'],
    product: 'Super energy (3)',
  }),
  potion({
    name: 'Super antipoison',
    level: 48,
    xp: 106.3,
    primaries: ['Irit potion (unf)'],
    secondaries: ['Unicorn horn dust'],
    product: 'Super antipoison (3)',
  }),
  potion({
    name: 'Super attack',
    level: 45,
    xp: 100,
    primaries: ['Irit potion (unf)'],
    secondaries: ['Eye of newt'],
    product: 'Super attack (3)',
  }),
  potion({
    name: 'Summoning potion',
    level: 40,
    xp: 92,
    primaries: ['Spirit weed potion (unf)'],
    secondaries: ['Cockatrice egg'],
    product: 'Summoning potion (3)',
  }),
  potion({
    name: 'Prayer potion',
    level: 38,
    xp: 87.5,
    primaries: ['Ranarr potion (unf)'],
    secondaries: ['Snape grass'],
    product: 'Prayer potion (3)',
  }),
  potion({
    name: 'Guthix rest',
    level: 18,
    xp: 59.5,
    primaries: ['Harralander potion (unf)'],
    secondaries: ['Clean marrentill'],
    product: 'Guthix rest (3)',
  }),
  {
    name: 'Overloads from supers',
    skill: 'Herblore',
    actionXP: 2201,
    actionsPerHour: 460,
    baseCostPerXp() {
      const extremes = (0.9 * (getPrice('Clean avantoe') + getPrice('Clean dwarf weed') + getPrice('Clean lantadyme') + getPrice('Mud rune') + 5 * getPrice('Grenwall spikes'))
        + (getPrice('Super attack (3)') + getPrice('Super strength (3)') + getPrice('Super defence (3)') + getPrice('Super magic potion (3)') + getPrice('Super ranging potion (3)'))) / 1.1;
      const totalCost = 59 / 60 * (extremes + getPrice('Clean torstol'));
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
      const totalCost = 59 / 60 * (extremes + getPrice('Clean torstol'));
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
    daily() {
      return 1 / this.actionsPerHour;
    },
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
    daily() {
      return 12 / this.actionsPerHour;
    },
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
    daily() {
      return 1 / this.actionsPerHour;
    },
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
    daily() {
      return 500 / this.actionsPerHour;
    },
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
].concat(prismania, smouldering, attack, strength, defMelee, magic, defMagic, ranged, defRanged,
  altarMethods, wildyAltarMethods, ...scatterBuryMethods, ...autosanctifierMethods, ...autosanctifierScatterBuryMethods, ...treeRuns);

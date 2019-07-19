const main = document.querySelector('main')
const span = document.querySelector('span')
const stack = document.querySelector('b')
const btn = document.querySelector('button')

btn.addEventListener('click', function() {
  const el = document.querySelector('.bonuses')
  el.classList.toggle("toggle")
})

const heroes = fetch('/data.json')
    .then(response => response.json())
    .then(response => response.hero)
    .then(response => {
        response.map((item) => {
          const img = document.createElement('img')
          const div = document.createElement('div')
          const span = document.createElement('span')
          img.setAttribute('src', item.image)
          div.append(img)
          item.alliances.map((item) => {
            item = item.replace(' ', '')
            item = item.replace('-', '')
            const badge = document.createElement('img')
            badge.setAttribute('src', `img/${item}.png`)
            badge.setAttribute('class', 'bonus')
            span.append(badge)
          })
          div.append(span)
          div.setAttribute('data-badge', item.alliances.join(', '))
          div.setAttribute("id", item.name.replace(/\s+/g, ''))
          div.setAttribute("draggable", "true")
          div.setAttribute("ondragstart", "dragStart(event)")
          main.append(div)
        })
    })

const dragStart = (event) => {
  event.dataTransfer.setData("text/plain", event.target.id);
}
    
const allowDrop = (event) => {
  event.preventDefault();
}
    
const drop = (event) => {
  event.preventDefault();
  const data = event.dataTransfer.getData("text/plain")
  const element = document.querySelector(`#${data}`)
  try {
    event.target.appendChild(element)
    const list = document.querySelectorAll('article div[data-badge]')
    const ally = []
    const alliance = {}
    Array.from(list).map((item) => {
        item.getAttribute('data-badge').split(',').map((item) => {
            item = item.replace(' ', '')
            item = item.replace('-', '')
            ally.push(item.replace(/\s+/g, ''))
        })
    })
    ally.forEach(function(x) {
      alliance[x] = (alliance[x] || 0) + 1
    })
    stack.innerHTML = ''
    Array.from(Object.keys(alliance)).map((item) => {
      const selo = document.createElement('img')
      selo.setAttribute('src', `img/${item}.png`)
      selo.setAttribute('title', item)
      stack.append(selo)
    })
    Assassin(alliance.Assassin, 'assassin')
    Warlock(alliance.Warlock, 'warlock')
    Warrior(alliance.Warrior, 'warrior')
    Hunter(alliance.Hunter, 'hunter')
    DemonHunter(alliance.DemonHunter, 'demonhunter')
    Brawny(alliance.Brawny, 'brawny')
    Demon(alliance.Demon, 'demon')
    Dragon(alliance.Dragon, 'dragon')
    Druid(alliance.Druid, 'druid')
    Elusive(alliance.Elusive, 'elusive')
    Scaled(alliance.Scaled, 'scaled')
    Knight(alliance.Knight, 'knight')
    Inventor(alliance.Inventor, 'inventor')
    Human(alliance.Human, 'human')
    Mage(alliance.Mage, 'mage')
    Scrappy(alliance.Scrappy, 'scrappy')
    Deadeye(alliance.Deadeye, 'deadeye')
    BloodBound(alliance.BloodBound, 'bloodbound')
    Primordial(alliance.Primordial, 'primordial')
    Savage(alliance.Savage, 'savage')
    Heartless(alliance.Heartless, 'heartless')
    Troll(alliance.Troll, 'troll')
    Shaman(alliance.Shaman, 'shaman')
  } catch (error) {
    console.error(error)
  }
}

function byTwoBonus (x, alli, el, a, b, c, bonuses) {
  if (x >= a && x < b) {
    console.log(`${alli} bonus 1`)
    el.innerText = bonuses.a ? bonuses.a : ''
  } else if (x >= b && x < c) {
    console.log(`${alli} bonus 2`)
    el.innerText = bonuses.b ? bonuses.b : ''
  } else if (x >= c) {
    console.log(`${alli} bonus 3`)
    el.innerText = bonuses.c ? bonuses.c : ''
  } else if (x < a) {
    el.innerText = ''
  }
}

function Human(hero) {
  const p = document.createElement('p')
  p.setAttribute('class', 'human')
  span.append(p)
  const b = document.querySelector('.human')
  byTwoBonus(hero, 'human', b, 2, 4, 6, {
    a: 'Human units gain a 20% Chance to Silence target for 4 seconds when attacking.',
    b: 'Human units gain a 44% Chance to Silence target for 4 seconds when attacking.',
    c: 'Human units gain a 66% Chance to Silence target for 4 seconds when attacking.'
  })
}

function Mage(hero) {
  const p = document.createElement('p')
  p.setAttribute('class', 'mage')
  span.append(p)
  const b = document.querySelector('.mage')
  byTwoBonus(hero, 'mage', b, 3, 6, 9, {
    a: 'Enemies suffer -40% Magic Resistance.',
    b: 'Enemies suffer -100% Magic Resistance.'
  })
}

function Assassin(hero, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const b = document.querySelector(`.${name}`)
  byTwoBonus(hero, name, b, 3, 6, 9, {
    a: 'Assassins gain a 10% chance to Critical Hit for 300% Damage.',
    b: 'Assassins gain a 20% chance to Critical Hit for 400% Damage.',
    c: 'Assassins gain a 30% chance to Critical Hit for 500% Damage.'
  }) 
}

function Warlock(hero, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const b = document.querySelector(`.${name}`)
  byTwoBonus(hero, name, b, 2, 4, 6, {
    a: 'Now reads: Whenever a Warlock casts a spell, they form a link with the Ally who has the lowest health for 3 seconds. When either linked hero deals damage, both units are healed 50% of the damage dealt.',
    b: 'Now reads: Whenever a Warlock casts a spell, they form a link with the Ally who has the lowest health for 3 seconds. When either linked hero deals damage, both units are healed 80% of the damage dealt.',
    c: 'Now reads: Whenever a Warlock casts a spell, they form a link with the Ally who has the lowest health for 3 seconds. When either linked hero deals damage, both units are healed 130% of the damage dealt.'
  })  
}

function Warrior(hero, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const b = document.querySelector(`.${name}`)
  byTwoBonus(hero, name, b, 3, 6, 9, {
    a: 'Warriors gain +10 Armor',
    b: 'Warriors gain +15 Armor',
    c: 'Warriors gain +25 Armor'
  })  
}

function Hunter(hero, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const b = document.querySelector(`.${name}`)
  byTwoBonus(hero, name, b, 3, 6, 9, {
    a: 'Hunters have a 20% chance of quickly performing 2 attacks.',
    b: 'Hunters have a 35% chance of quickly performing 2 attacks.'
  })  
}

function Brawny(hero, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const b = document.querySelector(`.${name}`)
  byTwoBonus(hero, name, b, 2, 4, 6, {
    a: 'All Brawny units have their maximum HP increased by 200.',
    b: 'All Brawny units have their maximum HP increased by 500.'
  })  
}

function Druid(hero, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const b = document.querySelector(`.${name}`)
  byTwoBonus(hero, name, b, 2, 4, 6, {
    a: 'The lowest star ally Druid is upgraded a level.',
    b: 'The 2 lowest star ally Druids are upgraded a level each.'
  })  
}

function Elusive(hero, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const b = document.querySelector(`.${name}`)
  byTwoBonus(hero, name, b, 3, 6, 9, {
    a: 'Elusive units gain +20% Evasion.',
    b: 'Elusive units gain +45% Evasion.',
    c: 'Elusive units gain +75% Evasion.'
  })  
}

function Scaled(hero, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const b = document.querySelector(`.${name}`)
  byTwoBonus(hero, name, b, 2, 4, 6, {
    a: 'Allies gain + 30% Magic Resistance.',
    b: 'Allies gain + 50% Magic Resistance.'
  })  
}

function Knight(hero, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const b = document.querySelector(`.${name}`)
  byTwoBonus(hero, name, b, 2, 4, 6, {
    a: 'Knight units take 15% less physical and magic damage and an additional 15% when standing 1 cell away from another Knight.',
    b: 'Knight units take 20% less physical and magic damage and an additional 20% when standing 1 cell away from another Knight.',
    c: 'Knight units take 25% less physical and magic damage and an additional 25% when standing 1 cell away from another Knight.'
  })  
}

function Inventor(hero, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const b = document.querySelector(`.${name}`)
  byTwoBonus(hero, name, b, 2, 4, 6, {
    a: 'Inventors gain +15 HP Regeneration.',
    b: 'Inventors gain +40 HP Regeneration.'
  })
}

function Scrappy(hero, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const b = document.querySelector(`.${name}`)
  byTwoBonus(hero, name, b, 2, 4, 6, {
    a: 'A random scrappy unit is granted +9 Armor and +8 HP regeneration, Armor and HP are doubled whenever you have fewer units alive than your opponent does',
    b: 'All scrappy units are granted +9 Armor and +8 HP regeneration, Armor and HP are doubled whenever you have fewer units alive than your opponent does',
    c: 'All allies are granted +9 Armor and +8 HP regeneration, Armor and HP are doubled whenever you have fewer units alive than your opponent does'
  })  
}

function Deadeye(hero, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const b = document.querySelector(`.${name}`)
  byTwoBonus(hero, name, b, 2, 4, 6, {
    a: 'Deadeye units focus their attacks on the lowest-health enemy.'
  })  
}

function BloodBound(hero, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const b = document.querySelector(`.${name}`)
  byTwoBonus(hero, name, b, 2, 4, 6, {
    a: 'When a Blood-Bound unit dies, all other Blood-Bound units deal +125% Attack Damage for the rest of the battle.'
  })
}

function Primordial(hero, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const b = document.querySelector(`.${name}`)
  byTwoBonus(hero, name, b, 2, 4, 6, {
    a: 'When hit, Primordial units have a 30% chance to disarm melee attackers for 4 seconds and 10% chance to disarm ranged attackers for 4 seconds',
    b: 'When hit, Allies have a 30% chance to disarm melee attackers for 4 seconds and 10% chance to disarm ranged attackers for 4 seconds'
  })
}

function Savage(hero, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const b = document.querySelector(`.${name}`)
  byTwoBonus(hero, name, b, 2, 4, 6, {
    a: 'Allies gain + 10% Attack Damage.',
    b: 'Allies gain + 25% Attack Damage.',
    c: 'Allies gain + 45% Attack Damage.'
  })
}

function Heartless(hero, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const b = document.querySelector(`.${name}`)
  byTwoBonus(hero, name, b, 2, 4, 6, {
    a: 'Enemies suffer -5 Armor.',
    b: 'Enemies suffer -10 Armor.',
    c: 'Enemies suffer -15 Armor.'
  })
}

function Troll(hero, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const b = document.querySelector(`.${name}`)
  byTwoBonus(hero, name, b, 2, 4, 6, {
    a: 'Troll units gain +35 Attack Speed.',
    b: 'Troll units gain +65 Attack Speed and other Allies gain +30 Attack Speed.'
  })
}

function Shaman(hero, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const b = document.querySelector(`.${name}`)
  byTwoBonus(hero, name, b, 3, 6, 9, {
    a: 'Enemies affected by Hexes, Silences or Stuns will generate -200% mana when attacked.'
  })
}

function DemonHunter(x, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const el = document.querySelector(`.${name}`)
  if (x > 0 && x < 2) {
    console.log(`Demon hunter bonus 1`)
    el.innerText = 'Invalidate your opponent\'s Demon Alliance bonus.'
  } else if (x > 1) {
    console.log(`Demon hunter bonus 2`)
    el.innerText = 'Invalidate your opponent\'s Demon Alliance bonus. Demon units gain +50% Pure Damage.'
  } else if (!x) {
    el.innerText = ''
  }
}

function Demon(x, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const el = document.querySelector(`.${name}`)
  if (x >= 1) {
    console.log(`Demon bonus 1`)
    el.innerText = 'Demon units gain +50% Pure Damage. Active when you have only one type of Demon unit on the board.'
  } else if (!x) {
    el.innerText = ''
  }
}

function Dragon(x, name) {
  const p = document.createElement('p')
  p.setAttribute('class', name)
  span.append(p)
  const el = document.querySelector(`.${name}`)
  if (x >= 2) {
    console.log(`Dragon bonus 1`)
    el.innerText = 'All Dragon units unlock an additional draconic ability.'
  } else if (x < 2) {
    el.innerText = ''
  }
}
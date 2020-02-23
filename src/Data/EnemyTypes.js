const createTimers = () => {
  return [
    0, //stunTimer
    0, //poisonedTimer
    0, //weakenedTimer
    0, //strengthenedTimer
    0, //vulnerableTimer
    0 //reinforcedTimer
  ]
}

export const BOSS_TYPES = [
  {
    name: 'King Slime',
    maxHp: 30,
    hp: 17,
    def: 2,
    atk: 2,
    timers: createTimers(),
    skills: ['ATTACK'],
    gold: [8, 10]
  },
]

export const ENEMY_TYPES = [
  {
    name: 'BlueSlime',
    maxHp: 10,
    hp: 10,
    def: 1,
    atk: 2,
    timers: createTimers(),
    skills: ['ATTACK'],
    gold: [2,3]
  },
  {
    name: 'YellowSlime',
    maxHp: 10,
    hp: 10,
    def: 1,
    atk: 2,
    timers: createTimers(),
    skills: ['ATTACK', 'STUN'],
    gold: [2,3]
  },
  {
    name: 'PurpleSlime',
    maxHp: 10,
    hp: 10,
    def: 1,
    atk: 2,
    timers: createTimers(),
    skills: ['ATTACK', 'POISON'],
    gold: [2,3]
  },
  {
    name: 'RedSlime',
    maxHp: 10,
    hp: 10,
    def: 1,
    atk: 2,
    timers: createTimers(),
    skills: ['ATTACK', 'STRENGTH'],
    gold: [2,3]
  },
  {
    name: 'GreenSlime',
    maxHp: 15,
    hp: 10,
    def: 1,
    atk: 2,
    timers : createTimers(),
    skills: ['ATTACK', 'HEAL'],
    gold: [2,3]
  },
  {
    name: 'GreySlime',
    maxHp: 15,
    hp: 10,
    def: 2,
    atk: 2,
    timers : createTimers(),
    skills: ['ATTACK', 'REINFORCE'],
    gold: [2,3]
  }
]

import {
  CHANGE_STATE,
  DEAL_DAMAGE,
  CHOOSE_TARGET,
  HEAL_TARGET,
  GAME_STATES,
  REDUCE_TIMERS,
  SET_ENEMY_TURN,
  HANDLE_POISON,
  SET_TIMER,
  STATUS_TIMERS,
  CHANGE_MESSAGE,
  CHANGE_WAVE_NUMBER,
  WAIT_FOR_RESPONSE,
  ADD_TO_GOLD,
  SET_ENEMIES,
  TOGGLE_BOSS_ABILITY,
  CHANGE_SKILL,
  TOGGLE_RESTOCK,
  TOGGLE_BOSS_FIGHT,
  SET_STORE_ITEMS,
  RESET_GAME,
  SET_ATTACK,
  BUY_SKILL
} from './actions';

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

const initialState = {
  state: GAME_STATES.BATTLE_START,
  player: {
    maxHp: 20,
    hp: 20 ,
    def: 2,
    defMod: 0,
    atk: 2,
    atkMod: 0,
    gold: 200,
    timers: createTimers(),
    skillLevels: [
      1, //Attack
      1, //Heal
      0, //Stun
      0, //Poison
      0, //Weaken
      0, //Powerup
      0, //Pierce
      0, //Reinforce
    ],
    skills: ['ATTACK', 'HEAL', 'STUN']
  },
  store: {
    restock: true,
    skillOne: {
      skill: 1,
      purchased: false
    },
    skillTwo: {
      skill: 2,
      purchased: false
    },
    skillThree: {
      skill: 3, 
      purchased: false
    }
  },
  enemies: [],
  bossFight: false,
  usedBossAbility: false,
  target: 0,
  enemyTurn: 0,
  reducedTimers: false,
  waveNumber: 0,
  gameMessage: 'The battle has begun',
  waitingForResponse: false,
}

let healDamageToTarget = (state, action) => {
  if (action.target === 'player') {
    return {
      ...state,
      player: {
        ...state.player,
        hp: ((state.player.hp + action.heal) > state.player.maxHp) ? state.player.maxHp : (state.player.hp + action.heal)
      },
      waitingForResponse: true
    }
  } else {
    return {
      ...state,
      enemies: state.enemies.map((item, index) => {
        if (index !== action.healIndex) {
          return item
        } else {
          return {
            ...item,
            hp: ((item.hp + action.heal) > item.maxHp) ? item.maxHp : (item.hp + action.heal)
          }
        }
      }),
      waitingForResponse: true
    }
  }
}

let calculateDamage = (state, action) => {
  let damage
  let armor

  if (action.target === 'enemy') {
    damage = state.player.atk;
    if (state.player.timers[STATUS_TIMERS.STRENGTHENED] > 0) {
      damage += state.player.atk
    }
    if (state.player.timers[STATUS_TIMERS.WEAKENED] > 0) {
      damage -= state.player.atk
    }

    armor = state.enemies[state.target].def;
    if (state.enemies[state.target].timers[STATUS_TIMERS.REINFORCED] > 0) {
      armor += state.enemies[state.target].def
    }
    if (state.enemies[state.target].timers[STATUS_TIMERS.VULNERABLE] > 0) {
      armor -= state.enemies[state.target].def
    }
  } else {
    damage = state.enemies[state.target].atk;
    if (state.enemies[state.target].timers[STATUS_TIMERS.STRENGTHENED] > 0) {
      damage += state.enemies[state.enemyTurn].atk;
    }

    if (state.enemies[state.target].timers[STATUS_TIMERS.WEAKENED] > 0) {
      damage += state.enemies[state.enemyTurm].atk
    }

    armor = state.player.def;
    if (state.player.timers[STATUS_TIMERS.REINFORCED] > 0) {
      armor += state.player.def;
    }

    if (state.player.timers[STATUS_TIMERS.VULNERABLE] > 0) {
      armor -= state.player.def;
    }
  }

  if (armor > damage) {
    return damage / 2
  } else {
    return damage
  }
}




let dealDamageToTarget = (state, action) => {
  if (action.target === 'player') {
    return {
      ...state,
      player: {
        ...state.player,
        hp: state.player.hp - calculateDamage(state, action)
      },
      waitingForResponse: true
    }
  } else if (action.target === 'boss') {
    return {
      ...state,
      boss: state.boss.map((item, index) => {
        if (index !== state.target) {
          return item 
        } else {
          return {
            ...item,
            hp: (item.hp - calculateDamage(state, action)) < 0 ? 0 : item.hp - calculateDamage(state, action)
          }
        }
      })
    }
  } else {
    return {
      ...state,
      enemies: state.enemies.map((item, index) => {
        if (index !== state.target) {
          return item
        } else {
          return {
            ...item,
            hp: (item.hp - calculateDamage(state, action)) < 0 ? 0 : item.hp - calculateDamage(state, action)
          }
        }
      }),
      waitingForResponse: true
    }
  }
}

const decrementTimers = (timers) => {
  let timeCheck =  timers.map((timer) => {
    if (timer > 0) {
      return timer - 1;
    } else {
      return 0
    }
  })

  return timeCheck
}

const handlePoison = (state, action) => {
  return {
    ...state,
    player: {
      ...state.player,
      hp: (state.player.timers[STATUS_TIMERS.POISONED] > 0) ? state.player.hp - 1 : state.player.hp
    },
    enemies: state.enemies.map((enemy) => {
        return {
          ...enemy,
          hp: (enemy.timers[STATUS_TIMERS.POISONED] > 0) ? enemy.hp - 1 : enemy.hp
        }
    }),
    waitingForResponse: true
  }
}

const increaseSkill = (skills, skillToIncrease) => {
  return skills.map((skill, index) => {
    if (index === skillToIncrease) {
      return skill + 1
    } else {
      return skill
    }
  })
}

const setTimers = (state, action) => {
  if (action.target === 'player') {
    return {
      ...state,
      player: {
        ...state.player,
        timers: state.player.timers.map((timer, index) => {
          if (index === action.timerToSet){
            return action.newTimer;
          } else {
            return timer;
          }
        })
      },
      waitingForResponse: true
    }
  } else {
    return {
      ...state,
      enemies: state.enemies.map((enemy, index) => {
        if (index === state.target) {
          return {
            ...enemy,
            timers: enemy.timers.map((timer, timerIndex) => {
              if (timerIndex === action.timerToSet) {
                return action.newTimer;
              } else {
                return timer;
              }
            })
          }
        } else {
          return enemy
        }
      }),
      waitingForResponse: true
    }
  }
}


const battleReducer = (state = initialState, action) => {
  console.log(action.type)
  switch(action.type) {
    case CHANGE_STATE:
      return Object.assign({}, state, {
        ...state,
        state: action.newState,
        reducedTimers: false,
        waitingForResponse: false
      })
    case DEAL_DAMAGE:
      return Object.assign({}, state,
        dealDamageToTarget(state, action)
      )
    case CHOOSE_TARGET:
      return Object.assign({}, state, {
        ...state,
        target: action.enemyName
      }
      )
    case HEAL_TARGET:
      return Object.assign({}, state,
        healDamageToTarget(state, action)
      )
    case SET_ENEMY_TURN:
      return Object.assign({}, state, {
        ...state,
        enemyTurn: action.newIndex,
        waitingForResponse: false
      })
    case REDUCE_TIMERS:
      return Object.assign({}, state,
      {
        ...state,
        player: {
          ...state.player,
          timers: decrementTimers(state.player.timers)
        },
        enemies: state.enemies.map((enemy) => {
          return {
            ...enemy,
            timers: decrementTimers(enemy.timers)
          }
        }),
        reducedTimers: true
      })
    case SET_TIMER:
      return Object.assign({}, state,
        setTimers(state, action))
    case CHANGE_MESSAGE:
      return Object.assign({}, state,
        {
          ...state,
          gameMessage: action.newMessage
        }
      )
    case HANDLE_POISON:
      return Object.assign({}, state,
        handlePoison(state, action)
      )
    case SET_ENEMIES:
      return Object.assign({}, state,
        {
          ...state,
          enemies: action.enemies
        }
      )
    case WAIT_FOR_RESPONSE:
      return Object.assign({}, state,
        {
          ...state,
          waitingForResponse: true
        }
      )
    case CHANGE_WAVE_NUMBER:
      return Object.assign({}, state,
      {
        ...state,
        waveNumber: action.newWaveNumber
      })
    case ADD_TO_GOLD:
      return Object.assign({}, state, {
        ...state,
        player: {
          ...state.player,
          gold: state.player.gold + action.goldToAdd
        }
      })
    case CHANGE_SKILL:
        return Object.assign({}, state, {
          ...state,
          player: {
            ...state.player,
            skillLevels: increaseSkill(state.player.skillLevels, action.skillToChange)  
          }
        })
    case TOGGLE_BOSS_ABILITY:
        return Object.assign({}, state, {
          ...state,
          usedBossAbility: !state.usedBossAbility
        })
    case TOGGLE_RESTOCK:
        return Object.assign({}, state, {
          ...state,
          store: {
            ...state.store,
            restock: !state.store.restock
          }
        })
    case SET_STORE_ITEMS:
        return Object.assign({}, state, {
          ...state,
          store: {
            ...state.store,
            skillOne: {
              skill: action.itemOne,
              purchased: false
            },
            skillTwo: {
              skill: action.itemTwo,
              purchased: false
            },
            skillThree: {
              skill: action.itemThree,
              purchased: false
            },
          }
        })
    case BUY_SKILL:
      return Object.assign({}, state, {
        ...state,
        player: {
          ...state.player,
          gold: state.player.gold - action.cost,
          skillLevels: increaseSkill(state.player.skillLevels, state.store[action.skillToBuy].skill),
        },
        store: {
          ...state.store,
          [action.skillToBuy]: {
            ...state.store[action.skillToBuy],
            purchased: true
          }
        }
      })
    case RESET_GAME:
      console.log('inside reset game')
      return Object.assign({}, state, {
        ...initialState
      })
    case TOGGLE_BOSS_FIGHT:
      return Object.assign({}, state, {
        ...state,
        target: 0,
        bossFight: !state.bossFight
      })
    case SET_ATTACK:
      console.log('inside set attack newatk', action.newAtk)
      return Object.assign({}, state, {
        ...state,
        player: {
          ...state.player,
          atk: action.newAttack
        }
      })
    default:
      return state

  }
}

export default battleReducer;

export const CHANGE_STATE = 'CHANGE_STATE'
export const DEAL_DAMAGE = 'DEAL_DAMAGE'
export const CHOOSE_TARGET = 'CHOOSE_TARGET'
export const HEAL_TARGET = 'HEAL_TARGET'
export const SET_ENEMY_TURN = 'SET_ENEMY_TURN'
export const REDUCE_TIMERS = 'REDUCE_TIMERS'
export const SET_TIMER = 'SET_TIMER'
export const CHANGE_MESSAGE = 'CHANGE_MESSAGE'
export const STUN_TARGET = 'STUN_TARGET'
export const HANDLE_POISON = 'HANDLE_POISON'
export const SET_ENEMIES = 'SET_ENEMIES'
export const WAIT_FOR_RESPONSE = 'WAIT_FOR_RESPONSE'
export const CHANGE_WAVE_NUMBER = 'CHANGE_WAVE_NUMBER'
export const ADD_TO_GOLD = 'ADD_TO_GOLD'
export const CHANGE_SKILL = 'CHANGE_SKILL'
export const TOGGLE_BOSS_ABILITY = 'TOGGLE_BOSS_ABILITY'
export const TOGGLE_RESTOCK = 'TOGGLE_RESTOCK'
export const SET_STORE_ITEMS = 'SET_STORE_ITEMS'
export const BUY_SKILL = 'BUY_SKILL'
export const TOGGLE_BOSS_FIGHT = 'TOGGLE_BOSS_FIGHT'
export const RESET_GAME = 'RESET_GAME'
export const SET_ATTACK = 'SET_ATTACK'

export const GAME_STATES = {
  BATTLE_START: 'battleStart',
  ROUND_START: 'roundStart',
  PLAYER_TURN: 'playerTurn',
  BEFORE_ENEMY: 'beforeEnemy',
  ENEMY_TURN: 'enemyTurn',
  ROUND_END: 'roundEnd',
  BATTLE_END: 'battleEnd',
  STORE: 'store',
  GAMEOVER: 'gameOver'
}

export const STATUS_TIMERS = {
  STUNNED: 0,
  POISONED: 1,
  WEAKENED: 2,
  STRENGTHENED: 3,
  VULNERABLE: 4,
  REINFORCED: 5
}

export const SKILL_NAMES = {
  ATTACK: 0,
  HEAL: 1,
  STUN: 2,
  POISON: 3,
  WEAKEN: 4,
  POWERUP: 5,
  PIERCE: 6,
  ARMORUP: 7
}


export function changeMessage(newMessage) {
  return { type: CHANGE_MESSAGE, newMessage: newMessage }
}

export function changeState(newState) {
  return { type: CHANGE_STATE, newState: newState }
}

export function dealDamage(target) {
  return { type: DEAL_DAMAGE, target: target }
}

export function chooseTarget(enemyName) {
  return { type: CHOOSE_TARGET, enemyName: enemyName}
}

export function healTarget(target, heal, healIndex) {
  return { type: HEAL_TARGET, target: target, heal: heal, healIndex: healIndex}
}

export function setEnemyTurn(newIndex) {
  return { type: SET_ENEMY_TURN, newIndex: newIndex}
}

export function reduceTimers() {
  return { type: REDUCE_TIMERS }
}

export function setTimer(target, timerToSet, newTimer) {
  return { type: SET_TIMER, target: target, timerToSet: timerToSet, newTimer: newTimer }
}

export function handlePoison() {
  return { type: HANDLE_POISON }
}

export function setEnemies(enemies) {
  return { type: SET_ENEMIES, enemies: enemies }
}

export function waitForResponse() {
  return { type: WAIT_FOR_RESPONSE }
}

export function changeWaveNumber(newWaveNumber) {
  return { type: CHANGE_WAVE_NUMBER, newWaveNumber: newWaveNumber}
}

export function addToGold(goldToAdd) {
  return { type: ADD_TO_GOLD, goldToAdd: goldToAdd }
}

export function changeSkill(skillToChange) {
  return { type: CHANGE_SKILL, skillToChange: skillToChange}
}

export function toggleBossAbility() {
  return { type: TOGGLE_BOSS_ABILITY }
}

export function toggleRestock() {
  return { type: TOGGLE_RESTOCK }
}

export function setStoreItems(itemOne, itemTwo, itemThree) {
  return { type: SET_STORE_ITEMS, itemOne: itemOne, itemTwo: itemTwo, itemThree: itemThree}
}

export function buySkill(skillToBuy, cost) {
  return { type: BUY_SKILL, skillToBuy: skillToBuy, cost: cost}
}

export function toggleBossFight() {
  return { type: TOGGLE_BOSS_FIGHT }
}

export function resetGame() {
  return { type: RESET_GAME}
}

export function setAttack(newAttack) {
  return { type: SET_ATTACK, newAttack: newAttack }
}

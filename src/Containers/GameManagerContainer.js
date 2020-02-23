import { connect } from 'react-redux'
import {
  changeState,
  dealDamage,
  chooseTarget,
  healTarget,
  setEnemyTurn,
  reduceTimers,
  setTimer,
  waitForResponse,
  changeWaveNumber,
  handlePoison,
  changeSkill,
  addToGold,
  toggleRestock,
  setStoreItems,
  setAttack,
  buySkill,
  toggleBossFight,
  toggleBossAbility,

  setEnemies,
  resetGame,
  changeMessage} from '../Redux/actions'

import GameManager from '../Components/GameManager'

const mapStateToProps = (state, ownProps) => {
  return {
    state: state.state,
    player: state.player,
    enemies: state.enemies,
    target: state.target,
    store: state.store,
    enemyTurn: state.enemyTurn,
    reducedTimers: state.reducedTimers,
    gameMessage: state.gameMessage,
    waitingForResponse: state.waitingForResponse,
    waveNumber: state.waveNumber,
    boss: state.boss,
    bossFight: state.bossFight,
    usedBossAbility: state.usedBossAbility
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeState: (newState) => {
      dispatch(changeState(newState))
    },
    dealDamage: (target) => {
      dispatch(dealDamage(target))
    },
    chooseTarget: (enemyName) => {
      dispatch(chooseTarget(enemyName))
    },
    healTarget: (target, heal, healIndex) => {
      dispatch(healTarget(target, heal, healIndex))
    },
    setEnemyTurn: (newIndex) => {
      dispatch(setEnemyTurn(newIndex))
    },
    reduceTimers: () => {
      dispatch(reduceTimers())
    },
    setTimer: (target, timerToSet, newTimer) => {
      dispatch(setTimer(target, timerToSet, newTimer))
    },
    changeMessage: (newMessage) => {
      dispatch(changeMessage(newMessage))
    },
    handlePoison: () => {
      dispatch(handlePoison())
    },
    setEnemies: (enemies) => {
      dispatch(setEnemies(enemies))
    },
    waitForResponse: () => {
      dispatch(waitForResponse())
    },
    changeWaveNumber: (newWaveNumber) => {
      dispatch(changeWaveNumber(newWaveNumber))
    },
    addToGold: (goldToAdd) => {
      dispatch(addToGold(goldToAdd))
    },
    changeSkill: (skillToChange) => {
      dispatch(changeSkill(skillToChange))
    },
    toggleBossAbility: (skillToChange) => {
      dispatch(toggleBossAbility())
    },
    toggleRestock: () => {
      dispatch(toggleRestock())
    },
    setStoreItems: (itemOne, itemTwo, itemThree) => {
      dispatch(setStoreItems(itemOne, itemTwo, itemThree))
    },
    buySkill: (skillToBuy, cost) => {
      dispatch(buySkill(skillToBuy, cost))
    },
    toggleBossFight: () => {
      dispatch(toggleBossFight())
    },
    resetGame: () => {
      dispatch(resetGame())
    },
    setAttack: (newAttack) => {
      dispatch(setAttack(newAttack))
    }
  }
}

const GameManagerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameManager)

export default GameManagerContainer;

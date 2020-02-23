import React, { useEffect } from 'react'

import Boss from './Boss'
import Enemy from './Enemy'
import { GAME_STATES, STATUS_TIMERS } from '../Redux/actions'
import { ENEMY_TYPES } from '../Data/EnemyTypes'

const BossManager = ({
    boss,
    state,
    enemyTurn,
    setEnemyTurn,
    changeMessage,
    changeState,
    waitingForResponse,
    waitForResponse,
    dealDamage,
    healTarget,
    setTimer
}) => {

    let bossManagerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center'
    }

    let chance

    useEffect(() => {
      if (state === GAME_STATES.BATTLE_START) {
        let randomEnemy = Math.floor(Math.random() * ENEMY_TYPES.length)
        boss.push(ENEMY_TYPES[randomEnemy])
        changeMessage('BOSS FIGHT')
      } else if (state === GAME_STATES.ENEMY_TURN) {
        console.log(boss[enemyTurn].hp);
        if (boss[enemyTurn].hp <= 0) {
                  console.log("the enemy is dead");
          if (enemyTurn !== boss.length - 1) {
            setEnemyTurn(enemyTurn + 1)
          } else {
            setEnemyTurn(0)
            changeMessage('Move to next round?')
            changeState(GAME_STATES.ROUND_END);
          }
        } else if (boss[enemyTurn].timers[STATUS_TIMERS.STUNNED]){
          changeMessage(boss[enemyTurn].name + " is STUNNED");
        } else {
          if (!waitingForResponse) {
            let enemyAction = boss[enemyTurn].skills[Math.floor(Math.random() * boss[enemyTurn].skills.length)]
            switch(enemyAction) {
              case 'ATTACK':
                if(!waitingForResponse) {
                  dealDamage('player')
                  changeMessage(boss[enemyTurn].name + " is DEALING " + boss[enemyTurn].atk + ' DAMAGE')
                }
                break;
              case 'HEAL':
                if(!waitingForResponse) {
                  healTarget('enemy', 1, enemyTurn)
                  changeMessage(boss[enemyTurn].name + " is HEALING 1 HP")
                }
                break;
              case 'POISON':
                  chance = Math.floor(Math.random() * 100)
                  if (chance < 30) {
                    setTimer('player', STATUS_TIMERS.POISONED, 2)
                    changeMessage('You have been POISONED')
                  } else {
                    changeMessage(boss[enemyTurn].name + ' tried to POISON you but FAILED')
                    waitForResponse()
                  }
  
                break;
              case 'STUN':
                chance = Math.floor(Math.random() * 100)
                if (chance < 30) {
                  setTimer('player', STATUS_TIMERS.STUNNED, 2)
                  changeMessage('You have been STUNNED')
                } else {
                  changeMessage(boss[enemyTurn].name + ' tried to STUN you but FAILED')
                  waitForResponse()
                }
            }
          }
        }
      }
    })

    return(
        <div style={bossManagerStyle}>   
          {
            boss.map((boss, index) => {
                if (index === 0) {
                    return <Boss boss={boss} />
                } else {
                    return <Enemy 
                    enemyData={boss}
                    index = {index}

                    />
                }
                
            })
          }
        </div>
    )
}

export default BossManager
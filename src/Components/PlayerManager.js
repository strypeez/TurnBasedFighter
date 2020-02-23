import React from 'react'

import { GAME_STATES, STATUS_TIMERS } from '../Redux/actions'
import Player from './Player'

const PlayerManager = ({
  state,
  changeState,
  player,
  dealDamage,
  changeMessage,
  target,
  enemies,
  setTimer,
  healTarget}) => {

  if (state === GAME_STATES.PLAYER_TURN && player.timers[0] > 0) {
    changeMessage('You are STUNNED');
    changeState(GAME_STATES.BEFORE_ENEMY);
  }

  let playerObject = {
    name: 'player',
    hp: player.hp,
    maxHp: player.maxHp,
    atk: player.atk,
    def: player.def,
    gold: player.gold,
    timers: player.timers
  }

  let playerManagerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center'
}

let buttonStyle = {
  fontSize: '20px',
  color: 'white',
  backgroundColor: 'darkRed',
  fontFamily: 'ode,sans-serif',
  fontWeight: '500',
  fontStyle: 'normal',
}

let levelStyle = {
  fontSize: '15px',
  opacity: '0.6'
}

let buttonGroupStyle = {
  display: 'grid',
  gridTemplateColumns: '100px 100px',
  gridColumnGap: '5px',
  gridRowGap: '5px'
}

  return (
      <div style={playerManagerStyle}>
        <Player playerData = {playerObject} />
        <div style={buttonGroupStyle}>
        {
          (state === GAME_STATES.PLAYER_TURN) && player.skillLevels.map((skill, index) => {
            if (skill > 0) {
              let onClickFunction;
              let skillName;
              let chance = Math.floor(Math.random() * 100)
              switch(index) {
                case 0:
                  skillName = 'ATTACK'
                  onClickFunction = () => {

                    dealDamage('enemy', player.atk)
                    changeMessage('The player is attacking: ' + enemies[target].name)
                    changeState(GAME_STATES.BEFORE_ENEMY)
                  }
                  break;
                case 1:
                  skillName = 'HEAL'
                  onClickFunction = () => {
                    healTarget('player', 5, 0)
                    changeMessage('The player is healing 5 HP')
                    changeState(GAME_STATES.BEFORE_ENEMY)
                  }
                  break;
                case 2:
                  skillName = 'STUN'
                  onClickFunction = () => {
                    if (chance < 30) {
                      changeMessage('The ' + enemies[target].name + ' has been STUNNED');
                      setTimer('enemy', STATUS_TIMERS.STUNNED, 2)
                      changeState(GAME_STATES.BEFORE_ENEMY)
                    } else {
                      changeMessage('Oops :( The STUN failed');
                      changeState(GAME_STATES.BEFORE_ENEMY)
                    }
                  }
                  break;
                case 3:
                  skillName = 'POISON'
                  onClickFunction = () => {
                    if (chance < 30) {
                      changeMessage('The ' + enemies[target].name + ' has been POISONED');
                      setTimer('enemy', STATUS_TIMERS.POISONED, 1)
                      changeState(GAME_STATES.BEFORE_ENEMY)
                    } else {
                      changeMessage('Oops :( The POISON failed');
                      changeState(GAME_STATES.BEFORE_ENEMY)
                    }
                  }
                  break;
                case 4:
                  skillName = 'WEAKEN'
                  onClickFunction = () => {
                    if (chance < 30) {
                      changeMessage('The ' + enemies[target].name + ' has been WEAKENED');
                      setTimer('enemy', STATUS_TIMERS.WEAKENED, 2)
                      changeState(GAME_STATES.BEFORE_ENEMY)
                    } else {
                      changeMessage('Oops :( The WEAKEN failed');
                      changeState(GAME_STATES.BEFORE_ENEMY)
                    }
                  }
                  break;
                case 5:
                  skillName = 'POWER UP'
                  onClickFunction = () => {
                    if (chance < 30) {
                      changeMessage('You feel POWERED UP');
                      setTimer('player', STATUS_TIMERS.STRENGTHENED, 2)
                      changeState(GAME_STATES.BEFORE_ENEMY)
                    } else {
                      changeMessage('Oops :( The POWER UP failed');
                      changeState(GAME_STATES.BEFORE_ENEMY)
                    }
                  }
                  break;
                case 6:
                  skillName = 'PIERCE'
                  onClickFunction = () => {
                    if (chance < 30) {
                      changeMessage('The ' + enemies[target].name + ' has been PIERCED');
                      setTimer('enemy', STATUS_TIMERS.VULNERABLE, 2)
                      changeState(GAME_STATES.BEFORE_ENEMY)
                    } else {
                      changeMessage('Oops :( The PIERCE failed');
                      changeState(GAME_STATES.BEFORE_ENEMY)
                    }
                  }
                  break;
                default:
                  skillName = 'ARMOR UP'
                  onClickFunction = () => {
                    if (chance < 30) {
                      changeMessage('You feel PROTECTED');
                      setTimer('player', STATUS_TIMERS.REINFORCED, 1)
                      changeState(GAME_STATES.BEFORE_ENEMY)
                    } else {
                      changeMessage('Oops :( The ARMOR UP failed');
                      changeState(GAME_STATES.BEFORE_ENEMY)
                    }
                  }
                  break;
              }
              return <button style={buttonStyle} onClick={onClickFunction}><div>{skillName}<div style={levelStyle}>LVL{skill}</div></div> </button>
            }
          })

        }
      </div>
      </div>
  )
}

export default PlayerManager

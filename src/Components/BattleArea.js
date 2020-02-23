import React, { useEffect } from 'react'

import {GAME_STATES} from '../Redux/actions'

const BattleArea = ({
  state,
  gameMessage,
  enemies,
  enemyTurn,
  target,
  setEnemyTurn,
  chooseTarget,
  changeMessage,
  changeState}) => {

  let messageStyle = {
    fontFamily: 'ode,sans-serif',
    fontWeight: '500',
    fontStyle: 'normal',
    fontSize: '40px',
    color: 'white',
    marginTop: '15px',
    marginBottom: '15px'
  }

  let battleAreaStyle = {
    justifySelf: 'center',
    fontFamily: 'atrament-web,sans-serif',
    width: '500px',
    backgroundColor: '#7d0e0e',
    border: "5px solid #4a0505",
    gridRowStart: 3,
    gridColumnStart: 1,
    gridColumnEnd: 'span 2'
  }

  let nextStyle = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '10px',
    marginBottom: '5px'
  }

  console.log(state)

  let returnState = () => {
    return state;
  }

  let handleNextState = () => {
    let gameState = returnState();
    console.log("handling next state with a key press");
    console.log(gameState)
    switch(state) {
      case GAME_STATES.ROUND_START:
        changeMessage('Choose your move...')
        changeState(GAME_STATES.PLAYER_TURN)
        break;
      case GAME_STATES.PLAYER_TURN:
        changeState(GAME_STATES.BEFORE_ENEMY);
        break;
      case GAME_STATES.ENEMY_TURN:
        if (enemyTurn === enemies.length - 1) {
          setEnemyTurn(0)
          changeMessage('Move to next round?')
          changeState(GAME_STATES.ROUND_END);
        } else {
          setEnemyTurn(enemyTurn+1);
        }
        break;
      case GAME_STATES.BEFORE_ENEMY:
        changeState(GAME_STATES.ENEMY_TURN);
        break;
      default:
        changeMessage('ROUND START')
        changeState(GAME_STATES.ROUND_START)
      break;
    }
  }

  useEffect(() => {
    console.log('inside use effect')
    if (state !== GAME_STATES.PLAYER_TURN) {
      document.addEventListener('keydown', handleNextState, false)

      return () => {
        document.removeEventListener("keydown", handleNextState, false)
      }  
    }

  })

  return (
    <div onKeyPress={()=>console.log('were pressing a key')} style={battleAreaStyle}>
      <div style={messageStyle}>{gameMessage}</div>
      {
        !(state === GAME_STATES.PLAYER_TURN) && <div style={nextStyle} onClick={()=>handleNextState()}>[SPACE]</div>
      }
    </div>
  )
}

export default BattleArea

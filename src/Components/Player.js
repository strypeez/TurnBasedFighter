import React from 'react'

import PlayerAvatar from '../SVGIcons/PlayerAvatar.svg'
import HealthBar from './HealthBar'
import StatusIcons from './StatusIcons'

const Player = ({playerData}) => {

  let playerPanel1 = {
    width:'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: '10px',
    paddingTop: '10px',
  }

  let playerPanel2 = {
    width: 'auto',
    display: 'flex',
    marginLeft: '10px',
  }

  let plusStats = {
    color: 'green'
  }

  let minusStats = {
    color: 'red'
  }

  let playerStatsPanel = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '10px',
    color: 'grey',
    opacity: '0.8',
    fontWeight: 'bold',
    fontSize: '20px'
  }

  let playerNameStyle = {
    color: 'grey',
    fontWeight: 'bold',
    opacity: '0.8',
    fontSize: '25px'
  }

  let iconStyle = {
    width: '100px',
    height: '100px'
  }

  let playerFontStyle = {
    fontFamily: 'ode,sans-serif',
    fontWeight: '500',
    fontStyle: 'normal',
  }


  return (
    <div style={playerFontStyle}>
      <div style={playerPanel1}>
        <div style={playerNameStyle}>{playerData.name}</div>
        <HealthBar
          name = {playerData.name}
          width = {100}
          totalHealth = {playerData.maxHp}
          currentHealth = {playerData.hp}
        />
        <StatusIcons timers={playerData.timers} />
      </div>
      <div style={playerPanel2}>
        <div>
          <img alt="player avatar" style={iconStyle} src={PlayerAvatar} />
        </div>
        <div style={playerStatsPanel}>
          <div>ATK: {playerData.atk}
            {(playerData.timers[2] > 0 && !playerData.timers[3] > 0) && <span style={minusStats}>(-{playerData.atk})</span>}
            {(!playerData.timers[2] > 0 && playerData.timers[3] > 0) && <span style={plusStats}>(+{playerData.atk})</span>}
          </div>
          <div>DEF: {playerData.def}
            {(playerData.timers[4] > 0 && !playerData.timers[5] > 0) && <span style={minusStats}>(-{playerData.def})</span>}
            {(!playerData.timers[4] > 0 && playerData.timers[5] > 0) && <span style={plusStats}>(+{playerData.def})</span>}
          </div>
          <div>GOLD: {playerData.gold}</div>
        </div>
      </div>
    </div>
  )
}

export default Player;

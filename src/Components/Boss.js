import React from 'react'

import KingSlime from '../SVGIcons/KingSlime.svg'
import HealthBar from './HealthBar'
import StatusIcons from './StatusIcons'

const Boss = ({
    boss
}) => {
    let EnemyStyle = {
        width: '200px',
        marginTop: '10px'
      }
    
      let enemyPanel1 = {
        width:'auto',
        display: 'flex',
        flexDirection:  'column',
        alignItems: 'flex-start',
        marginLeft: '10px',
        paddingTop: '10px'
      }
    
      let enemyPanel2 = {
        width: 'auto',
        display: 'flex',
        marginLeft: '10px'
      }
    
      let enemyStatsPanel = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: '10px',
        color: 'grey',
        opacity: '0.8',
        fontWeight: 'bold'
      }
    
      let enemyNameStyle = {
        color: 'grey',
        fontWeight: 'bold',
        opacity: '0.8'
      }
    
      let iconStyle = {
        width: '100px',
        height: '100px',
        opacity: (boss.hp === 0) ? 0.2 : 1.0
      }
    
      let targetStyle = {
        width: '100px',
        height: '25px',
        position: 'relative',
        top: '-20px',
        left: '10px'
      }
    
      let targetPanelStyle= {
        display: 'flex',
        flexDirection: 'column',
      }
    
      let absoluteStyle = {
        position: 'absolute'
      }
    
      let enemyIcon = KingSlime
      
    
      return (
        <div style={EnemyStyle}>
          <div style={enemyPanel1}>
            <div style={enemyNameStyle}>{boss.name}</div>
            <HealthBar
              name = {boss.name}
              width = {100}
              totalHealth = {boss.maxHp}
              currentHealth = {boss.hp}
            />
            <StatusIcons timers={boss.timers}/>
          </div>
          <div style={enemyPanel2}>
            <div style={targetPanelStyle}>
              <img style={iconStyle} src={enemyIcon} />
            </div>
            <div style={enemyStatsPanel}>
              <div>ATK: {boss.atk}</div>
              <div>DEF: {boss.def}</div>
            </div>
          </div>
        </div>
      )
}

export default Boss
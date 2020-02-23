import React from 'react'
import HealthBar from './HealthBar'

//enemy sprites
import GreenSlime from '../SVGIcons/GreenSlime.svg'
import BlueSlime from '../SVGIcons/BlueSlime.svg'
import RedSlime from '../SVGIcons/RedSlime.svg'
import YellowSlime from '../SVGIcons/YellowSlime.svg'
import PurpleSlime from '../SVGIcons/PurpleSlime.svg'
import GreySlime from '../SVGIcons/GreySlime.svg'
import Target from '../SVGIcons/Targeted.svg'
import StatusIcons from './StatusIcons'

//boss sprites
import KingSlime from '../SVGIcons/KingSlime.svg'

const Enemy = ({enemyData, target, index, chooseTarget}) => {

  let EnemyStyle = {
    width: '200px',
    marginTop: '10px',
    fontFamily: 'ode,sans-serif',
    fontWeight: '500',
    fontStyle: 'normal',
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
    marginLeft: '10px',
    fontSize: '20px'
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
    opacity: '0.8',
    fontSize: '25px'
  }

  let iconStyle = {
    width: '100px',
    height: '100px',
    opacity: (enemyData.hp === 0) ? 0.2 : 1.0
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

  let enemyIcon;

  switch(enemyData.name) {
    case 'BlueSlime':
      enemyIcon = BlueSlime;
      break;
    case 'YellowSlime':
      enemyIcon = YellowSlime;
      break;
    case 'PurpleSlime':
      enemyIcon = PurpleSlime;
      break;
    case 'RedSlime':
      enemyIcon = RedSlime;
      break;
    case 'GreenSlime':
      enemyIcon = GreenSlime;
      break;
    case 'GreySlime':
      enemyIcon = GreySlime;
      break;
    default:
      enemyIcon = KingSlime;
      break;
  }

  return (
    <div onClick={()=>{chooseTarget(index)}} style={EnemyStyle}>
      <div style={enemyPanel1}>
        <div style={enemyNameStyle}>{enemyData.name}</div>
        <HealthBar
          name = {enemyData.name}
          width = {100}
          totalHealth = {enemyData.maxHp}
          currentHealth = {enemyData.hp}
        />
        <StatusIcons timers={enemyData.timers}/>
      </div>
      <div style={enemyPanel2}>
        <div style={targetPanelStyle}>
          <img style={iconStyle} src={enemyIcon} />
        </div>
        <div style={enemyStatsPanel}>
          <div>ATK: {enemyData.atk}</div>
          <div>DEF: {enemyData.def}</div>
        </div>
      </div>
      {
        target &&
        <div style={absoluteStyle}>
          <img style={targetStyle} src={Target} />
        </div>
      }
    </div>
  )
}

export default Enemy

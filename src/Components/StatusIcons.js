import React from 'react'

import StunIcon from '../SVGIcons/StunnedIcon.svg'
import PoisonIcon from '../SVGIcons/PoisonedIcon.svg'
import ReinforceIcon from '../SVGIcons/ReinforceIcon.svg'
import StrengthIcon from '../SVGIcons/StrengthIcon.svg'
import VulnerableIcon from '../SVGIcons/VulnerableIcon.svg'
import WeakenIcon from '../SVGIcons/WeakenIcon.svg'

const StatusIcons = ({
  timers
}) => {

  const statusIconStyle = {
    marginTop: '3px',
    display: 'flex',
  }

  const iconStyle = {
    height: '20px',
    width: '20px',
    marginRight: '5px'
  }

  return(
    <div style={statusIconStyle}>
      {
        timers.map((timer, index)=>{
          if (timer > 0) {
            switch(index){
              case 0:
                return <img src={StunIcon} style={iconStyle}></img>
              case 1:
                return <img src={PoisonIcon} style={iconStyle}></img>
              case 2:
                return <img src={WeakenIcon} style={iconStyle}></img>
              case 3:
                return <img src={StrengthIcon} style={iconStyle}></img>
              case 4:
                return <img src={VulnerableIcon} style={iconStyle}></img>
              default:
                return <img src={ReinforceIcon} style={iconStyle}></img>
            }
          }
        })
      }
    </div>
  )
}

export default StatusIcons

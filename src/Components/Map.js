import React from 'react';
import PlayerAvatar from '../SVGIcons/PlayerAvatar.svg'
import BossIcon from '../SVGIcons/BossIcon.svg'
import StoreIcon from '../SVGIcons/StoreIcon.svg'

const Map = ({
  waveNumber
}) => {

  let mapSquare = {
    width: '100px',
    height: '100px',
    backgroundColor: '#f5ce7f'
  }

  let mapStyle = {
    width: '550px',
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '50px'
  }

  let exampleMap = [0, 1, 2, 3, 4]

  return (
    <div>
      <div style={mapStyle}>
        {
          exampleMap.map((square, index) => {

            if (waveNumber === index) {
              return (
                <div style={mapSquare}>
                  <img alt="this is the players avatar" src={PlayerAvatar}></img>
                </div>
              )
            } else if (index === 2) {
              return (
                <div style={mapSquare}>
                <img alt="this is the store icon" src={StoreIcon}></img> 
               </div>  
              )
            
          } else if (index === 4) {
            return (
              <div style={mapSquare}>
              <img alt="this is the boss icon" src={BossIcon}></img> 
             </div>  
            )

          } else {
              return <div style={mapSquare}></div>
            }
          })
        }
      </div>
    </div>
  )
}

export default Map

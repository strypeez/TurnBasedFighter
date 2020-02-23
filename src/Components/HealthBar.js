import React from 'react';

const HealthBar = ({width, totalHealth, currentHealth, name}) => {

  let calculateHealthBarSize = () => {
    if (currentHealth === 0) {
      return 0
    }
    return (currentHealth/ totalHealth * 100) + '%';
  }

  let HealthBarStyle = {
    height: '20px',
    width: '100px',
    backgroundColor: 'black'
  }

  let currentHealthStyle = {
    backgroundColor: 'green',
    height: '20px',
    width: calculateHealthBarSize(),
  }

  let healthTextStyle = {
    color: 'white',
    fontWeight: 'bold',
    opacity: '0.5',
    fontSize: '18px'
  }

  return (
    <div>
      <div style={HealthBarStyle}>
        <div style={currentHealthStyle}><span style={healthTextStyle}>{currentHealth}/{totalHealth}</span></div>
      </div>
    </div>
  )
}

export default HealthBar;

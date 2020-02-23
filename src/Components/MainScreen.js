import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../SVGIcons/TBFLogo.svg'

const MainScreen = ({
    resetGame
}) => {

    let logoStyle = {
        height: '300px',

    }

    let buttonStyle = {
        fontSize: '30px',
        fontFamily: 'ode,sans-serif',
        fontWeight: '500',
        fontStyle: 'normal',
        marginTop: '20px'
    }

    let flexStyle = {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center'
    }

    return(
        <div style={flexStyle}>
            <img style={logoStyle} src={logo} alt="game logo"></img>
            <Link to='/game'>
                <button style={buttonStyle} onClick={()=>{resetGame()}}>START GAME</button>
            </Link>
        </div>
    )
}

export default MainScreen
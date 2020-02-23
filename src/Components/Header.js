import React from 'react'
import Logo from '../SVGIcons/TBFLogo.svg'

import { Link } from 'react-router-dom'

const Header = () => {

    let HeaderStyle = {
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    let logoStyle = {
        height: '70px'
    }

    return (
        <div style={HeaderStyle}>
            <Link to="/">
            <img style={logoStyle} src={Logo} />
            </Link>

        </div>
    )
}

export default Header
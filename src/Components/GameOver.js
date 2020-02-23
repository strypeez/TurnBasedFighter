import React from "react";

import { Link } from "react-router-dom";

const Gameover = ({ resetGame }) => {
  let roundEndStyle = {
    gridRowStart: 2,
    gridColumnStart: 1,
    gridColumnEnd: "span 2",
    backgroundColor: "light blue",
    fontFamily: "ode,sans-serif",
    fontWeight: "500",
    fontStyle: "normal"
  };

  let battleEndScreenStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "20px"
  };

  let gameoverTextStyle = {
    color: "grey",
    fontWeight: "bold",
    opacity: "0.8",
    fontSize: "100px"
  };

  let buttonStyle = {
      fontSize: '25px',
      fontFamily: "ode,sans-serif",
      fontWeight: "500",
      fontStyle: "normal",
      marginTop: '20px'
  }

  return (
    <div style={roundEndStyle}>
      <div style={battleEndScreenStyle}>
        <div style={gameoverTextStyle}>GAMEOVER</div>
        <button
        style={buttonStyle}
          onClick={() => {
            resetGame();
          }}
        >
          Play Again?
        </button>
        <Link to="/">
          <button style={buttonStyle}>Home Screen</button>
        </Link>
      </div>
    </div>
  );
};

export default Gameover;

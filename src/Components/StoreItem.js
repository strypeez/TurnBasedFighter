import React from "react";
import Player from "./Player";
import coin from "../SVGIcons/Coin.svg";

const StoreItem = ({ item, playerGold, level, buySkill, itemName }) => {
  let skillString;
  let cost = level * 5;

  switch (item.skill) {
    case 0:
      skillString = "ATTACK";
      break;
    case 1:
      skillString = "HEAL";
      break;
    case 2:
      skillString = "STUN";
      break;
    case 3:
      skillString = "POISON";
      break;
    case 4:
      skillString = "WEAKEN";
      break;
    case 5:
      skillString = "POWER UP";
      break;
    case 6:
      skillString = "PIERCE";
      break;
    default:
      skillString = "ARMOR UP";
  }

  console.log("This is the item" + item);

  let handleBuySkill = () => {
    if (playerGold > cost) {
      {
        buySkill(itemName, cost);
      }
    } else {
      console.log("not enough gold");
    }
  };

  let storeItemStyle = {
    position: "relative",
    width: "200px",
    height: "200px",
    margin: "20px",
    border: "3px solid black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  let soldOverlay = {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: "10",
    backgroundColor: "#8f6400 ",
    display: "flex",
    alignItems: "flex-end"
  };

  let soldText = {
    fontSize: "60px",
    color: "white",
    fontWeight: "bold",
    opacity: "1"
  };

  let costStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
    marginTop: '5px'
  };

  let iconStyle = {
    width: "30px",
    height: "30px",
    marginLeft: "5px"
  };

  let skillStyle = {
    fontSize: "30px",
    fontWeight: "bold"
  };

  let levelStyle = {
    fontSize: "15px"
  };

  let costText = {
      fontSize: '25px',
      color: 'grey',
      fontWeight: 'bold'
  }

  let buyStyle = {
    fontSize: "20px",
    fontFamily: 'ode,sans-serif',
    fontWeight: '500',
    fontStyle: 'normal',
  };

  return (
    <div style={storeItemStyle}>
      {item.purchased && (
        <div style={soldOverlay}>
          <span style={soldText}>SOLD</span>
        </div>
      )}
      <div>
        <div style={skillStyle}>{skillString}</div>
        <div style={levelStyle}>LVL {level}</div>
        <div style={costStyle}>
          <span style={costText}>{cost}</span> <img style={iconStyle} src={coin}></img>
        </div>
        <button
        disabled={item.purchased}
        style={buyStyle}
        onClick={() => {
          handleBuySkill();
        }}
      >
        {item.purchased ? "Purchased" : "BUY"}
      </button>
      </div>
    </div>
  );
};

export default StoreItem;

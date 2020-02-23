import React, { useEffect } from "react";

import StoreItem from "./StoreItem";
import coin from "../SVGIcons/Coin.svg";

import { GAME_STATES } from '../Redux/actions'

const Store = ({
  player,
  changeSkill,
  store,
  setStoreItems,
  buySkill,
  waveNumber,
  changeWaveNumber,
  changeState,
  toggleRestock
}) => {
  let skillOne, skillTwo, skillThree;

  let storeItemStyle = {
    display: "flex"
  };

  console.log(player.skillLevels);

  let pickThreeSkills = () => {
    skillOne = Math.floor(Math.random() * player.skillLevels.length);
    skillTwo = Math.floor(Math.random() * player.skillLevels.length);

    while (skillTwo === skillOne) {
      skillTwo = Math.floor(Math.random() * player.skillLevels.length);
    }

    skillThree = Math.floor(Math.random() * player.skillLevels.length);

    while (skillThree === skillOne || skillThree === skillTwo) {
      skillThree = Math.floor(Math.random() * player.skillLevels.length);
    }
  };

  useEffect(() => {
    if (store.restock) {
      pickThreeSkills();
      setStoreItems(skillOne, skillTwo, skillThree);
      toggleRestock();
    }
  });

  let moveToNextRound = () => {
    changeWaveNumber(waveNumber + 1);
    changeState(GAME_STATES.BATTLE_START);
  }

  let storeTitleStyle = {
    fontSize: "50px",
    margin: 0
  };

  let storeStyle = {
    fontFamily: 'ode,sans-serif',
    fontWeight: '500',
    fontStyle: 'normal',  
  }

  let iconStyle = {
    width: "30px",
    height: "30px",
    marginLeft: "5px"
  };

  let goldTextStyle = {
      color: 'grey',
      fontWeight: 'bold',
      fontSize: '30px'
  }

  let goldBox = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  }

  let nextRoundButtonStyle = {
    fontFamily: 'ode,sans-serif',
    fontWeight: '500',
    fontStyle: 'normal',
    fontSize: '25px'
  }

  return (
    <div style={storeStyle}>
      <div>
        <h1 style={storeTitleStyle}>STORE</h1>
        <div style={goldBox}>
          <span style={goldTextStyle}>{player.gold}</span> <img style={iconStyle} src={coin}></img>
        </div>
      </div>
      <div style={storeItemStyle}>
        <StoreItem
          playerGold={player.gold}
          itemName="skillOne"
          item={store.skillOne}
          buySkill={buySkill}
          level={player.skillLevels[store.skillOne.skill] + 1}
        />
        <StoreItem
          playerGold={player.gold}
          itemName="skillTwo"
          item={store.skillTwo}
          buySkill={buySkill}
          level={player.skillLevels[store.skillTwo.skill] + 1}
        />
        <StoreItem
          playerGold={player.gold}
          itemName="skillThree"
          item={store.skillThree}
          buySkill={buySkill}
          level={player.skillLevels[store.skillThree.skill] + 1}
        />
      </div>
      <button style={nextRoundButtonStyle} onClick={()=>{moveToNextRound()}}>Move to next round</button>
    </div>
  );
};

export default Store;

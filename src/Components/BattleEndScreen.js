import React from "react";

import { GAME_STATES, SKILL_NAMES } from "../Redux/actions";
import Map from "./Map";

const BattleEndScreen = ({
  enemies,
  waveNumber,
  changeWaveNumber,
  changeState,
  toggleBossFight,
  addToGold,
  player,
  setAttack,
  changeSkill
}) => {
  let roundEndStyle = {
    gridRowStart: 2,
    gridColumnStart: 1,
    gridColumnEnd: "span 2",
    backgroundColor: "light blue",
    fontFamily: "ode,sans-serif",
    fontWeight: "500",
    fontStyle: "normal"
  };

  let earnedTextStyle = {
    color: "grey",
    fontWeight: "bold",
    opacity: "0.8"
  };

  let goldTextStyle = {
    color: "#ffc745",
    fontWeight: "bold",
    opacity: "0.8"
  };

  let victoryTextStyle = {
    color: "blue",
    fontWeight: "bold",
    opacity: "0.8",
    fontSize: "100px"
  };

  let buttonStyle = {
    fontSize: "25px",
    fontFamily: "ode,sans-serif",
    fontWeight: "500",
    fontStyle: "normal",
    marginTop: "20px"
  };

  let battleEndScreenStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "20px"
  };

  let gold;
  let skill;
  let skillName;

  let handleMoveToNextWave = () => {
    if (waveNumber + 1 === 4) {
      toggleBossFight();
    }
    changeWaveNumber(waveNumber + 1);
    console.log("this is the new player.atk", player.atk + 1);
    setAttack(player.atk + 1);
    addToGold(gold);
    changeSkill(skill);
    changeState(GAME_STATES.BATTLE_START);
  };

  let handleMoveToStore = () => {
    changeWaveNumber(waveNumber + 1);
    changeState(GAME_STATES.STORE);
  };

  let determineGold = () => {
    gold = enemies.reduce((total, enemy) => {
      let goldAmount =
        Math.floor(Math.random() * (enemy.gold[1] - enemy.gold[0] + 1)) +
        enemy.gold[0];
      return total + goldAmount;
    }, 0);

    return gold;
  };

  let determineSkillDrop = () => {
    skillName = Math.floor(Math.random() * 6);
    switch (skillName) {
      case 0:
        skillName = "STUN";
        skill = SKILL_NAMES.STUN;
        break;
      case 1:
        skillName = "POISON";
        skill = SKILL_NAMES.POISON;
        break;
      case 2:
        skillName = "WEAKEN";
        skill = SKILL_NAMES.WEAKEN;
        break;
      case 3:
        skillName = "POWERUP";
        skill = SKILL_NAMES.POWERUP;
        break;
      case 4:
        skillName = "PIERCE";
        skill = SKILL_NAMES.PIERCE;
        break;
      default:
        skillName = "ARMORUP";
        skill = SKILL_NAMES.ARMORUP;
        break;
    }

    return skillName;
  };

  determineSkillDrop();

  return (
    <div style={roundEndStyle}>
      <div style={battleEndScreenStyle}>
        <div style={victoryTextStyle}>VICTORY</div>
        <div style={earnedTextStyle}>You EARNED: </div>
        <div style={goldTextStyle}>{determineGold()} GOLD</div>
        <div style={earnedTextStyle}>
          {determineSkillDrop()} LVL{player.skillLevels[skill] + 1}
        </div>
        <button
          style={buttonStyle}
          onClick={() => {
            if (waveNumber === 1) {
              handleMoveToStore();
            } else {
              handleMoveToNextWave();
            }
          }}
        >
          Next Wave
        </button>
        <Map waveNumber={waveNumber} />
      </div>
    </div>
  );
};

export default BattleEndScreen;

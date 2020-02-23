import React, { useEffect } from "react";

import BattleArea from "./BattleArea";
import PlayerManager from "./PlayerManager";
import EnemyManager from "./EnemyManager";
import BossManager from "./BossManager";
import Store from "./Store";

import BattleEndScreen from "./BattleEndScreen";
import Gameover from "./GameOver";

import skull from "../SVGIcons/Skull.svg";

import { GAME_STATES, STATUS_TIMERS } from "../Redux/actions";
import { ENEMY_TYPES } from "../Data/EnemyTypes";

const GameManager = ({
  setAttack,
  state,
  changeState,
  player,
  enemies,
  bossFight,
  dealDamage,
  chooseTarget,
  healTarget,
  resetGame,
  enemyTurn,
  setEnemyTurn,
  store,
  setEnemies,
  buySkill,
  addToGold,
  reduceTimers,
  reducedTimers,
  setTimer,
  boss,
  waitForResponse,
  changeSkill,
  toggleBossFight,
  waveNumber,
  changeMessage,
  setStoreItems,
  toggleRestock,
  changeWaveNumber,
  gameMessage,
  handlePoison,
  waitingForResponse,
  usedBossAbility,
  toggleBossAbility,
  target
}) => {
  const gridStyle = {
    display: "grid",
    justifyItems: "center",
    gridTemplateColumns: "auto",
    gridTemplateRows: "auto auto auto"
  };

  const bossTitleStyle = {
    display: "flex",
    fontFamily: "ode,sans-serif",
    fontWeight: "500",
    fontStyle: "normal",
    fontSize: "40px",
    color: "red"
  };

  const skullIconStyle = {
    width: "50px",
    height: "50px"
  };

  const gameManagerStyle = {
    gridRowStart: 1,
    gridColumnStart: 1,
    gridColumnEnd: "span 2",
    color: "grey",
    opacity: "0.8",
    fontWeight: "bold"
  };

  const roundTextStyle = {
    fontFamily: "ode,sans-serif",
    fontWeight: "500",
    fontStyle: "normal",
    fontSize: "40px"
  };

  const splitSide = {
    justifySelf: "center",
    display: "grid",
    gridColumnEnd: "span 2",
    gridTemplateColumns: "auto auto",
    width: "500px"
  };

  useEffect(() => {
    if (state === GAME_STATES.ROUND_START) {
      let poisonString = "";
      let someonePoisoned = false;

      if (player.timers[STATUS_TIMERS.POISONED] > 0) {
        someonePoisoned = true;
        poisonString += "YOU ";
      }

      for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].timers[STATUS_TIMERS.POISONED] > 0) {
          someonePoisoned = true;
          poisonString += enemies[i].name + " ";
        }
      }

      poisonString += "are poisoned, taking poison DAMAGE";

      if (someonePoisoned && !waitingForResponse) {
        handlePoison();
        changeMessage(poisonString);
      }
    }
  });

  let determineGameScreen = () => {
    switch (state) {
      case GAME_STATES.BATTLE_END:
        return (
          <BattleEndScreen
            enemies={enemies}
            waveNumber={waveNumber}
            changeWaveNumber={changeWaveNumber}
            changeState={changeState}
            toggleBossFight={toggleBossFight}
            setAttack={setAttack}
            player={player}
            addToGold={addToGold}
            changeSkill={changeSkill}
          />
        );
      case GAME_STATES.GAMEOVER:
        return <Gameover resetGame={resetGame} />;
      case GAME_STATES.STORE:
        return (
          <Store
            changeSkill={changeSkill}
            player={player}
            store={store}
            buySkill={buySkill}
            setStoreItems={setStoreItems}
            toggleRestock={toggleRestock}
            changeState={changeState}
            waveNumber={waveNumber}
            changeWaveNumber={changeWaveNumber}
          />
        );
      default:
        return (
          <>
            <div style={splitSide}>
              <PlayerManager
                state={state}
                changeState={changeState}
                player={player}
                healTarget={healTarget}
                changeMessage={changeMessage}
                target={target}
                enemies={enemies}
                setTimer={setTimer}
                dealDamage={dealDamage}
              />
              <EnemyManager
                state={state}
                waitForResponse={waitForResponse}
                changeState={changeState}
                player={player}
                enemies={enemies}
                setTimer={setTimer}
                chooseTarget={chooseTarget}
                waveNumber={waveNumber}
                changeMessage={changeMessage}
                usedBossAbility={usedBossAbility}
                toggleBossAbility={toggleBossAbility}
                enemyTurn={enemyTurn}
                setEnemies={setEnemies}
                setEnemyTurn={setEnemyTurn}
                target={target}
                healTarget={healTarget}
                bossFight={bossFight}
                waitingForResponse={waitingForResponse}
                dealDamage={dealDamage}
              />
            </div>
            <BattleArea
              state={state}
              gameMessage={gameMessage}
              enemyTurn={enemyTurn}
              enemies={enemies}
              setEnemyTurn={setEnemyTurn}
              changeMessage={changeMessage}
              target={target}
              chooseTarget={chooseTarget}
              changeState={changeState}
            />
          </>
        );
    }
  };

  if (state === GAME_STATES.BEFORE_ENEMY) {
    let totalEnemyHp = enemies.reduce((total, enemy) => {
      return total + enemy.hp;
    }, 0);

    if (totalEnemyHp <= 0) {
      changeMessage("Next wave?");
      changeState(GAME_STATES.BATTLE_END);
    }

    if (enemies[target].hp === 0) {
      for (let k = 0; k < enemies.length; k++) {
        if (enemies[k].hp !== 0) {
          chooseTarget(k);
          break;
        }
      }
    }
  }

  if (state === GAME_STATES.ROUND_END) {
    if (!reducedTimers) {
      reduceTimers();
    }
  }

  return (
    <div style={gridStyle}>
      <h1 style={roundTextStyle}>ROUND {waveNumber + 1}</h1>
      {bossFight && (
        <div style={bossTitleStyle}>
          BOSS <img style={skullIconStyle} alt="boss skull" src={skull} /> FIGHT
        </div>
      )}
      <div>{determineGameScreen()}</div>
    </div>
  );
};

export default GameManager;

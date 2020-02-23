import React, { useEffect } from "react";

import { GAME_STATES, STATUS_TIMERS, addToGold, toggleBossAbility } from "../Redux/actions";
import { ENEMY_TYPES, BOSS_TYPES } from "../Data/EnemyTypes";

import Enemy from "./Enemy";

const EnemyManager = ({
  state,
  changeState,
  enemies,
  waveNumber,
  target,
  dealDamage,
  chooseTarget,
  setTimer,
  changeMessage,
  enemyTurn,
  player,
  bossFight,
  waitForResponse,
  setEnemies,
  waitingForResponse,
  healTarget,
  setEnemyTurn,
  usedBossAbility,
  toggleBossAbility
}) => {
  let chance;

  

  useEffect(() => {
    if (state === GAME_STATES.ENEMY_TURN) {
      console.log(enemies[enemyTurn].hp);
      if (enemies[enemyTurn].hp <= 0) {
        console.log("the enemy is dead");
        if (enemyTurn !== enemies.length - 1) {
          setEnemyTurn(enemyTurn + 1);
        } else {
          setEnemyTurn(0);
          changeMessage("Move to next round?");
          changeState(GAME_STATES.ROUND_END);
        }
      } else if (enemies[enemyTurn].timers[STATUS_TIMERS.STUNNED]) {
        changeMessage(enemies[enemyTurn].name + " is STUNNED");
      } else if (player.hp <= 0) {
        console.log('this should be in battle end')
        changeState(GAME_STATES.GAMEOVER )
      } else {
        if (!waitingForResponse) {
          let enemyAction =
            enemies[enemyTurn].skills[
              Math.floor(Math.random() * enemies[enemyTurn].skills.length)
            ];
          switch (enemyAction) {
            case "ATTACK":
              if (!waitingForResponse) {
                dealDamage("player");
                changeMessage(
                  enemies[enemyTurn].name +
                    " is DEALING " +
                    enemies[enemyTurn].atk +
                    " DAMAGE"
                );
              }
              break;
            case "HEAL":
              if (!waitingForResponse) {
                healTarget("enemy", 1, enemyTurn);
                changeMessage(enemies[enemyTurn].name + " is HEALING 1 HP");
              }
              break;
            case "POISON":
              chance = Math.floor(Math.random() * 100);
              if (chance < 30) {
                setTimer("player", STATUS_TIMERS.POISONED, 2);
                changeMessage("You have been POISONED");
              } else {
                changeMessage(
                  enemies[enemyTurn].name + " tried to POISON you but FAILED"
                );
                waitForResponse();
              }

              break;
            default:
              chance = Math.floor(Math.random() * 100);
              if (chance < 30) {
                setTimer("player", STATUS_TIMERS.STUNNED, 2);
                changeMessage("You have been STUNNED");
              } else {
                changeMessage(
                  enemies[enemyTurn].name + " tried to STUN you but FAILED"
                );
                waitForResponse();
              }
          }
        }
      }
    } else if (state === GAME_STATES.BATTLE_START) {
      if (bossFight) {
        let newEnemies = [];

        newEnemies.push(BOSS_TYPES[0])

        addRandomEnemy(newEnemies)

        setEnemies(newEnemies);
        changeState(GAME_STATES.ROUND_START);
      } else {
        let newEnemies = [];
        let numEnemies;

        if (waveNumber > 1) {
          numEnemies = 3;
        } else {
          numEnemies = 2;
        }

        for (let i = 0; i < numEnemies; i++) {
          addRandomEnemy(newEnemies);
        }

        setEnemies(newEnemies);
        changeState(GAME_STATES.ROUND_START);
      }
    } else if (state === GAME_STATES.BEFORE_ENEMY) {
      if (bossFight) {
        if (!usedBossAbility && enemies[0].hp <= 15) {
          if (enemies[1].hp <= 0) {
            enemies.pop();
            addRandomEnemy(enemies)
            addRandomEnemy(enemies)
          } else {
            addRandomEnemy(enemies)
          }
          changeMessage('Slimes have arrived to defend the king')
          toggleBossAbility();
        }
      }
    }
  });

  let addRandomEnemy = (newEnemies) => {
    let whichEnemy = Math.floor(Math.random() * 100);
    if (whichEnemy < 10) {
      newEnemies.push(ENEMY_TYPES[2]);
    } else if (whichEnemy < 20) {
      newEnemies.push(ENEMY_TYPES[4]);
    } else if (whichEnemy < 60) {
      newEnemies.push(ENEMY_TYPES[1]);
    } else {
      newEnemies.push(ENEMY_TYPES[0]);
    }
  }

  let enemyManagerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  return (
    <div>
      <div style={enemyManagerStyle}>
        {enemies.map((enemy, index) => {
          if (index === target) {
            return (
              <Enemy
                chooseTarget={chooseTarget}
                index={index}
                enemyData={enemy}
                target={true}
              />
            );
          } else {
            return (
              <Enemy
                chooseTarget={chooseTarget}
                index={index}
                enemyData={enemy}
                target={false}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default EnemyManager;

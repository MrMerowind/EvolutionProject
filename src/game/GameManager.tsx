import * as PIXI from "pixi.js";
import { Stage, Container, Sprite, Text } from '@pixi/react';
import React, { useEffect, useState } from 'react';
import { mainPixiFont } from "../global/Fonts";
import { GameManagerStoreProvider, useGameManagerStore } from "./GameManagerStoreContext";
import { GameManagerStore } from "./GameManagerStore";
import AnimationRenderer from "../animation/AnimationData";



export const GameManager = () => {

  const ctx = useGameManagerStore();

  const [playerPosition, setPlayerPosition] = useState(ctx.player.getPosition());

  useEffect(() => {
    setPlayerPosition((p) => [0,0]);
  }, [playerPosition[0], playerPosition[1]]);

  // TODO: rewrite
  return (
    <GameManagerStoreProvider gameData={ctx}>
      <Stage width={ctx.screen.getWidth()} height={ctx.screen.getHeight()}>
        {/*Render player*/}
        <AnimationRenderer animationDataWalking={ctx.player.getAnimationData("walking")}
          animationDataStanding={ctx.player.getAnimationData("standing")}
          animationDataAttacking={ctx.player.getAnimationData("attacking")}
          animationState={"walking"} facedDirection={"left"} secondaryFacedDirection={"left"}
          time={0} scale={1} positionX={playerPosition[0]} positionY={playerPosition[1]} rotation={0}/>

        {/*Render UI*/}




        <Container x={0} y={0}>
          <Text text="O, dziala!" x={0} y={0} anchor={{ x: 0, y: 0 }} style={mainPixiFont}/>
        </Container>
      </Stage>
    </GameManagerStoreProvider>
  );
};
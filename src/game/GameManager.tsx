import * as PIXI from "pixi.js";
import { Stage, Container, Sprite, Text } from '@pixi/react';
import React from 'react';
import { mainPixiFont } from "../global/Fonts";
import PlayerRenderer from "../player/PlayerRenderer";
import { GameManagerStoreProvider, useGameManagerStore } from "./GameManagerStoreContext";
import { GameManagerStore } from "./GameManagerStore";



export const GameManager = () => {

  const ctx = useGameManagerStore();

  // TODO: rewrite
  return (
    <GameManagerStoreProvider gameData={ctx}>
      <Stage width={ctx.screen.getWidth()} height={ctx.screen.getHeight()}>
        {/*Render player*/}
        <PlayerRenderer player={ctx.player} camera={ctx.camera} />

        {/*Render UI*/}




        <Container x={0} y={0}>
          <Text text="O, dziala!" x={0} y={0} anchor={{ x: 0, y: 0 }} style={mainPixiFont}/>
        </Container>
      </Stage>
    </GameManagerStoreProvider>
  );
};
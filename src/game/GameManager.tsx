import * as PIXI from "pixi.js";
import { Stage, Container, Sprite, Text } from '@pixi/react';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { mainPixiFont } from "../globalData/Fonts";
import { GameManagerStoreProvider, useGameManagerStore } from "./GameManagerStoreContext";
import { GameManagerStore } from "./GameManagerStore";
import AnimationRenderer from "../animation/AnimationData";
import Player from "../player/Player";
import { AnimationState, Direction, DirectionHorizontal } from "../globalData/Types";
import PlayerRenderer from "../player/PlayerRenderer";
import MapRenderer from "../map/MapRenderer";



export const GameManager = () => {

  const ctx = useGameManagerStore();

  // TODO: Get rid of this states.
  const [miliseconds, setMiliseconds] = useState(0);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setMiliseconds(p => p + 20);
      ctx.camera.centerOnPlayer();
    }, 20);

    return () => {
      clearInterval(interval);
    }
  }, []);

  const areGraphicLoaded = useRef<boolean>(ctx.areGraphicsLoaded);

  if(!areGraphicLoaded) return null;
  // TODO: rewrite
  return (
    <GameManagerStoreProvider gameData={ctx}>
      <Stage width={ctx.screen.getWidth()} height={ctx.screen.getHeight()}>

        {/*Render map*/}
        <MapRenderer />
        {/*Render player*/}
        <PlayerRenderer miliseconds={miliseconds}/>
        

        {/*Render UI*/}




        {/*<Container x={0} y={0}>
          <Text text="O, dziala!" x={0} y={0} anchor={{ x: 0, y: 0 }} style={mainPixiFont}/>
        </Container>*/}
      </Stage>
    </GameManagerStoreProvider>
  );
};
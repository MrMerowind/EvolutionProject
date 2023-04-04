import * as PIXI from "pixi.js";
import { Stage, Container, Sprite, Text } from '@pixi/react';
import React, { useEffect, useRef, useState } from 'react';
import { mainPixiFont } from "../globalData/Fonts";
import { GameManagerStoreProvider, useGameManagerStore } from "./GameManagerStoreContext";
import { GameManagerStore } from "./GameManagerStore";
import AnimationRenderer from "../animation/AnimationData";
import Player from "../player/Player";
import { Direction, DirectionHorizontal } from "../globalData/Types";



export const GameManager = () => {

  const ctx = useGameManagerStore();

  const [miliseconds, setMiliseconds] = useState(0);
  const [buttonLeftPressed, setButtonLeftPressed] = useState(false);
  const [buttonRightPressed, setButtonRightPressed] = useState(false);
  const [buttonUpPressed, setButtonUpPressed] = useState(false);
  const [buttonDownPressed, setButtonDownPressed] = useState(false);
  const [facedDirection, setFacedDirection] = useState<Direction>("down");
  const [facedSecondaryDirection, setFacedSecondaryDirection] = useState<DirectionHorizontal>("left");

  const handleUserKeyPressDown = (e: KeyboardEvent) => {
    if (e.code === 'KeyW') { setButtonUpPressed(true); }
    if (e.code === 'KeyA') { setButtonLeftPressed(true); }
    if (e.code === 'KeyD') { setButtonRightPressed(true); }
    if (e.code === 'KeyS') { setButtonDownPressed(true); }
  }

  const handleUserKeyPressUp = (e: KeyboardEvent) => {
    if (e.code === 'KeyW') { setButtonUpPressed(false); }
    if (e.code === 'KeyA') { setButtonLeftPressed(false); }
    if (e.code === 'KeyD') { setButtonRightPressed(false); }
    if (e.code === 'KeyS') { setButtonDownPressed(false); }
  }



  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPressDown);
    window.addEventListener('keyup', handleUserKeyPressUp);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPressDown);
      window.removeEventListener('keyup', handleUserKeyPressUp);
    }
  }, []);

  useEffect(() => {
    if(buttonDownPressed) {
      ctx.player.moveUnits(0,1);
      setFacedDirection("down");
    }
    if(buttonUpPressed){
      ctx.player.moveUnits(0,-1);
      setFacedDirection("up");
    } 
    if(buttonRightPressed)
    {
      ctx.player.moveUnits(1,0);
      setFacedDirection("right");
      setFacedSecondaryDirection("right");
    } 
    if(buttonLeftPressed){
      ctx.player.moveUnits(-1,0);
      setFacedDirection("left");
      setFacedSecondaryDirection("left");
    } 
  }, [miliseconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMiliseconds(p => p + 20)
    }, 20);

    return () => {
      clearInterval(interval);
    }
  }, []);

  const [playerPosition, setPlayerPosition] = useState(ctx.player.getPosition());

  useEffect(() => {
    setPlayerPosition([ctx.player.getPositionX(), ctx.player.getPositionY()]);
  }, [miliseconds]);

  const areGraphicLoaded = useRef<boolean>(ctx.areGraphicsLoaded);

  if(!areGraphicLoaded) return null;
  // TODO: rewrite
  return (
    <GameManagerStoreProvider gameData={ctx}>
      <Stage width={ctx.screen.getWidth()} height={ctx.screen.getHeight()}>
        {/*Render player*/}
        <AnimationRenderer animationDataWalking={ctx.player.getAnimationData("walking")}
          animationDataStanding={ctx.player.getAnimationData("standing")}
          animationDataAttacking={ctx.player.getAnimationData("attacking")}
          animationState={"walking"} facedDirection={facedDirection} secondaryFacedDirection={facedSecondaryDirection}
          time={miliseconds} scale={3} positionX={playerPosition[0] - ctx.camera.getOffsetX()} positionY={playerPosition[1] - ctx.camera.getOffsetY()} rotation={0}/>

        {/*Render UI*/}




        {/*<Container x={0} y={0}>
          <Text text="O, dziala!" x={0} y={0} anchor={{ x: 0, y: 0 }} style={mainPixiFont}/>
        </Container>*/}
      </Stage>
    </GameManagerStoreProvider>
  );
};
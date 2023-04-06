import * as PIXI from "pixi.js";
import React, { useEffect, useState } from 'react'
import { useGameManagerStore } from "../game/GameManagerStoreContext";
import { AnimationState, Direction, DirectionHorizontal } from "../globalData/Types";
import AnimationRenderer from "../animation/AnimationData";
import AboveHeadHealthRenderer from "../ui/AboveHeadHealthRenderer";


interface PlayerRendererProps{
  miliseconds: number;
}

export default function PlayerRenderer(props: PlayerRendererProps) {

    const ctx = useGameManagerStore();

    const [buttonLeftPressed, setButtonLeftPressed] = useState(false);
  const [buttonRightPressed, setButtonRightPressed] = useState(false);
  const [buttonUpPressed, setButtonUpPressed] = useState(false);
  const [buttonDownPressed, setButtonDownPressed] = useState(false);
  const [facedDirection, setFacedDirection] = useState<Direction>(Direction.left);
  const [facedSecondaryDirection, setFacedSecondaryDirection] = useState<DirectionHorizontal>(DirectionHorizontal.left);

  const handleUserKeyPressDown = (e: KeyboardEvent) => {
    if (e.code === 'KeyW') { setButtonUpPressed(true); setFacedDirection(Direction.up);}
    if (e.code === 'KeyS') { setButtonDownPressed(true); setFacedDirection(Direction.down);}
    if (e.code === 'KeyA') { setButtonLeftPressed(true); setFacedDirection(Direction.left); setFacedSecondaryDirection(DirectionHorizontal.left);}
    if (e.code === 'KeyD') { setButtonRightPressed(true); setFacedDirection(Direction.right); setFacedSecondaryDirection(DirectionHorizontal.right);}
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

  // TODO: Throw out the trash
  useEffect(() => {
    if(buttonLeftPressed && buttonRightPressed)
    {
      ctx.player.moveUnits(0, 0, ctx.enemyList);
    }
    else if(buttonUpPressed && buttonDownPressed)
    {
      ctx.player.moveUnits(0, 0, ctx.enemyList);
    }
    else if(buttonLeftPressed && buttonDownPressed)
    {
      ctx.player.moveUnits(-1, 1, ctx.enemyList);
    }
    else if(buttonLeftPressed && buttonUpPressed)
    {
      ctx.player.moveUnits(-1, -1, ctx.enemyList);
    }
    else if(buttonRightPressed && buttonDownPressed)
    {
      ctx.player.moveUnits(1, 1, ctx.enemyList);
    }
    else if(buttonRightPressed && buttonUpPressed)
    {
      ctx.player.moveUnits(1, -1, ctx.enemyList);
    }
    else if(buttonDownPressed) {
      ctx.player.moveUnits(0, 1, ctx.enemyList);
    }
    else if(buttonUpPressed){
      ctx.player.moveUnits(0, -1, ctx.enemyList);
    } 
    else if(buttonRightPressed)
    {
      ctx.player.moveUnits(1, 0, ctx.enemyList);
    } 
    else if(buttonLeftPressed){
      ctx.player.moveUnits(-1, 0, ctx.enemyList);
    } 
  }, [props.miliseconds]);

  const [playerPosition, setPlayerPosition] = useState(ctx.player.getPosition());

  useEffect(() => {
    setPlayerPosition([ctx.player.getPositionX(), ctx.player.getPositionY()]);
  }, [props.miliseconds]);

  const [animationState, setAnimationState] = useState(AnimationState.standing);
  useEffect(() => {
    if(buttonDownPressed || buttonLeftPressed || buttonRightPressed || buttonUpPressed) setAnimationState(AnimationState.walking);
    else setAnimationState(AnimationState.standing);
  }, [buttonDownPressed, buttonLeftPressed, buttonRightPressed, buttonUpPressed]);


  const playerOnScreenPositionX = playerPosition[0] - ctx.camera.getOffsetX();
  const playerOnScreenPositionY = playerPosition[1] - ctx.camera.getOffsetY();


  return (
    <>
      <AnimationRenderer animationDataWalking={ctx.player.getAnimationData(AnimationState.walking)}
          animationDataStanding={ctx.player.getAnimationData(AnimationState.standing)}
          animationDataAttacking={ctx.player.getAnimationData(AnimationState.attacking)}
          animationState={animationState} facedDirection={facedDirection} secondaryFacedDirection={facedSecondaryDirection}
          time={props.miliseconds} scale={2} positionX={playerOnScreenPositionX}
          positionY={playerOnScreenPositionY} rotation={0}/>
    </>
  )
}

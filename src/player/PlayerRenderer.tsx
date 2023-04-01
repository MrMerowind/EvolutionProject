import * as PIXI from "pixi.js";
import { Container, Sprite } from '@pixi/react';
import React from 'react'
import Player from './Player';
import { GameCamera } from "../screen/GameCamera";
import { graphicPath } from "../global/GraphicPaths";


// TODO: Change to animation

interface PlayerRendererProps{
    player: Player;
    camera: GameCamera;
}

export default function PlayerRenderer(props: PlayerRendererProps) {

    const positionX = props.player.getPositionX() - props.camera.getOffsetX();
    const positionY = props.player.getPositionY() - props.camera.getOffsetY();
    // TODO: fix error below
    const outfit = graphicPath.player.attack;

    console.log(props.camera);


    //TODO: fill
  return (
    <Container  >
        <Sprite anchor={0.5} x={positionX} y={positionY} image={outfit} scale={props.player.scale} />
    </Container >
  )
}

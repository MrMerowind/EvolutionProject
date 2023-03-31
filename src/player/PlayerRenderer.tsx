import * as PIXI from "pixi.js";
import { Container, Sprite } from '@pixi/react';
import React from 'react'
import Player from './Player';
import { GameCamera } from "../screen/GameCamera";
import { graphicPath } from "../global/GraphicPaths";


// TODO: Change to MobX
interface PlayerRendererProps{
    player: Player;
    camera: GameCamera;
}

export default function PlayerRenderer(props: PlayerRendererProps) {

    const positionX = props.player.GetPositionX() - props.camera.GetOffsetX();
    const positionY = props.player.GetPositionY() - props.camera.GetOffsetY();
    const outfitHair = graphicPath.player.hair[props.player.GetOutfit().GetValues()[0]];
    const outfitHead = graphicPath.player.head[props.player.GetOutfit().GetValues()[0]];
    const outfitBody = graphicPath.player.body[props.player.GetOutfit().GetValues()[0]];

    // TODO: remove
    alert(positionX + ":" + positionY);


    //TODO: fill
  return (
    <Container  >
        <Sprite anchor={0.5} x={positionX} y={positionY} image={outfitBody} scale={props.player.scale} />
        <Sprite anchor={0.5} x={positionX} y={positionY} image={outfitHead} scale={props.player.scale} />
        <Sprite anchor={0.5} x={positionX} y={positionY} image={outfitHair} scale={props.player.scale} />
    </Container >
  )
}

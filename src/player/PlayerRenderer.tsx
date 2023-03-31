import * as PIXI from "pixi.js";
import { Container, Sprite } from '@pixi/react';
import React from 'react'
import Player from './Player';


// TODO: Change to MobX
interface PlayerRendererProps{
    player: Player;
}

export default function PlayerRenderer(props: PlayerRendererProps) {

    //TODO: fill
  return (
    <Container  >
        <Sprite anchor={0.5} x={-75} y={-75} image={props.player.GetOutfit().GetValues()[0].toString()} />
        <Sprite anchor={0.5} x={0} y={0} image={props.player.GetOutfit().GetValues()[1].toString()} />
        <Sprite anchor={0.5} x={75} y={75} image={props.player.GetOutfit().GetValues()[2].toString()} />
    </Container >
  )
}

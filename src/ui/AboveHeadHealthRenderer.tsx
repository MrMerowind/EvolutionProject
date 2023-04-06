import * as PIXI from "pixi.js";
import { Sprite } from "@pixi/react";
import React from 'react'
import { useGameManagerStore } from '../game/GameManagerStoreContext';

interface AboveHeadRendererProps
{
    percentage: number;
    positionX: number;
    positionY: number;
    heightOffset: number;
    player: boolean;
}

export default function AboveHeadHealthRenderer(props: AboveHeadRendererProps) {

    const ctx = useGameManagerStore();

    const imageRef = ctx.userInterfaceData.getHpTexture();

    let percentageCopy = props.percentage;

    if(imageRef === null) return null;
    if(percentageCopy <= 0) percentageCopy = 0;
    if(percentageCopy > 100) percentageCopy = 100;


    const cutRegion = new PIXI.Rectangle(0, 0, imageRef.width * percentageCopy / 100.0, imageRef.height);
    const cutTexture = new PIXI.Texture(imageRef, cutRegion);

  return (
    <>
        <Sprite texture={cutTexture} width={imageRef.width * percentageCopy / 100.0 * ctx.userInterfaceData.getAboveHeadHpScale()}
            height={imageRef.height * ctx.userInterfaceData.getAboveHeadHpScale() * (props.player ? 3 : 1)}
             x={props.positionX} y={props.positionY - props.heightOffset} rotation={0} anchor={[0.5,1]} />
    </>
  )
}

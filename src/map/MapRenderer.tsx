import * as PIXI from "pixi.js";
import { Sprite } from "@pixi/react";
import React from 'react'
import { useGameManagerStore } from "../game/GameManagerStoreContext";


export default function MapRenderer() {
  
    const ctx = useGameManagerStore();

    if(ctx.map.textures[ctx.map.level - 1] === null) return null;
  
    const imageRef = ctx.map.textures[ctx.map.level - 1];
    const cutRegion = new PIXI.Rectangle(0, 0, 512, 512);
    const cutTexture = new PIXI.Texture(imageRef, cutRegion);

    return (
    <Sprite texture={cutTexture} width={ctx.map.textureWidth} height={ctx.map.textureHeight} scale={1}
     x={0 - ctx.camera.getOffsetX()} y={0 - ctx.camera.getOffsetY()} rotation={0} anchor={0}/>
  )
}

import * as PIXI from "pixi.js";
import { Sprite } from "@pixi/react";
import React from 'react'
import { useGameManagerStore } from "../game/GameManagerStoreContext";


export default function MapRenderer() {
  
    const ctx = useGameManagerStore();
  
    const imageRef = ctx.map.textures.get(ctx.map.level);
    if(imageRef === undefined) return null;
    const cutRegion = new PIXI.Rectangle(0, 0, ctx.map.textureWidth, ctx.map.textureHeight);
    const cutTexture = new PIXI.Texture(imageRef, cutRegion);

    const [screenWidth, screenHeight] = ctx.screen.getSize();

    const repeatHorizontaly = Math.floor(screenWidth / ctx.map.textureWidth) + 3;
    const repeatVerticaly = Math.floor(screenHeight / ctx.map.textureHeight) + 3;

    let array: Array<[x:number, y: number, k: number]> = new Array(repeatHorizontaly * repeatVerticaly);

    for(let i = -1; i < repeatHorizontaly; i++)
    {
        for(let j = -1; j < repeatVerticaly; j++)
        {
            array.push([i * ctx.map.textureWidth - 0 - ctx.camera.getOffsetX() % ctx.map.textureWidth,
                j * ctx.map.textureHeight - 0 - ctx.camera.getOffsetY() % ctx.map.textureHeight,
            (i + 1) * repeatHorizontaly + (j + 1)]);
        }
    }

    return (
        <>{array.map((p) =>
            <Sprite key={p[2]} texture={cutTexture} width={ctx.map.textureWidth} height={ctx.map.textureHeight} scale={1}
                x={p[0]} y={p[1]} rotation={0} anchor={0}/>
        )}</>
  )
}

import { Texture, Rectangle} from "pixi.js";
import { Sprite } from "@pixi/react";
import React from "react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";

export default function MapComponent() {
  
    const ctx = useGameManagerStore();
  
    const imageRef = ctx.map.textures.get(ctx.map.level);
    if(imageRef === undefined) return null;
    const cutRegionStartX = 0;
    const cutRegionStartY = 0;
    const cutRegion = new Rectangle(cutRegionStartX, cutRegionStartY, ctx.map.textureWidth, ctx.map.textureHeight);
    const cutTexture = new Texture(imageRef, cutRegion);

    const [screenWidth, screenHeight] = ctx.screen.getSize();

    const aboveOnScreenTilesQuantity = 3;

    const repeatHorizontaly = Math.floor(screenWidth / ctx.map.textureWidth) + aboveOnScreenTilesQuantity;
    const repeatVerticaly = Math.floor(screenHeight / ctx.map.textureHeight) + aboveOnScreenTilesQuantity;

    const arrayOfPositionAndKey: Array<[x:number, y: number, k: number]> = new Array(repeatHorizontaly * repeatVerticaly);

    for(let i = -1; i < repeatHorizontaly; i++)
    {
        for(let j = -1; j < repeatVerticaly; j++)
        {
            const mapChunkPositionX = i * ctx.map.textureWidth - ctx.camera.getOffsetX() % ctx.map.textureWidth;
            const mapChunkPositionY = j * ctx.map.textureHeight - ctx.camera.getOffsetY() % ctx.map.textureHeight;
            const indexOffset = 1;
            const keyValue = (i + indexOffset) * repeatHorizontaly + (j + indexOffset);
            arrayOfPositionAndKey.push([mapChunkPositionX, mapChunkPositionY, keyValue]);
        }
    }

    return (
        <>{arrayOfPositionAndKey.map(([x,y,keyValue]) =>
            <Sprite key={keyValue.toString()} texture={cutTexture} width={ctx.map.textureWidth} height={ctx.map.textureHeight} scale={1}
                x={x} y={y} rotation={0} anchor={0}/>
        )}</>
    );
}

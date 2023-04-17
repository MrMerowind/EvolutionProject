/* eslint-disable react/jsx-key */
import React from "react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import { Rectangle, Texture } from "pixi.js";
import { Sprite } from "@pixi/react";

export default function MapSelectComponent() {

    const ctx = useGameManagerStore();

    const imageRefBackground = ctx.mapSelect.getBackground();

    if(imageRefBackground === null) return null;

    const cutRegionBackground = new Rectangle(0, 0, imageRefBackground.width, imageRefBackground.height);
    
    const cutTextureBackground = new Texture(imageRefBackground, cutRegionBackground);

    const arrayOfMapId: number[] = [];
    for(let i = 1; i <= ctx.map.levelCount; i++)
    {
        arrayOfMapId.push(i);
    }

    function selectMap(value: number)
    {
        ctx.map.level = value;
    }

    function markSelect(value: number)
    {
        ctx.mapSelect.markedMap = value;
    }

    return (
        <>
            <Sprite texture={cutTextureBackground} width={imageRefBackground.width} height={imageRefBackground.height}
                x={ctx.screen.getCenterHorizontal()} y={ctx.screen.getCenterVertical()} rotation={0} anchor={[0.5,0.5]} />
            
            {arrayOfMapId.map(id => {
                const imageRef = ctx.map.textures.get(id);
                if(!imageRef) return;
                const region = new Rectangle(0, 0, imageRef.width, imageRef.height);
                const cutTexture = new Texture(imageRef, region);
                const scale = 0.17;
                let secondScale = 0.17;
                if(ctx.mapSelect.markedMap === id)
                {
                    secondScale = 0.14;
                }
                let finalWidth = imageRef.width * scale;
                let finalHeight = imageRef.height * scale;

                const finalPositionX = (Math.floor((id - 1) % 4) - 1.5) * finalWidth + ctx.screen.getCenterHorizontal();
                const finalPositionY = (Math.floor((id - 1) / 4) - 1) * finalHeight + ctx.screen.getCenterVertical();

                finalWidth = imageRef.width * secondScale;
                finalHeight = imageRef.height * secondScale;

                return (
                    <Sprite texture={cutTexture} width={finalWidth} height={finalHeight}
                        x={finalPositionX} y={finalPositionY} rotation={0} anchor={[0.5,0.5]} key={id}
                        interactive={true}
                        pointerdown={() => {
                            selectMap(id);
                        }} mouseover={() => {markSelect(id);} }/>);
            })}
        </>
    );
}

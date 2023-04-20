/* eslint-disable react/jsx-no-undef */
import React from "react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import { Rectangle, Texture } from "pixi.js";
import { Sprite, Text } from "@pixi/react";
import { mapLevel } from "../utils/Fonts";

export default function MapSelectComponent() {

    const ctx = useGameManagerStore();

    const imageRefBackground = ctx.mapSelect.getBackground();

    if(imageRefBackground === null) return null;

    const cutRegionStartX = 0;
    const cutRegionStartY = 0;
    const cutRegionBackground = new Rectangle(cutRegionStartX, cutRegionStartY, imageRefBackground.width, imageRefBackground.height);
    
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

    const anchorX = 0.5;
    const anchorY = 0.5;

    return (
        <>
            <Sprite texture={cutTextureBackground} width={imageRefBackground.width} height={imageRefBackground.height}
                x={ctx.screen.getCenterHorizontal()} y={ctx.screen.getCenterVertical()} rotation={0} anchor={[anchorX, anchorY]} />
            
            {arrayOfMapId.map(id => {
                const imageRef = ctx.map.textures.get(id);
                if(!imageRef) return;
                const region = new Rectangle(cutRegionStartX, cutRegionStartY, imageRef.width, imageRef.height);
                const cutTexture = new Texture(imageRef, region);
                const scale = 0.17;
                const scaleOfSmallerSizeButton = 0.14;
                let secondScale = 0.17;
                if(ctx.mapSelect.markedMap === id)
                {
                    secondScale = scaleOfSmallerSizeButton;
                }
                let finalWidth = imageRef.width * scale;
                let finalHeight = imageRef.height * scale;

                const positioningIndex= 1;
                const row = 4;
                const collumn = 4;
                const horizontalOffset = 1.5;
                const verticalOffset = 1;

                const finalPositionX = (Math.floor((id - positioningIndex) % row) - horizontalOffset) * finalWidth + ctx.screen.getCenterHorizontal();
                const finalPositionY = (Math.floor((id - positioningIndex) / collumn) - verticalOffset) * finalHeight + ctx.screen.getCenterVertical();

                finalWidth = imageRef.width * secondScale;
                finalHeight = imageRef.height * secondScale;

                return (
                    <>
                        <Sprite texture={cutTexture} width={finalWidth} height={finalHeight}
                            x={finalPositionX} y={finalPositionY} rotation={0} anchor={[anchorX, anchorY]} key={id.toString()}
                            interactive={true}
                            pointerdown={() => {
                                selectMap(id);
                            }} mouseover={() => {markSelect(id);} }/>
                        <Text text={id.toString()} anchor={0.5} x={finalPositionX} y={finalPositionY} style={mapLevel} key={id.toString() + "text"}/>
                    </>);
            })}
        </>
    );
}

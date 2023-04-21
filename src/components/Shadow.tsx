import { Sprite } from "@pixi/react";
import React from "react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import { Rectangle, Texture } from "pixi.js";

interface ShadowProps{
    positionX: number;
    positionY: number;
    scale: number;
    anchorY: number;
}

export default function Shadow(props: ShadowProps) {

    const ctx = useGameManagerStore();

    const imageRef = ctx.shadowData.getGraphic();
    if(!imageRef) return null;
    const cutRegionStartX = 0;
    const cutRegionStartY = 0;
    const cutRegion = new Rectangle(cutRegionStartX, cutRegionStartY, imageRef.width, imageRef.height);
    const cutTexture = new Texture(imageRef, cutRegion);

    const anchorX = 0.5;
    const anchorY = props.anchorY;

    return (
        <>
            <Sprite texture={cutTexture} width={imageRef.width} height={imageRef.height} scale={props.scale}
                x={props.positionX} y={props.positionY} rotation={0} anchor={[anchorX, anchorY]}/>
        </>
    );
}

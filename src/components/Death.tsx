/* eslint-disable react/jsx-no-undef */
import React from "react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import { Rectangle, Texture } from "pixi.js";
import { Sprite } from "@pixi/react";

interface DeathComponentProps{
    time: number;
    positionX: number;
    positionY: number;
}

export default function DeathComponent(props: DeathComponentProps) {

    const ctx = useGameManagerStore();

    const anim = ctx.enemyList.getDeathAnimationData().getAnimation();

    if(anim.imageRef === null) return null;
    
    const graphicWidth = anim.graphicWidth / anim.horizontalFrames;
    const graphicHeight = anim.graphicHeight / anim.verticalFrames;
    
    // To create animated sprite you need separate images so it has to be cut anyway.
    const aFIS = anim.animationFrameIndexStart;
    const aFIE = anim.animationFrameIndexEnd;
    const aFT = anim.animationFrameTime;

    const one = 1;
    const frameNumber = Math.floor(props.time / aFT) % Math.floor(aFIE - aFIS + one) + aFIS;

    const graphicPositionX = (frameNumber % anim.horizontalFrames) * graphicWidth;
    
    const graphicPositionY = Math.floor((frameNumber - Math.floor(frameNumber % anim.horizontalFrames))
    / anim.horizontalFrames) * graphicHeight;

    const imageRef = anim.imageRef;

    // Cutting region here because scale affects also scale of cutting area :c
    // So it only works with scale 1
    const cutRegion = new Rectangle(graphicPositionX, graphicPositionY, graphicWidth, graphicHeight);
    const cutTexture = new Texture(imageRef, cutRegion);

    const graphicWidthOnScreen = (graphicWidth);
    const graphicHeightOnScreen = (graphicHeight);

    return (
        <>
            <Sprite texture={cutTexture} width={graphicWidthOnScreen} height={graphicHeightOnScreen} scale={1}
                x={props.positionX} y={props.positionY} rotation={0} anchor={0.5} />
        </>
    );
}

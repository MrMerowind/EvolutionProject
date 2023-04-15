import React from "react";
import { SkillBase } from "../utils/SkillBase";
import { Rectangle, Texture } from "pixi.js";
import { Sprite } from "@pixi/react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import { AnimationComponent } from "./AnimationComponent";


interface SkillComponentProps{
    skillData: SkillBase;
    miliseconds: number;
}

export default function SkillComponent(props: SkillComponentProps) {

    const ctx = useGameManagerStore();

    // Getting nearest enemy
    const skillPositionX = props.skillData.getPosition()[0];
    const skillPositionY = props.skillData.getPosition()[1];

    const nearestEnemy = ctx.enemyList.getNearest(skillPositionX, skillPositionY);

    // Skill following enemy
    // TODO: Test second part of if
    if(nearestEnemy !== null && props.skillData.skillName !== "Arrow" && props.skillData.skillName !== "Sunburn" && props.skillData.skillName !== "Ice")
    {
        props.skillData.setDestination(...nearestEnemy.getPosition());
    }

    const imageRef = props.skillData.getSkillAnimation().getAnimation().imageRef;

    if(imageRef === null) return null;

    
    const graphicWidth = props.skillData.getSkillAnimation().getAnimation().graphicWidth / props.skillData.getSkillAnimation().getAnimation().horizontalFrames;
    const graphicHeight = props.skillData.getSkillAnimation().getAnimation().graphicHeight / props.skillData.getSkillAnimation().getAnimation().verticalFrames;
    
    // To create animated sprite you need separate images so it has to be cut anyway.
    const aFIS = props.skillData.getSkillAnimation().getAnimation().animationFrameIndexStart;
    const aFIE = props.skillData.getSkillAnimation().getAnimation().animationFrameIndexEnd;
    const aFT = props.skillData.getSkillAnimation().getAnimation().animationFrameTime;

    const frameNumber = Math.floor(props.miliseconds / aFT) % Math.floor(aFIE - aFIS + 1) + aFIS;

    const graphicPositionX = (frameNumber % props.skillData.getSkillAnimation().getAnimation().horizontalFrames) * graphicWidth;
    
    const graphicPositionY = Math.floor((frameNumber - Math.floor(frameNumber % props.skillData.getSkillAnimation().getAnimation().horizontalFrames))
    / props.skillData.getSkillAnimation().getAnimation().horizontalFrames) * graphicHeight;


    // Cutting region here because scale affects also scale of cutting area :c
    // So it only works with scale 1
    const cutRegion = new Rectangle(graphicPositionX, graphicPositionY, graphicWidth, graphicHeight);
    const cutTexture = new Texture(imageRef, cutRegion);

    const finalPositionX = skillPositionX - ctx.camera.getOffsetX();
    const finalPositionY = skillPositionY - ctx.camera.getOffsetY();

    const finalWidth = graphicWidth * props.skillData.scale;
    const finalHeight = graphicHeight * props.skillData.scale;

    return (
        <>
            <Sprite texture={cutTexture} width={finalWidth} height={finalHeight} scale={props.skillData.scale}
                x={finalPositionX} y={finalPositionY} rotation={props.skillData.getRotation()} anchor={[props.skillData.anchorX, props.skillData.anchorY]} />
        </>
    );
}

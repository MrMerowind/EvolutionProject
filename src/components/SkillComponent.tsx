import React from "react";
import { SkillBase } from "../utils/SkillBase";
import { Rectangle, Texture } from "pixi.js";
import { Sprite } from "@pixi/react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";


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
    if(nearestEnemy !== null)
    {
        props.skillData.setDestination(...nearestEnemy.getPosition());
    }

    const imageRef = props.skillData.getSkillAnimation().getAnimation().imageRef;

    if(imageRef === null) return null;

    
    const cutRegion = new Rectangle(0, 0, imageRef.width, imageRef.height);
    const cutTexture = new Texture(imageRef, cutRegion);

    const positionOnScreenX = props.skillData.getPosition()[0] - ctx.camera.getOffsetX();
    const positionOnScreenY = props.skillData.getPosition()[1] - ctx.camera.getOffsetY();
    const finalWidth = imageRef.width * props.skillData.scale;
    const finalHeight = imageRef.height * props.skillData.scale;

    return (
        <>
            <Sprite texture={cutTexture} width={finalWidth} height={finalHeight} scale={props.skillData.scale}
                x={positionOnScreenX} y={positionOnScreenY} rotation={props.skillData.getRotation()} anchor={[props.skillData.anchorX, props.skillData.anchorY]} />
        </>
    );
}

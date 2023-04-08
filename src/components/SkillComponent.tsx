import React from "react";
import { SkillBase } from "../utils/SkillBase";
import { Rectangle, Texture } from "pixi.js";
import { Sprite, useTick } from "@pixi/react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";


interface SkillComponentProps{
    skillData: SkillBase;
    miliseconds: number;
}

export default function SkillComponent(props: SkillComponentProps) {

    const ctx = useGameManagerStore();

    useTick((delta) => {

        // Getting nearest enemy
        const skillPositionX = props.skillData.getPositionX();
        const skillPositionY = props.skillData.getPositionY();

        const nearestEnemy = ctx.enemyList.getNearest(skillPositionX, skillPositionY);

        if(nearestEnemy) props.skillData.setDestination(...nearestEnemy.getPosition());

        props.skillData.moveUnit(delta);
    });

    const imageRef = props.skillData.getSkillAnimation().getAnimation().imageRef;

    if(imageRef === null) return null;

    
    const cutRegion = new Rectangle(0, 0, imageRef.width, imageRef.height);
    const cutTexture = new Texture(imageRef, cutRegion);

    const positionOnScreenX = props.skillData.getPositionX() - ctx.camera.getOffsetX();
    const positionOnScreenY = props.skillData.getPositionY() - ctx.camera.getOffsetY();
    const finalWidth = imageRef.width * props.skillData.getScale();
    const finalHeight = imageRef.height * props.skillData.getScale();

    return (
        <>
            <Sprite texture={cutTexture} width={finalWidth} height={finalHeight} scale={props.skillData.getScale()}
                x={positionOnScreenX} y={positionOnScreenY} rotation={props.skillData.getAngle()} anchor={props.skillData.getAnchor()} />
        </>
    );
}

import { Texture, Rectangle, BaseTexture} from "pixi.js";
import { Sprite } from "@pixi/react";
import React from "react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";

interface AboveHeadComponentProps
{
    percentage: number;
    positionX: number;
    positionY: number;
    heightOffset: number;
    player: boolean;
}

export default function AboveHeadHealthComponent(props: AboveHeadComponentProps) {

    const ctx = useGameManagerStore();

    let imageRef: BaseTexture | null;

    if(props.player)
    {
        imageRef = ctx.userInterfaceData.getPlayerHpTexture();
    }
    else {
        imageRef = ctx.userInterfaceData.getHpTexture();
    }

    let percentageCopy = props.percentage;

    if(imageRef === null) return null;
    const minimumPercentage = 0;
    const maximumPercentage = 100;
    if(percentageCopy <= minimumPercentage) percentageCopy = minimumPercentage;
    if(percentageCopy >= maximumPercentage) return null;

    const startRegionX = 0;
    const startRegionY = 0;

    const cutRegion = new Rectangle(startRegionX, startRegionY, imageRef.width, imageRef.height);
    const cutTexture = new Texture(imageRef, cutRegion);

    const barOnScreenPositionX = props.positionX;
    const barOnScreenPositionY = props.positionY - props.heightOffset;

    const healthBarWidth = imageRef.width * percentageCopy / maximumPercentage * ctx.userInterfaceData.getAboveHeadHpScale();
    const healthBarHeight = imageRef.height * ctx.userInterfaceData.getAboveHeadHpScale();

    const anchorX = 0.5;
    const anchorY = 1;

    return (
        <>
            <Sprite texture={cutTexture} width={healthBarWidth}
                height={healthBarHeight}
                x={barOnScreenPositionX} y={barOnScreenPositionY} rotation={0} anchor={[anchorX, anchorY]} />
        </>
    );
}

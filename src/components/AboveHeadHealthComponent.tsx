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
    if(percentageCopy <= 0) percentageCopy = 0;
    if(percentageCopy >= 100) return null;

    const cutRegion = new Rectangle(0, 0, imageRef.width, imageRef.height);
    const cutTexture = new Texture(imageRef, cutRegion);

    const barOnScreenPositionX = props.positionX;
    const barOnScreenPositionY = props.positionY - props.heightOffset;

    return (
        <>
            <Sprite texture={cutTexture} width={imageRef.width * percentageCopy / 100.0 * ctx.userInterfaceData.getAboveHeadHpScale()}
                height={imageRef.height * ctx.userInterfaceData.getAboveHeadHpScale()}
                x={barOnScreenPositionX} y={barOnScreenPositionY} rotation={0} anchor={[0.5,1]} />
        </>
    );
}

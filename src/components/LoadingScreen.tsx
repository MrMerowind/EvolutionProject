/* eslint-disable react/react-in-jsx-scope */
import { Texture, Rectangle, BaseTexture} from "pixi.js";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import { AnimatedSprite, Container, Text } from "@pixi/react";
import { LoadingInfoFont } from "../data/fonts";
import { useState } from "react";
import { loadingAniamtionLength } from "../utils/loadingScreen";

export function LoadingScreenComponent() {

    const firstFrame = 0;

    const ctx = useGameManagerStore();

    if(!ctx.loadingScreen._isAllLoaded) return null;

    const imageRef: Array<BaseTexture> = ctx.loadingScreen.texture;

    if(imageRef === null) return null;

    const cutRegionStartX = 0;
    const cutRegionStartY = 0;
    const cutRegionEndX = 1792;
    const cutRegionEndY = 1024;

    const cutRegion = new Rectangle(cutRegionStartX, cutRegionStartY, cutRegionEndX, cutRegionEndY);
    const cutTexture: Array<Texture> = new Array<Texture>(loadingAniamtionLength);

    imageRef.forEach((image, index) => cutTexture[index] = new Texture(image, cutRegion));

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <>
            <AnimatedSprite
                anchor={0}
                textures={cutTexture}
                isPlaying={true}
                initialFrame={0}
                animationSpeed={1}
                width={ctx.screen.getWidth()}
                height={ctx.screen.getHeight()}
            />
            <Text
                text="Loading..."
                anchor={0.5}
                x={ctx.screen.getCenterHorizontal()}
                y={ctx.screen.getCenterVertical()}
                style={LoadingInfoFont}
            />
        </>
    );
}

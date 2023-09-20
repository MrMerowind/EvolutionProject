/* eslint-disable react/react-in-jsx-scope */
import { Texture, Rectangle, BaseTexture} from "pixi.js";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import { AnimatedSprite, Container, Sprite, Text } from "@pixi/react";
import { LoadingInfoFont } from "../data/fonts";
import { useState } from "react";
import { loadingAniamtionLength } from "../utils/loadingScreen";

export function LoadingScreenComponent() {

    const firstFrame = 0;

    const ctx = useGameManagerStore();

    if(!ctx.loadingScreen._isAllLoaded) return null;

    const imageRef  = ctx.loadingScreen.texture;

    if(imageRef === null) return null;

    const cutRegionStartX = 0;
    const cutRegionStartY = 0;
    const cutRegionEndX = 1792;
    const cutRegionEndY = 1024;

    const cutRegion = new Rectangle(cutRegionStartX, cutRegionStartY, cutRegionEndX, cutRegionEndY);
    const cutTexture = new Texture(imageRef, cutRegion);

    const textLoadingAnchorX = 0.5;
    const textLoadingAnchorY = 1;

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <>
            <Sprite
                anchor={0}
                texture={cutTexture}
                width={ctx.screen.getWidth()}
                height={ctx.screen.getHeight()}
            />
            <Text
                text="Loading..."
                anchor={[textLoadingAnchorX, textLoadingAnchorY]}
                x={ctx.screen.getCenterHorizontal()}
                y={ctx.screen.getHeight()}
                style={LoadingInfoFont}
            />
        </>
    );
}

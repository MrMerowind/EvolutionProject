/* eslint-disable react/react-in-jsx-scope */
import { Texture, Rectangle} from "pixi.js";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import { Sprite, Text } from "@pixi/react";
import { LoadingInfoFont, screenTooSmallFont } from "../data/fonts";

export function ScreenIsTooSmallComponent() {

    const ctx = useGameManagerStore();

    if(!ctx.loadingScreen.isLoadedSmallScreen) return null;

    const imageRef = ctx.loadingScreen.textureSmallScreen;

    if(imageRef === null) return null;

    const cutRegionStartX = 0;
    const cutRegionStartY = 0;

    const cutRegion = new Rectangle(cutRegionStartX, cutRegionStartY, imageRef.width, imageRef.height);
    const cutTexture = new Texture(imageRef, cutRegion);

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <>
            <Sprite texture={cutTexture} width={ctx.screen.getWidth()} height={ctx.screen.getHeight()} x={0} y={0} rotation={0} anchor={0} />
            <Text
                text="Screen size minimum is 1000x800
                Ekran musi mieć minimalne wymiary 1000x800
                Die Mindestbildschirmgröße beträgt 1000 x 800"
                anchor={0.5}
                x={ctx.screen.getCenterHorizontal()}
                y={ctx.screen.getCenterVertical()}
                style={screenTooSmallFont}
            />
        </>
    );
}

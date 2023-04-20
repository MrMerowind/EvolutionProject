import { Texture, Rectangle} from "pixi.js";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import { Sprite } from "@pixi/react";

export function LoadingScreenComponent() {

    const ctx = useGameManagerStore();


    if(!ctx.loadingScreen.isLoaded) return null;

    const imageRef = ctx.loadingScreen.texture;

    if(imageRef === null) return null;

    const cutRegion = new Rectangle(0, 0, imageRef.width, imageRef.height);
    const cutTexture = new Texture(imageRef, cutRegion);


    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <Sprite texture={cutTexture} width={ctx.screen.getWidth()} height={ctx.screen.getHeight()} x={0} y={0} rotation={0} anchor={0} />
    );
}

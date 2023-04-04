import * as PIXI from "pixi.js";
import { useGameManagerStore } from "../game/GameManagerStoreContext";
import { Sprite } from "@pixi/react";

export function LoadingScreenRenderer() {

  const ctx = useGameManagerStore();


  if(!ctx.loadingScreen.isLoaded) return null;

  const imageRef = ctx.loadingScreen.texture;
  const cutRegion = new PIXI.Rectangle(0, 0, imageRef!.width, imageRef!.height);
  const cutTexture = new PIXI.Texture(imageRef!, cutRegion);


  return (
    <Sprite texture={cutTexture} width={ctx.screen.getWidth()} height={ctx.screen.getHeight()} x={0} y={0} rotation={0} anchor={0} />
  );
}

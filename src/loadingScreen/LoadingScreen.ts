import * as PIXI from "pixi.js";

export default class LoadingScreen{
    texture: PIXI.BaseTexture | null;
    isLoaded: boolean;
    constructor()
    {
        this.texture = null;
        this.isLoaded = false;
    }
}
import { BaseTexture } from "pixi.js";

export default class LoadingScreen{
    texture: BaseTexture | null;
    isLoaded: boolean;
    constructor()
    {
        this.texture = null;
        this.isLoaded = false;
    }
}
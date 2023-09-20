import { BaseTexture } from "pixi.js";

export const loadingAniamtionLength = 9;

export default class LoadingScreen{
    texture: BaseTexture | null;
    textureSmallScreen: BaseTexture | null;
    isLoaded: boolean;
    isLoadedSmallScreen: boolean;

    _isAllLoaded: boolean;
    constructor()
    {
        this.texture = null;
        this._isAllLoaded = false;
        this.isLoaded = false;
        this.textureSmallScreen = null;
        this.isLoadedSmallScreen = false;
    }
}
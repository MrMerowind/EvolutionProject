import { BaseTexture } from "pixi.js";

export const loadingAniamtionLength = 9;

export default class LoadingScreen{
    texture: Array<BaseTexture> = new Array<BaseTexture>(loadingAniamtionLength);
    textureSmallScreen: BaseTexture | null;
    isLoaded: Array<boolean> = new Array<boolean>(loadingAniamtionLength);
    isLoadedSmallScreen: boolean;

    _isAllLoaded: boolean;

    isAllLoaded() {
        if(this._isAllLoaded) return true;
        else
        {
            for(let i = 0; i < this.isLoaded.length; i++)
            {
                if(this.isLoaded[i] === false) return false;
            }
            this._isAllLoaded = true;
            return true;
        }
    }
    constructor()
    {
        this._isAllLoaded = false;
        this.textureSmallScreen = null;
        for(let i = 0; i < this.isLoaded.length; i++)
        {
            this.isLoaded[i] = false;
        }
        this.isLoadedSmallScreen = false;
    }
}
import { BaseTexture } from "pixi.js";

export default class UserInterfaceData{
    private hpTexture: BaseTexture | null;
    private hpPlayerTexture: BaseTexture | null;
    private aboveHeadHpScale = 0.2;
    
    constructor()
    {
        this.hpTexture = null;
        this.hpPlayerTexture = null;
    }
    public setHpTexture(value: BaseTexture)
    {
        this.hpTexture = value;
    }
    public setPlayerHpTexture(value: BaseTexture)
    {
        this.hpPlayerTexture = value;
    }
    public getHpTexture()
    {
        return this.hpTexture;
    }
    public getPlayerHpTexture()
    {
        return this.hpPlayerTexture;
    }
    public getAboveHeadHpScale(): number
    {
        return this.aboveHeadHpScale;
    }
}
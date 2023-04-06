import * as PIXI from "pixi.js";

export default class UserInterfaceData{
    private hpTexture: PIXI.BaseTexture | null;
    private hpPlayerTexture: PIXI.BaseTexture | null;
    private aboveHeadHpScale = 0.2;
    
    constructor()
    {
        this.hpTexture = null;
        this.hpPlayerTexture = null;
    }
    public setHpTexture(value: PIXI.BaseTexture)
    {
        this.hpTexture = value;
    }
    public setPlayerHpTexture(value: PIXI.BaseTexture)
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
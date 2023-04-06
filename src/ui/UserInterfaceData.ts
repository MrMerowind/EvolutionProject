import * as PIXI from "pixi.js";

export default class UserInterfaceData{
    private hpTexture: PIXI.BaseTexture | null;
    private aboveHeadHpScale = 0.3;
    
    constructor()
    {
        this.hpTexture = null;
    }
    public setHpTexture(value: PIXI.BaseTexture)
    {
        this.hpTexture = value;
    }
    public getHpTexture()
    {
        return this.hpTexture;
    }
    public getAboveHeadHpScale(): number
    {
        return this.aboveHeadHpScale;
    }
}
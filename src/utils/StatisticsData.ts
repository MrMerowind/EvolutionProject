import { BaseTexture } from "pixi.js";

export class StatisticsData {
    private healthOverlay: BaseTexture | null;
    private cornerOverlay: BaseTexture | null;
    private healthBar: BaseTexture | null;
    private experienceBar: BaseTexture | null;
    private button: BaseTexture | null;

    constructor()
    {
        this.healthOverlay = null;
        this.cornerOverlay = null;
        this.healthBar = null;
        this.experienceBar = null;
        this.button = null;
    }

    public getHealthOverlay()
    {
        return this.healthOverlay;
    }

    public getHealthBar()
    {
        return this.healthBar;
    }

    public getExpBar()
    {
        return this.experienceBar;
    }

    public getButton()
    {
        return this.button;
    }


    getCornerOverlay()
    {
        return this.cornerOverlay;
    }

    public setHealthOverlay(texture: BaseTexture)
    {
        this.healthOverlay = texture;
    }
    public setCornerOverlay(texture: BaseTexture)
    {
        this.cornerOverlay = texture;
    }
    public setHealthBar(texture: BaseTexture)
    {
        this.healthBar = texture;
    }
    public setExpBar(texture: BaseTexture)
    {
        this.experienceBar = texture;
    }
    public setButton(texture: BaseTexture)
    {
        this.button = texture;
    }
}
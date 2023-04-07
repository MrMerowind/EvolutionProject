import { BaseTexture } from "pixi.js";

export class StatisticsData {
    private healthOverlay: BaseTexture | null;
    private cornerOverlay: BaseTexture | null;
    private healthBar: BaseTexture | null;
    private experienceBar: BaseTexture | null;

    constructor()
    {
        this.healthOverlay = null;
        this.cornerOverlay = null;
        this.healthBar = null;
        this.experienceBar = null;
    }

    getHealthOverlay()
    {
        return this.healthOverlay;
    }

    getHealthBar()
    {
        return this.healthBar;
    }

    getExpBar()
    {
        return this.experienceBar;
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
}
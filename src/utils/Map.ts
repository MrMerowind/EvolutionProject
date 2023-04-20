import { BaseTexture } from "pixi.js";

export default class GameMap{
    public level: number;
    public textures: Map<number, BaseTexture>;
    readonly textureWidth;
    readonly textureHeight;
    readonly levelCount;
    constructor()
    {
        this.level = 0;
        this.textures = new Map<number, BaseTexture>();
        this.textureWidth = 512;
        this.textureHeight = 512;
        this.levelCount = 12;
    }
    public previousLevel()
    {
        const minimumLevel = 1;
        if(this.level > minimumLevel) this.level--;
    }
    public nextLevel()
    {
        if(this.level < this.levelCount) this.level++;

    }
}
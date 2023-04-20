import { BaseTexture } from "pixi.js";


export default class GameMap{
    public level: number;
    public textures: Map<number, BaseTexture>;
    readonly textureWidth = 512;
    readonly textureHeight = 512;
    readonly levelCount = 12;
    constructor()
    {
        this.level = 0;
        this.textures = new Map<number, BaseTexture>();
    }
    public previousLevel()
    {
        if(this.level > 1) this.level--;
    }
    public nextLevel()
    {
        if(this.level < this.levelCount) this.level++;

    }
}
import * as PIXI from "pixi.js";


export default class GameMap{
    level: number;
    textures: Array<PIXI.BaseTexture>;
    readonly textureWidth = 512;
    readonly textureHeight = 512;
    readonly levelCount = 12;
    constructor()
    {
        this.level = 1;
        this.textures = new Array<PIXI.BaseTexture>(this.levelCount);
    }
}
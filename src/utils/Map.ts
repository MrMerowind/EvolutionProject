import { BaseTexture} from "pixi.js";


export default class GameMap{
    level: number;
    textures: Map<number, BaseTexture>;
    readonly textureWidth = 512;
    readonly textureHeight = 512;
    readonly levelCount = 12;
    constructor()
    {
        this.level = 1;
        this.textures = new Map<number, BaseTexture>();
    }
}
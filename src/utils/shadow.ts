import { BaseTexture } from "pixi.js";

export default class Shadow{
    private graphic: BaseTexture | null = null;
    public getGraphic()
    {
        return this.graphic;
    }
    public setGraphic(texture: BaseTexture)
    {
        this.graphic = texture;
    }
}
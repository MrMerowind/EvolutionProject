import { BaseTexture } from "pixi.js";

export default class MapSelect
{
    private background: BaseTexture | null = null;
    public markedMap = 0;
    public getBackground()
    {
        return this.background;
    }
    public setBackground(texture: BaseTexture)
    {
        this.background = texture;
    }
}
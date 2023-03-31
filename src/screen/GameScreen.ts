const defaultGameScreenSize = {
    width: 800,
    height: 600
}

export class GameScreen{
    private width: number;
    private height: number;

    constructor()
    {
        this.width = defaultGameScreenSize.width;
        this.height = defaultGameScreenSize.height;
        this.SetAutoSize();
    }

    public GetWidth(): number
    {
        return this.width;
    }
    public GetHeight(): number
    {
        return this.height;
    }
    public GetSize(): [width: number, height: number]
    {
        return [this.width, this.height];
    }
    public GetCenterHorizontal(): number
    {
        return this.width / 2;
    }
    public GetCenterVertical(): number
    {
        return this.height / 2;
    }
    public GetCenter(): [width: number, height: number]
    {
        return [this.width / 2, this.height / 2];
    }


    public SetSize(width: number, height: number)
    {
        if(width < 0 || height < 0) throw new Error("GameScreen size invalid");
        this.width = width;
        this.height = height;
    }

    public SetAutoSize(): void{

        if(window.screen.width === undefined ||
            window.screen.height === undefined) return;

        this.width = window.screen.width;
        this.height = window.screen.height;

        if(this.width < 0 || this.height < 0) throw new Error("GameScreen auto size invalid");
    }

}
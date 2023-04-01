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
        this.setAutoSize();
    }

    public getWidth(): number
    {
        return this.width;
    }
    public getHeight(): number
    {
        return this.height;
    }
    public getSize(): [width: number, height: number]
    {
        return [this.width, this.height];
    }
    public getCenterHorizontal(): number
    {
        return this.width / 2;
    }
    public getCenterVertical(): number
    {
        return this.height / 2;
    }
    public getCenter(): [width: number, height: number]
    {
        return [this.width / 2, this.height / 2];
    }


    public setSize(width: number, height: number)
    {
        if(width < 0 || height < 0) throw new Error("GameScreen size invalid");
        this.width = width;
        this.height = height;
    }

    public setAutoSize(): void{

        if(window.screen.width === undefined ||
            window.screen.height === undefined) return;

        this.width = window.innerWidth * 0.9;
        this.height = window.innerHeight * 0.9;

        if(this.width < 0 || this.height < 0) throw new Error("GameScreen auto size invalid");
    }

}
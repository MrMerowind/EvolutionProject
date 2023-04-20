const defaultGameScreenSize = {
    width: 800,
    height: 600
};

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
        const half = 2;
        return this.width / half;
    }
    public getCenterVertical(): number
    {
        const half = 2;
        return this.height / half;
    }
    public getCenter(): [width: number, height: number]
    {
        const half = 2;
        return [this.width / half, this.height / half];
    }

    public setSize(width: number, height: number)
    {
        const zeroSize = 0;
        if(width < zeroSize || height < zeroSize) throw new Error("GameScreen size invalid");
        this.width = width;
        this.height = height;
    }

    public setAutoSize(): void{

        if(window.screen.width === undefined ||
            window.screen.height === undefined) return;

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        const zeroSize = 0;
        if(this.width < zeroSize || this.height < zeroSize) throw new Error("GameScreen auto size invalid");
    }

}
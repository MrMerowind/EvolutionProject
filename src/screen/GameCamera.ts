import Player from "../player/Player";
import { GameScreen } from "./GameScreen";

export class GameCamera{
    private offsetX;
    private offsetY;
    private cameraSpeed = 1;
    private gameScreenHandle: GameScreen | null;
    private playerHandle: Player | null;

    constructor()
    {
        this.offsetX = 0;
        this.offsetY = 0;
        this.playerHandle = null;
        this.gameScreenHandle = null;
    }

    public setGameScreenHandle(handle: GameScreen): void
    {
        this.gameScreenHandle = handle;
    }
    public setPlayerHandle(handle: Player): void
    {
        this.playerHandle = handle;
    }
    public centerOnPlayer(): void
    {
        if(this.gameScreenHandle === null) throw new Error("GameCamera: screen handle not set");
        if(this.playerHandle === null) throw new Error("GameCamera: player handle not set");

        this.offsetX = this.playerHandle.getPositionX() - this.gameScreenHandle.getCenterHorizontal();
        this.offsetY = this.playerHandle.getPositionY() - this.gameScreenHandle.getCenterVertical();
    }
    public moveTowardsPlayer(): void
    {
        if(this.gameScreenHandle === null) throw new Error("GameCamera: screen handle not set");
        if(this.playerHandle === null) throw new Error("GameCamera: player handle not set");

        let moveToX  = this.playerHandle.getPositionX() - this.gameScreenHandle.getCenterHorizontal();
        let moveToY  = this.playerHandle.getPositionY() - this.gameScreenHandle.getCenterVertical();

        let vectorLength = Math.sqrt(Math.abs(moveToX) * Math.abs(moveToX) + Math.abs(moveToY) * Math.abs(moveToY));
        
        moveToX /= vectorLength;
        moveToY /= vectorLength;

        this.offsetX += moveToX;
        this.offsetY += moveToY;
    }
    public setOffset(x: number, y: number): void
    {
        this.offsetX = x;
        this.offsetY = y;
    }
    public move(x: number, y: number): void
    {
        this.offsetX += x;
        this.offsetY += y;
    }
    
    public getOffset(): [x: number, y: number]
    {
        return [this.offsetX, this.offsetY];
    }
    public getOffsetX(): number
    {
        return this.offsetX;
    }
    public getOffsetY(): number
    {
        return this.offsetY;
    }
    
}
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
        if(this.gameScreenHandle === null) return;
        if(this.playerHandle === null) return;

        this.offsetX = this.playerHandle.getPositionX() - this.gameScreenHandle.getCenterHorizontal();
        this.offsetY = this.playerHandle.getPositionY() - this.gameScreenHandle.getCenterVertical();
    }
    public moveTowardsPlayer(): void
    {
        // TODO: Fix this. It is not working
        if(this.gameScreenHandle === null) return;
        if(this.playerHandle === null) return;

        let moveToX: number = this.playerHandle.getPositionX() - this.gameScreenHandle.getCenterHorizontal();
        let moveToY: number = this.playerHandle.getPositionY() - this.gameScreenHandle.getCenterVertical();

        let moveToXAbs = moveToX - this.offsetX;
        let moveToYAbs = moveToY - this.offsetY;

        let vectorLength = Math.sqrt(Math.abs(moveToXAbs) * Math.abs(moveToXAbs) + Math.abs(moveToYAbs) * Math.abs(moveToYAbs));
        
        moveToXAbs /= vectorLength;
        moveToYAbs /= vectorLength;

        this.offsetX += moveToXAbs;
        this.offsetY += moveToYAbs;
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
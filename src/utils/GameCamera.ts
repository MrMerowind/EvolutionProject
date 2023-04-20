import Player from "./player";
import { GameScreen } from "./gameScreen";

export class GameCamera{
    private offsetX;
    private offsetY;
    private cameraSpeed;
    private gameScreenHandle: GameScreen | null;
    private playerHandle: Player | null;

    constructor()
    {
        this.offsetX = 0;
        this.offsetY = 0;
        this.playerHandle = null;
        this.gameScreenHandle = null;
        this.cameraSpeed = 3;
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
    public moveTowardsPlayer(delta: number): void
    {
        if(this.gameScreenHandle === null) return;
        if(this.playerHandle === null) return;

        const moveToX: number = this.playerHandle.getPositionX() - this.gameScreenHandle.getCenterHorizontal();
        const moveToY: number = this.playerHandle.getPositionY() - this.gameScreenHandle.getCenterVertical();

        const moveToXAbs = moveToX - this.offsetX;
        const moveToYAbs = moveToY - this.offsetY;

        const distance = Math.hypot(moveToXAbs, moveToYAbs);

        const screenDistanceScale = 0.8;
        const minimumDistance = 20;

        if(distance >= Math.min(...this.gameScreenHandle.getCenter()) * screenDistanceScale)
        {
            if(Math.abs(moveToXAbs) > minimumDistance) this.offsetX += (moveToXAbs / distance) * this.playerHandle.getSpeed() * delta;
            if(Math.abs(moveToYAbs) > minimumDistance) this.offsetY += (moveToYAbs / distance) * this.playerHandle.getSpeed() * delta;
        }
        else if(distance >= minimumDistance)
        {
            if(Math.abs(moveToXAbs) > minimumDistance) this.offsetX += (moveToXAbs / distance) * this.cameraSpeed * delta;
            if(Math.abs(moveToYAbs) > minimumDistance) this.offsetY += (moveToYAbs / distance) * this.cameraSpeed * delta;
        }

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
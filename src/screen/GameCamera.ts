import Player from "../player/Player";
import { GameScreen } from "./GameScreen";

export class GameCamera{
    private offsetX;
    private offsetY;
    private cameraSpeed = 1;

    constructor()
    {
        this.offsetX = 0;
        this.offsetY = 0;
    }

    public CenterOnPlayer(gameScreen: GameScreen, player: Player): void
    {
        this.offsetX = player.GetPositionX() - gameScreen.GetCenterHorizontal();
        this.offsetY = player.GetPositionY() - gameScreen.GetCenterVertical();
    }
    public MoveTowardsPlayer(gameScreen: GameScreen, player: Player): void
    {
        let moveToX  = player.GetPositionX() - gameScreen.GetCenterHorizontal();
        let moveToY  = player.GetPositionX() - gameScreen.GetCenterHorizontal();

        let vectorLength = Math.sqrt(Math.abs(moveToX) * Math.abs(moveToX) + Math.abs(moveToY) * Math.abs(moveToY));
        
        moveToX /= vectorLength;
        moveToY /= vectorLength;

        this.offsetX += moveToX;
        this.offsetY += moveToY;
    }
    public SetOffset(x: number, y: number): void
    {
        this.offsetX = x;
        this.offsetY = y;
    }
    public Move(x: number, y: number): void
    {
        this.offsetX += x;
        this.offsetY += y;
    }
    
    public GetOffset(): [x: number, y: number]
    {
        return [this.offsetX, this.offsetY];
    }
    public GetOffsetX(): number
    {
        return this.offsetX;
    }
    public GetOffsetY(): number
    {
        return this.offsetY;
    }
    
}
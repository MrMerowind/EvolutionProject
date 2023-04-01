import { makeAutoObservable } from "mobx"
import Player from "../player/Player";
import { GameCamera } from "../screen/GameCamera";
import { GameScreen } from "../screen/GameScreen";

export interface IGameManagerStore{
    camera: GameCamera;
    screen: GameScreen;
    player: Player;
}

export class GameManagerStore implements IGameManagerStore{
    public camera: GameCamera;
    public screen: GameScreen;
    public player: Player;

    constructor(gameData: GameManagerStore | null = null)
    {
        if(gameData !== null)
        {
            this.camera = gameData.camera;
            this.screen = gameData.screen;
            this.player = gameData.player;
        }
        else
        {
            this.camera = new GameCamera();
            this.screen = new GameScreen();
            this.player = new Player();
        }
        this.camera.setGameScreenHandle(this.screen);
        this.camera.setPlayerHandle(this.player);
        this.camera.centerOnPlayer();
        makeAutoObservable(this);
    }
}
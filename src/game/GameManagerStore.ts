import * as PIXI from "pixi.js";
import { makeAutoObservable } from "mobx"
import Player from "../player/Player";
import { GameCamera } from "../screen/GameCamera";
import { GameScreen } from "../screen/GameScreen";
import { graphicPath } from "../global/GraphicPaths";

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
            // Game loading screen
            // TODO: Add loading scren
            this.camera = new GameCamera();
            this.screen = new GameScreen();
            this.player = new Player();

            
            // TODO: Change to texture manager. Fix with await
            PIXI.Assets.load(graphicPath.player.walk).then((graphic) => {
                this.player.getAnimationData("walking").getAnimation("left")?.setData(10,1,"left",0,9,1000,960,96, graphic);
                console.log("graphic", graphic);
            });

        }
        this.camera.setGameScreenHandle(this.screen);
        this.camera.setPlayerHandle(this.player);
        this.camera.centerOnPlayer();
        makeAutoObservable(this);
    }
}
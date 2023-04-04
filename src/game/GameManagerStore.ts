import * as PIXI from "pixi.js";
import { makeAutoObservable } from "mobx"
import Player from "../player/Player";
import { GameCamera } from "../screen/GameCamera";
import { GameScreen } from "../screen/GameScreen";
import { graphicPath } from "../globalData/GraphicPaths";

export interface IGameManagerStore{
    camera: GameCamera;
    screen: GameScreen;
    player: Player;
    areGraphicsLoaded: boolean;
}

export class GameManagerStore implements IGameManagerStore{
    public camera: GameCamera;
    public screen: GameScreen;
    public player: Player;
    public areGraphicsLoaded = false;

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

            
            // TODO: Change to texture manager.
            PIXI.Assets.add("player_walk_right", graphicPath.player.walk);
            PIXI.Assets.load("player_walk_right").then((graphic) => {
                
                this.player.getAnimationData("walking").getAnimation("right").setData(10,1,"right",0,9,200,960,96, graphic);

            }).then(() => {
                this.areGraphicsLoaded = true;
                this.camera.setGameScreenHandle(this.screen);
                this.camera.setPlayerHandle(this.player);
                this.camera.centerOnPlayer();
            });

        }
        
        makeAutoObservable(this);
    }
}
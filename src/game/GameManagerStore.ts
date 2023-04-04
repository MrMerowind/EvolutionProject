import * as PIXI from "pixi.js";
import { makeAutoObservable } from "mobx"
import Player from "../player/Player";
import { GameCamera } from "../screen/GameCamera";
import { GameScreen } from "../screen/GameScreen";
import { graphicPath } from "../globalData/GraphicPaths";
import { AnimationState, Direction } from "../globalData/Types";
import GameMap from "../map/Map";
import LoadingScreen from "../loadingScreen/LoadingScreen";

type LoadDataFn = () => Promise<void>;

export interface IGameManagerStore{
    camera: GameCamera;
    screen: GameScreen;
    player: Player;
    map: GameMap;
    loadingScreen: LoadingScreen;
    areGraphicsLoaded: boolean;
    loadData: LoadDataFn;
    loadLoadingScreen: LoadDataFn;
}

export class GameManagerStore implements IGameManagerStore{
    public camera: GameCamera;
    public screen: GameScreen;
    public player: Player;
    public map: GameMap;
    public areGraphicsLoaded: boolean;
    public loadingScreen: LoadingScreen; 

    constructor(gameData: GameManagerStore | null = null)
    {
        if(gameData !== null)
        {
            this.camera = gameData.camera;
            this.screen = gameData.screen;
            this.player = gameData.player;
            this.map = gameData.map;
            this.loadingScreen = gameData.loadingScreen;
            this.areGraphicsLoaded = gameData.areGraphicsLoaded;
        }
        else
        {
            // Game loading screen
            // TODO: Add loading scren
            
            
            this.areGraphicsLoaded = false;
            this.loadingScreen = new LoadingScreen();
            this.camera = new GameCamera();
            this.screen = new GameScreen();
            this.player = new Player();
            this.map = new GameMap();
            
            this.loadLoadingScreen().then(() => {
                this.loadingScreen.isLoaded = true;
            });

            this.loadData().then(() => {
                this.camera.setGameScreenHandle(this.screen);
                this.camera.setPlayerHandle(this.player);
                this.camera.centerOnPlayer();   
                this.areGraphicsLoaded = true;
            });
            
            
        }
        
        makeAutoObservable(this);
    }

    loadLoadingScreen = async() => {
        await PIXI.Assets.load(graphicPath.loadingScreen).then((graphic) => {
            this.loadingScreen.texture = graphic;
        }).then(() => this.loadingScreen.isLoaded = true);
    }

    loadData = async() =>
    {
        await PIXI.Assets.load(graphicPath.player.walk).then((graphic) => {
            this.player.getAnimationData(AnimationState.walking).getAnimation(Direction.right).setData(10,1,0,9,120,960,96, graphic);
        });
        await PIXI.Assets.load(graphicPath.player.idle).then((graphic) => {   
            this.player.getAnimationData(AnimationState.standing).getAnimation(Direction.right).setData(50,1,0,49,120,4800,96, graphic);
        });
        for(let i = 1; i <= this.map.levelCount; i++)
        {
            await PIXI.Assets.load(graphicPath.mapFolder + i.toString() + ".png").then((graphic) => {   
                this.map.textures.set(i, graphic);
            });
        }
    }
}
import { Assets } from "pixi.js";
import { makeAutoObservable } from "mobx";
import Player from "./Player";
import { GameCamera } from "./GameCamera";
import { GameScreen } from "./GameScreen";
import { graphicPath } from "./GraphicPaths";
import { AnimationState, Direction } from "./Types";
import GameMap from "./Map";
import LoadingScreen from "./LoadingScreen";
import EnemyList from "./EnemyList";
import Enemy from "./Enemy";
import { AnimationData } from "./AnimationData";
import UserInterfaceData from "./UserInterfaceData";

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
    enemyPrototypes: EnemyList;
    enemyList: EnemyList;
    userInterfaceData: UserInterfaceData;
}

export class GameManagerStore implements IGameManagerStore{
    public camera: GameCamera;
    public screen: GameScreen;
    public player: Player;
    public map: GameMap;
    public areGraphicsLoaded: boolean;
    public loadingScreen: LoadingScreen; 
    public enemyPrototypes: EnemyList;
    public enemyList: EnemyList;
    public userInterfaceData: UserInterfaceData;

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
            this.enemyPrototypes = gameData.enemyPrototypes;
            this.enemyList = gameData.enemyList;
            this.userInterfaceData = gameData.userInterfaceData;
        }
        else
        {
            // Game loading screen
            this.areGraphicsLoaded = false;
            this.loadingScreen = new LoadingScreen();
            
            this.loadLoadingScreen().then(() => {
                this.loadingScreen.isLoaded = true;
            });

            this.camera = new GameCamera();
            this.screen = new GameScreen();
            this.player = new Player();
            this.map = new GameMap();
            this.enemyPrototypes = new EnemyList();
            this.enemyList = new EnemyList();
            this.userInterfaceData = new UserInterfaceData();

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
        await Assets.load(graphicPath.loadingScreen).then((graphic) => {
            this.loadingScreen.texture = graphic;
        }).then(() => this.loadingScreen.isLoaded = true);
    };

    loadData = async() =>
    {
        // Loading player
        await Assets.load(graphicPath.player.walk).then((graphic) => {
            this.player.getAnimationData(AnimationState.walking).getAnimation(Direction.right).setData(10,1,0,9,100,960,96, graphic);
        });
        await Assets.load(graphicPath.player.idle).then((graphic) => {   
            this.player.getAnimationData(AnimationState.standing).getAnimation(Direction.right).setData(50,1,0,49,100,4800,96, graphic);
        });

        // Loading terrain
        for(let i = 1; i <= this.map.levelCount; i++)
        {
            await Assets.load(graphicPath.mapFolder + i.toString() + ".png").then((graphic) => {   
                this.map.textures.set(i, graphic);
            });
        }

        // TODO: Save this data to a file and load acordingly
        // Loading enemies
        await Assets.load(graphicPath.enemies + "1_attack.png").then((graphic) => {
            //Enemy 1
            const enemyPointer = new Enemy();
            const animDataAttacking = new AnimationData();
            const animDataStanding = new AnimationData();
            const animDataWalking = new AnimationData();
            animDataAttacking.getAnimation(Direction.up).setData(13,4,0,12,60,832,256,graphic);
            animDataAttacking.getAnimation(Direction.left).setData(13,4,13,25,60,832,256,graphic);
            animDataAttacking.getAnimation(Direction.right).setData(13,4,26,38,60,832,256,graphic);
            animDataAttacking.getAnimation(Direction.down).setData(13,4,39,51,60,832,256,graphic);

            Assets.load(graphicPath.enemies + "1_walk.png").then((graphic2) => {
                animDataWalking.getAnimation(Direction.up).setData(10,4,0,9,60,640,256,graphic2);
                animDataWalking.getAnimation(Direction.left).setData(10,4,10,19,60,640,256,graphic2);
                animDataWalking.getAnimation(Direction.right).setData(10,4,20,29,60,640,256,graphic2);
                animDataWalking.getAnimation(Direction.down).setData(10,4,30,39,60,640,256,graphic2);
                
                animDataStanding.getAnimation(Direction.up).setData(10,4,0,0,60,640,256,graphic2);
                animDataStanding.getAnimation(Direction.left).setData(10,4,10,10,60,640,256,graphic2);
                animDataStanding.getAnimation(Direction.right).setData(10,4,20,20,60,640,256,graphic2);
                animDataStanding.getAnimation(Direction.down).setData(10,4,30,30,60,640,256,graphic2);
            });

            enemyPointer.createPrototype(1,1,1,1,1,3,animDataStanding,animDataWalking,animDataAttacking);
            this.enemyPrototypes.addEnemy(enemyPointer);
        });

        // Loading User Interface
        await Assets.load(graphicPath.player.hpAboveHead).then((graphic) => {   
            this.userInterfaceData.setPlayerHpTexture(graphic);
        });
        await Assets.load(graphicPath.hpAboveHeadEnemy).then((graphic) => {   
            this.userInterfaceData.setHpTexture(graphic);
        });


    };
}
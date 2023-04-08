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
import { AnimationSubData, CreatureAnimation, SkillAnimation } from "./AnimationData";
import UserInterfaceData from "./UserInterfaceData";
import { StatisticsData } from "./StatisticsData";
import SkillList from "./SkillList";
import { SkillNotMoving, SkillThrowable } from "./Skills";

type LoadDataFn = () => Promise<void>;

export interface IGameManagerStore{
    camera: GameCamera;
    screen: GameScreen;
    player: Player;
    map: GameMap;
    statistics: StatisticsData;
    loadingScreen: LoadingScreen;
    areGraphicsLoaded: boolean;
    loadData: LoadDataFn;
    loadLoadingScreen: LoadDataFn;
    enemyPrototypes: EnemyList;
    enemyList: EnemyList;
    userInterfaceData: UserInterfaceData;
    skillPrototypes: SkillList;
    skillListAvaliable: SkillList;
    skillListOnScreen: SkillList;
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
    public statistics: StatisticsData;
    public skillPrototypes: SkillList;
    public skillListAvaliable: SkillList;
    public skillListOnScreen: SkillList;

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
            this.statistics = gameData.statistics;
            this.skillListAvaliable = gameData.skillListAvaliable;
            this.skillListOnScreen = gameData.skillListOnScreen;
            this.skillPrototypes = gameData.skillPrototypes;
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
            this.statistics = new StatisticsData();
            this.skillListAvaliable = new SkillList();
            this.skillListOnScreen = new SkillList();
            this.skillPrototypes = new SkillList();

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

    // TODO: Rewrite reading from JSON file
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
            const animDataAttacking = new CreatureAnimation();
            const animDataStanding = new CreatureAnimation();
            const animDataWalking = new CreatureAnimation();
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
        await Assets.load(graphicPath.statistics.corner).then((graphic) => {   
            this.statistics.setCornerOverlay(graphic);
        });
        await Assets.load(graphicPath.statistics.overlay).then((graphic) => {   
            this.statistics.setHealthOverlay(graphic);
        });
        await Assets.load(graphicPath.statistics.hp).then((graphic) => {   
            this.statistics.setHealthBar(graphic);
        });
        await Assets.load(graphicPath.statistics.exp).then((graphic) => {   
            this.statistics.setExpBar(graphic);
        });

        // Loading Skills Magic orb
        await Assets.load(graphicPath.skills.magicOrb).then((graphic) => {   
            const skill = new SkillThrowable();
            skill.anchorX = 0.5;
            skill.anchorY = 0.5;
            skill.damage = 1;
            skill.cooldown = 2000;
            skill.skillName = "Magic orb";
            skill.scale = 0.5;
            skill.damageRadius = 20;
            skill.castTime = 0;
            skill.damagingEnemies = true;
            skill.damagingPlayer = false;
            skill.explodeable = true;
            skill.speed = 10;

            const animSubData = new AnimationSubData();
            animSubData.setData(1,1,0,0,100,76,73,graphic);

            const animData = new SkillAnimation();
            animData.setAnimation(animSubData);

            skill.setAnimation(animData);

            this.skillPrototypes.addSkillPrototype(skill);
            this.skillListAvaliable.addSkillPrototype(new SkillThrowable(skill));
        });

        // Loading Skills Sword vortex
        await Assets.load(graphicPath.skills.swordVortex).then((graphic) => {   
            const skill = new SkillNotMoving();
            skill.anchorX = 0.5;
            skill.anchorY = 1.1;
            skill.damage = 1;
            skill.cooldown = 5000;
            skill.skillName = "Sword vortex";
            skill.scale = 0.2;
            skill.damageRadius = 100;
            skill.castTime = 0;
            skill.destroyAfter = 650;
            skill.damagingEnemies = true;
            skill.damagingPlayer = false;
            skill.explodeable = false;
            skill.speed = 9;
            skill.speaning = true;

            const animSubData = new AnimationSubData();
            animSubData.setData(1,1,0,0,100,76,450,graphic);

            const animData = new SkillAnimation();
            animData.setAnimation(animSubData);

            skill.setAnimation(animData);

            this.skillPrototypes.addSkillPrototype(skill);
            // TODO: Remove next line.
            this.skillListAvaliable.addSkillPrototype(new SkillNotMoving(skill));
        });


    };
}
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Assets, BaseTexture } from "pixi.js";
import { makeAutoObservable } from "mobx";
import Player from "./player";
import { GameCamera } from "./gameCamera";
import { GameScreen } from "./gameScreen";
import { graphicPath } from "../data/graphicPaths";
import { AnimationState, Direction } from "../data/types";
import GameMap from "./map";
import LoadingScreen, { loadingAniamtionLength } from "./loadingScreen";
import EnemyList from "./enemyList";
import Enemy from "./enemy";
import { AnimationSubData, CreatureAnimation, SkillAnimation } from "./animationData";
import UserInterfaceData from "./userInterfaceData";
import { StatisticsData } from "./statisticsData";
import SkillList from "./skillList";
import { enemiesData } from "../data/enemiesData";
import { SkillBase } from "./skillBase";
import SkillSelect from "./skillSelect";
import MapSelect from "./mapSelect";
import Shadow from "./shadow";

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
    bossPrototypes: EnemyList;
    enemyList: EnemyList;
    userInterfaceData: UserInterfaceData;
    skillPrototypes: SkillList;
    skillListAvaliable: SkillList;
    skillListOnScreen: SkillList;
    skillSelect: SkillSelect;
    mapSelect: MapSelect;
    shadowData: Shadow;
}

export class GameManagerStore implements IGameManagerStore{
    public camera: GameCamera;
    public screen: GameScreen;
    public player: Player;
    public map: GameMap;
    public areGraphicsLoaded: boolean;
    public loadingScreen: LoadingScreen; 
    public enemyPrototypes: EnemyList;
    public bossPrototypes: EnemyList;
    public enemyList: EnemyList;
    public userInterfaceData: UserInterfaceData;
    public statistics: StatisticsData;
    public skillPrototypes: SkillList;
    public skillListAvaliable: SkillList;
    public skillListOnScreen: SkillList;
    public skillSelect: SkillSelect;
    public mapSelect: MapSelect;
    public shadowData: Shadow;

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
            this.bossPrototypes = gameData.bossPrototypes;
            this.enemyList = gameData.enemyList;
            this.userInterfaceData = gameData.userInterfaceData;
            this.statistics = gameData.statistics;
            this.skillListAvaliable = gameData.skillListAvaliable;
            this.skillListOnScreen = gameData.skillListOnScreen;
            this.skillPrototypes = gameData.skillPrototypes;
            this.skillSelect = gameData.skillSelect;
            this.mapSelect = gameData.mapSelect;
            this.shadowData = gameData.shadowData;
            makeAutoObservable(this);
            return;
        }
        // Game loading screen
        this.areGraphicsLoaded = false;
        this.loadingScreen = new LoadingScreen();
            
        this.loadLoadingScreen().then(() => {
            this.loadingScreen._isAllLoaded = true;
        });

        this.camera = new GameCamera();
        this.screen = new GameScreen();
        this.player = new Player();
        this.map = new GameMap();
        this.enemyPrototypes = new EnemyList();
        this.bossPrototypes = new EnemyList();
        this.enemyList = new EnemyList();
        this.userInterfaceData = new UserInterfaceData();
        this.statistics = new StatisticsData();
        this.skillListAvaliable = new SkillList();
        this.skillListOnScreen = new SkillList();
        this.skillPrototypes = new SkillList();
        this.skillSelect = new SkillSelect();
        this.mapSelect = new MapSelect();
        this.shadowData = new Shadow();

        this.loadData().then(() => {
            this.camera.setGameScreenHandle(this.screen);
            this.camera.setPlayerHandle(this.player);
            this.camera.centerOnPlayer();   
            this.areGraphicsLoaded = true;
        }).then(() => {
            const skillFire = this.skillPrototypes.getSkill("Fire");
            if(skillFire !== undefined)
                skillFire.onExplodeSkillCast = this.skillPrototypes.getSkill("Sunburn") as SkillBase;
            else console.log("Cant find skill");
            // TODO: Remove later.
            const skillFire2 = this.skillListAvaliable.getSkill("Fire");
            if(skillFire2 !== undefined)
                skillFire2.onExplodeSkillCast = this.skillPrototypes.getSkill("Sunburn") as SkillBase;
        });

        makeAutoObservable(this);
            
    }

    loadLoadingScreen = async() => {
        /*for(let i = 0; i < loadingAniamtionLength; i++)
        {
            await Assets.load(graphicPath.loadingScreen[i]).then((graphic) => {
                this.loadingScreen.texture[i] = graphic;
            }).then(() => this.loadingScreen.isLoaded[i] = true);
        }*/
        
        await Assets.load(graphicPath.loadingScreen[8]).then((graphic) => {
            this.loadingScreen.texture = graphic;
        }).then(() => this.loadingScreen.isLoaded = true);

        await Assets.load(graphicPath.loadingScreen[4]).then((graphic) => {
            this.mapSelect.castleBackground = graphic;
        }).then(() => this.loadingScreen.isLoaded = true);

        await Assets.load(graphicPath.loadingScreenTooSmallScreen).then((graphic) => {
            this.loadingScreen.textureSmallScreen = graphic;
        }).then(() => this.loadingScreen.isLoadedSmallScreen = true);
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

        // Loading skill select
        await Assets.load(graphicPath.skillSelect.background).then((graphic) => {
            this.skillSelect.setBackground(graphic);
        });
        await Assets.load(graphicPath.skillSelect.overlay).then((graphic) => {
            this.skillSelect.setOverlay(graphic);
        });
        await Assets.load(graphicPath.skillSelect.bar).then((graphic) => {
            this.skillSelect.setBar(graphic);
        });
        await Assets.load(graphicPath.skillSelect.button).then((graphic) => {
            this.skillSelect.setButton(graphic);
        });

        // Loading map select
        await Assets.load(graphicPath.mapSelect.background).then((graphic) => {
            this.mapSelect.setBackground(graphic);
        });

        // Loading shadow
        await Assets.load(graphicPath.shadow).then((graphic) => {
            this.shadowData.setGraphic(graphic);
        });

        // Loading enemies
        enemiesData.forEach(async(enemy) => {
            await Assets.load(enemy.graphics.attack.path).then((graphic) => {
                const enemyPointer = new Enemy();
                const bossPointer = new Enemy();
                const animDataAttacking = new CreatureAnimation();
                const animDataStanding = new CreatureAnimation();
                const animDataWalking = new CreatureAnimation();
                if(enemy.graphics.attack.up)
                    animDataAttacking.getAnimation(Direction.up).setData(
                        enemy.graphics.attack.framesHorizontal,
                        enemy.graphics.attack.framesVertical,
                        enemy.graphics.attack.up.frameStart,
                        enemy.graphics.attack.up.frameEnd,
                        enemy.graphics.attack.speed,
                        enemy.graphics.attack.graphicWidth,
                        enemy.graphics.attack.graphicHeight,
                        graphic);
                if(enemy.graphics.attack.left)
                    animDataAttacking.getAnimation(Direction.left).setData(
                        enemy.graphics.attack.framesHorizontal,
                        enemy.graphics.attack.framesVertical,
                        enemy.graphics.attack.left.frameStart,
                        enemy.graphics.attack.left.frameEnd,
                        enemy.graphics.attack.speed,
                        enemy.graphics.attack.graphicWidth,
                        enemy.graphics.attack.graphicHeight,
                        graphic);
                if(enemy.graphics.attack.right)
                    animDataAttacking.getAnimation(Direction.right).setData(
                        enemy.graphics.attack.framesHorizontal,
                        enemy.graphics.attack.framesVertical,
                        enemy.graphics.attack.right.frameStart,
                        enemy.graphics.attack.right.frameEnd,
                        enemy.graphics.attack.speed,
                        enemy.graphics.attack.graphicWidth,
                        enemy.graphics.attack.graphicHeight,
                        graphic);
                if(enemy.graphics.attack.down)
                    animDataAttacking.getAnimation(Direction.down).setData(
                        enemy.graphics.attack.framesHorizontal,
                        enemy.graphics.attack.framesVertical,
                        enemy.graphics.attack.down.frameStart,
                        enemy.graphics.attack.down.frameEnd,
                        enemy.graphics.attack.speed,
                        enemy.graphics.attack.graphicWidth,
                        enemy.graphics.attack.graphicHeight,
                        graphic);
    
                Assets.load(enemy.graphics.walk.path).then((graphic2) => {
                    if(enemy.graphics.walk.up)
                        animDataWalking.getAnimation(Direction.up).setData(
                            enemy.graphics.walk.framesHorizontal,
                            enemy.graphics.walk.framesVertical,
                            enemy.graphics.walk.up.frameStart,
                            enemy.graphics.walk.up.frameEnd,
                            enemy.graphics.walk.speed,
                            enemy.graphics.walk.graphicWidth,
                            enemy.graphics.walk.graphicHeight,
                            graphic2);
                    if(enemy.graphics.walk.left)
                        animDataWalking.getAnimation(Direction.left).setData(
                            enemy.graphics.walk.framesHorizontal,
                            enemy.graphics.walk.framesVertical,
                            enemy.graphics.walk.left.frameStart,
                            enemy.graphics.walk.left.frameEnd,
                            enemy.graphics.walk.speed,
                            enemy.graphics.walk.graphicWidth,
                            enemy.graphics.walk.graphicHeight,
                            graphic2);
                    if(enemy.graphics.walk.right)
                        animDataWalking.getAnimation(Direction.right).setData(
                            enemy.graphics.walk.framesHorizontal,
                            enemy.graphics.walk.framesVertical,
                            enemy.graphics.walk.right.frameStart,
                            enemy.graphics.walk.right.frameEnd,
                            enemy.graphics.walk.speed,
                            enemy.graphics.walk.graphicWidth,
                            enemy.graphics.walk.graphicHeight,
                            graphic2);
                    if(enemy.graphics.walk.down)
                        animDataWalking.getAnimation(Direction.down).setData(
                            enemy.graphics.walk.framesHorizontal,
                            enemy.graphics.walk.framesVertical,
                            enemy.graphics.walk.down.frameStart,
                            enemy.graphics.walk.down.frameEnd,
                            enemy.graphics.walk.speed,
                            enemy.graphics.walk.graphicWidth,
                            enemy.graphics.walk.graphicHeight,
                            graphic2);
                    if(enemy.graphics.attack.up)
                        animDataStanding.getAnimation(Direction.up).setData(
                            enemy.graphics.attack.framesHorizontal,
                            enemy.graphics.attack.framesVertical,
                            enemy.graphics.attack.up.frameStart,
                            enemy.graphics.attack.up.frameStart,
                            enemy.graphics.attack.speed,
                            enemy.graphics.attack.graphicWidth,
                            enemy.graphics.attack.graphicHeight,
                            graphic2);
                    if(enemy.graphics.attack.left)
                        animDataStanding.getAnimation(Direction.left).setData(
                            enemy.graphics.attack.framesHorizontal,
                            enemy.graphics.attack.framesVertical,
                            enemy.graphics.attack.left.frameStart,
                            enemy.graphics.attack.left.frameStart,
                            enemy.graphics.attack.speed,
                            enemy.graphics.attack.graphicWidth,
                            enemy.graphics.attack.graphicHeight,
                            graphic2);
                    if(enemy.graphics.attack.right)
                        animDataStanding.getAnimation(Direction.right).setData(
                            enemy.graphics.attack.framesHorizontal,
                            enemy.graphics.attack.framesVertical,
                            enemy.graphics.attack.right.frameStart,
                            enemy.graphics.attack.right.frameStart,
                            enemy.graphics.attack.speed,
                            enemy.graphics.attack.graphicWidth,
                            enemy.graphics.attack.graphicHeight,
                            graphic2);

                    if(enemy.graphics.attack.down)
                        animDataStanding.getAnimation(Direction.down).setData(
                            enemy.graphics.attack.framesHorizontal,
                            enemy.graphics.attack.framesVertical,
                            enemy.graphics.attack.down.frameStart,
                            enemy.graphics.attack.down.frameStart,
                            enemy.graphics.attack.speed,
                            enemy.graphics.attack.graphicWidth,
                            enemy.graphics.attack.graphicHeight,
                            graphic2);
                });
    
                enemyPointer.createPrototype(
                    enemy.level,
                    enemy.hp,
                    enemy.damage,
                    enemy.exp,
                    enemy.scale,
                    enemy.speed,
                    animDataStanding,
                    animDataWalking,
                    animDataAttacking,
                    enemy.shadowAnchorY,
                    enemy.space);
                this.enemyPrototypes.addEnemy(enemyPointer);

                const bossHp = enemy.hp * 100;
                const bossScale = enemy.scale * Enemy.bossScale;
                const bossSpace = enemy.space * Enemy.bossScale;
                const bossDamage = enemy.damage * 10;
                const bossExp = enemy.exp * 50;
                const bossSpeed = enemy.speed * 0.5;

                bossPointer.createPrototype(
                    enemy.level,
                    bossHp,
                    bossDamage,
                    bossExp,
                    bossScale,
                    bossSpeed,
                    animDataStanding,
                    animDataWalking,
                    animDataAttacking,
                    enemy.shadowAnchorY,
                    bossSpace, true);
                this.bossPrototypes.addEnemy(bossPointer);
            });
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
        await Assets.load(graphicPath.statistics.button).then((graphic) => {   
            this.statistics.setButton(graphic);
        });

        // Loading death animation
        await Assets.load(graphicPath.death).then((graphic) => {   

            const animSubData = new AnimationSubData();
            animSubData.setData(7,7,0,48,30,700,700,graphic);

            const animData = new SkillAnimation();
            animData.setAnimation(animSubData);

            this.enemyList.setDeathAnimationData(animData);
        });

        // Loading Skills Orb
        await Assets.load(graphicPath.skills.magicOrb).then((graphic) => {   
            const skill = new SkillBase();
            skill.anchorX = 0.5;
            skill.anchorY = 0.5;
            skill.damage = 1;
            skill.cooldown = 2000;
            skill.skillName = "Orb";
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
            this.skillListAvaliable.addSkillPrototype(new SkillBase(skill));
        });

        // Loading Skills Arrow
        await Assets.load(graphicPath.skills.arrow).then((graphic) => {   
            const skill = new SkillBase();
            skill.anchorX = 0.5;
            skill.anchorY = 0.5;
            skill.damage = 1;
            skill.cooldown = 1000;
            skill.skillName = "Arrow";
            skill.scale = 1;
            skill.damageRadius = 10;
            skill.castTime = 0;
            skill.damagingEnemies = true;
            skill.damagingPlayer = false;
            skill.explodeable = true;
            skill.speed = 15;

            const animSubData = new AnimationSubData();
            animSubData.setData(1,1,0,0,100,45,5,graphic);

            const animData = new SkillAnimation();
            animData.setAnimation(animSubData);

            skill.setAnimation(animData);

            this.skillPrototypes.addSkillPrototype(skill);
        });

        // Loading Skills bird
        await Assets.load(graphicPath.skills.bird).then((graphic) => {   
            const skill = new SkillBase();
            skill.anchorX = 0.5;
            skill.anchorY = 0.5;
            skill.damage = 1;
            skill.cooldown = 2000;
            skill.skillName = "Bird";
            skill.scale = 0.5;
            skill.damageRadius = 10;
            skill.castTime = 0;
            skill.damagingEnemies = true;
            skill.damagingPlayer = false;
            skill.explodeable = false;
            skill.speed = 5;
            skill.destroyAfter = 5000;

            const animSubData = new AnimationSubData();
            animSubData.setData(1,1,0,0,100,47,91,graphic);

            const animData = new SkillAnimation();
            animData.setAnimation(animSubData);

            skill.setAnimation(animData);

            this.skillPrototypes.addSkillPrototype(skill);
        });

        // Loading Skills dragon
        await Assets.load(graphicPath.skills.dragon).then((graphic) => {   
            const skill = new SkillBase();
            skill.anchorX = 0.5;
            skill.anchorY = 0.5;
            skill.damage = 1;
            skill.cooldown = 20000;
            skill.skillName = "Dragon";
            skill.scale = 0.4;
            skill.damageRadius = 10;
            skill.castTime = 0;
            skill.damagingEnemies = true;
            skill.damagingPlayer = false;
            skill.explodeable = false;
            skill.speed = 2;
            skill.destroyAfter = 20000;

            const animSubData = new AnimationSubData();
            animSubData.setData(1,1,0,0,100,500,500,graphic);

            const animData = new SkillAnimation();
            animData.setAnimation(animSubData);

            skill.setAnimation(animData);

            this.skillPrototypes.addSkillPrototype(skill);
        });

        // Loading Skills Sword vortex
        await Assets.load(graphicPath.skills.swordVortex).then((graphic) => {   
            const skill = new SkillBase();
            skill.anchorX = 0.5;
            skill.anchorY = 1.1;
            skill.damage = 1;
            skill.cooldown = 1000;
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
        });

        // Loading Skills Fire
        await Assets.load(graphicPath.skills.fire).then((graphic) => {   
            const skill = new SkillBase();
            skill.anchorX = 0.5;
            skill.anchorY = 0.5;
            skill.damage = 1;
            skill.cooldown = 2000;
            skill.skillName = "Fire";
            skill.scale = 1;
            skill.damageRadius = 10;
            skill.castTime = 0;
            skill.damagingEnemies = true;
            skill.damagingPlayer = false;
            skill.explodeable = true;
            skill.speed = 15;

            const animSubData = new AnimationSubData();
            animSubData.setData(8,8,0,63,100,800,800,graphic);

            const animData = new SkillAnimation();
            animData.setAnimation(animSubData);

            skill.setAnimation(animData);

            this.skillPrototypes.addSkillPrototype(skill);
        });

        // Loading Skills Sunburn
        await Assets.load(graphicPath.skills.sunBurn).then((graphic) => {   
            const skill = new SkillBase();
            skill.anchorX = 0.5;
            skill.anchorY = 0.5;
            skill.damage = 1;
            skill.cooldown = 0;
            skill.skillName = "Sunburn";
            skill.scale = 3;
            skill.damageRadius = 100;
            skill.castTime = 0;
            skill.destroyAfter = 1000;
            skill.damagingEnemies = true;
            skill.damagingPlayer = false;
            skill.explodeable = false;
            skill.speed = 1;
            skill.speaning = false;

            const animSubData = new AnimationSubData();
            animSubData.setData(8,8,0,63,100,800,800,graphic);

            const animData = new SkillAnimation();
            animData.setAnimation(animSubData);

            skill.setAnimation(animData);

            this.skillPrototypes.addSkillPrototype(skill);
        });

        // Loading Skills Ice
        await Assets.load(graphicPath.skills.ice).then((graphic) => {   
            const skill = new SkillBase();
            skill.anchorX = 0.5;
            skill.anchorY = 0.5;
            skill.damage = 1;
            skill.cooldown = 2000;
            skill.skillName = "Ice";
            skill.scale = 3;
            skill.damageRadius = 100;
            skill.castTime = 0;
            skill.destroyAfter = 750;
            skill.damagingEnemies = true;
            skill.damagingPlayer = false;
            skill.explodeable = false;
            skill.speed = 1;
            skill.speaning = false;

            const animSubData = new AnimationSubData();
            animSubData.setData(8,8,0,60,100,800,800,graphic);

            const animData = new SkillAnimation();
            animData.setAnimation(animSubData);

            skill.setAnimation(animData);

            this.skillPrototypes.addSkillPrototype(skill);
        });

        // Loading Skills Poison
        await Assets.load(graphicPath.skills.poison).then((graphic) => {   
            const skill = new SkillBase();
            skill.anchorX = 0.5;
            skill.anchorY = 0.5;
            skill.damage = 1;
            skill.cooldown = 5000;
            skill.skillName = "Poison";
            skill.scale = 3;
            skill.damageRadius = 100;
            skill.castTime = 0;
            skill.destroyAfter = 4000;
            skill.damagingEnemies = true;
            skill.damagingPlayer = false;
            skill.explodeable = false;
            skill.speed = 1;
            skill.speaning = false;

            const animSubData = new AnimationSubData();
            animSubData.setData(10,10,0,90,100,1000,1000,graphic);

            const animData = new SkillAnimation();
            animData.setAnimation(animSubData);

            skill.setAnimation(animData);

            this.skillPrototypes.addSkillPrototype(skill);
        });

    };
}
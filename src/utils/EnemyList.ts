import Player from "./player";
import Enemy from "./enemy";
import { SkillAnimation } from "./animationData";
import { idLimit } from "../data/globalData";

export default class EnemyList{
    private enemies: Enemy[];
    private currentWave: number;
    private lastWaveTime: number;
    private animationDataDeath: SkillAnimation;

    private deathSpots: Array<[x: number, y: number, k: string, time: number]>;

    constructor()
    {
        this.enemies = [];
        this.currentWave = 0;
        this.lastWaveTime = 0;
        this.animationDataDeath = new SkillAnimation();
        this.deathSpots = new Array<[x: number, y: number, k: string, time: number]>();
    }
    public getDeathAnimationData()
    {
        return this.animationDataDeath;
    }
    public addDeathSpot(x: number, y: number)
    {
        const id = Math.floor(Math.random() * idLimit).toString();
        const time = 0;
        this.deathSpots.push([x, y, id, time]);
    }
    public progressDeathSpotsTime(time: number)
    {
        for(let i = 0; i < this.deathSpots.length; i++)
        {
            const indexOfTime = 3;
            this.deathSpots[i][indexOfTime] += time;
        }
    }
    public getDeathSpots()
    {
        for(let i = 0; i < this.deathSpots.length; i++)
        {
            const indexOfTime = 3;
            const expired = this.deathSpots[i][indexOfTime] >= this.animationDataDeath.getAnimation().animationFrameTime
                * (this.animationDataDeath.getAnimation().animationFrameIndexEnd - this.animationDataDeath.getAnimation().animationFrameIndexStart);
            if(!expired) continue;
            const removeCount = 1;
            this.deathSpots.splice(i, removeCount);
            i--;
        }

        return this.deathSpots;
    }
    public setDeathAnimationData(data: SkillAnimation)
    {
        return this.animationDataDeath = data;
    }
    public getList(): Enemy[]
    {
        return this.enemies;
    }
    public addEnemy(entity: Enemy)
    {
        this.enemies.push(entity);
    }
    public getCurrentWave(): number
    {
        return this.currentWave;
    }
    public getNearest(fromX: number, fromY: number): Enemy | null
    {
        const minimumEnemiesCount = 0;
        if(this.enemies.length <= minimumEnemiesCount) return null;
        const firstEnemyIndex = 0;
        let distanceLowest = Math.hypot(this.enemies[firstEnemyIndex].getPositionX() - fromX, this.enemies[firstEnemyIndex].getPositionY() - fromY);
        let idFound = 0;
        for(let i = 1; i < this.enemies.length; i++)
        {
            const nextDistance = Math.hypot(this.enemies[i].getPositionX() - fromX, this.enemies[i].getPositionY() - fromY);
            if(distanceLowest <= nextDistance) continue;
            distanceLowest = nextDistance;
            idFound = i;
        }

        return this.enemies[idFound];
    }
    public getRandomClose(fromX: number, fromY: number): Enemy | null
    {
        const minimumEnemiesCount = 0;
        if(this.enemies.length <= minimumEnemiesCount) return null;
        const maxDistance = 1000;
        const idFound: number[] = [];
        for(let i = 0; i < this.enemies.length; i++)
        {
            const nextDistance = Math.hypot(this.enemies[i].getPositionX() - fromX, this.enemies[i].getPositionY() - fromY);
            if(maxDistance < nextDistance) continue;
            idFound.push(i);
        }
        const minimumIdSFound = 0;
        if(idFound.length <= minimumIdSFound) return null;
        return this.enemies[idFound[Math.floor(Math.random() *  idFound.length)]];
    }
    public nextWave(currentTime: number): void
    {
        this.lastWaveTime = currentTime;
        this.currentWave++;
    }
    private getWaveDuration()
    {
        const waveDuration = 5000;
        return waveDuration; 
    }
    private getWaveCount(mapLevel: number)
    {
        const baseWaves = 50;
        const extraWaves = 10;
        const extraWavesOnThisLevel = extraWaves * mapLevel;
        const waveSum = baseWaves + extraWavesOnThisLevel;
        return waveSum;
    }
    public isNextWaveReady(currentTime: number, mapLevel: number): boolean
    {
        if(this.currentWave >= this.getWaveCount(mapLevel)) return false;
        if(this.lastWaveTime + this.getWaveDuration() <= currentTime) return true;
        else return false;
    }
    public isBossReady(mapLevel: number): boolean
    {
        if(this.currentWave === this.getWaveCount(mapLevel)) return true;
        return false;
    }
    public allDead(mapLevel: number): boolean
    {
        const noEnemiesLeft = 0;
        if(this.isBossReady(mapLevel) && this.enemies.length === noEnemiesLeft)
        {
            return true;
        }
        return false;
    }
    public moveTowardsPlayer(playerHandle: Player, delta: number)
    {
        this.enemies.forEach(enemy => enemy.moveUnitTowardsPlayer(playerHandle, this, delta));
    }
    public resetLastWaveTime()
    {
        this.lastWaveTime = 0;
        this.currentWave = 0;
    }
}
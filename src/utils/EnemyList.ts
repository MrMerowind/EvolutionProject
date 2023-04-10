import Player from "./Player";
import Enemy from "./Enemy";
import { SkillAnimation } from "./AnimationData";

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
        const id = Math.floor(Math.random() * 1e20).toString();
        this.deathSpots.push([x,y,id,0]);
    }
    public progressDeathSpotsTime(time: number)
    {
        for(let i = 0; i < this.deathSpots.length; i++)
        {
            this.deathSpots[i][3] += time;
        }
    }
    public getDeathSpots()
    {
        for(let i = 0; i < this.deathSpots.length; i++)
        {
            const expired = this.deathSpots[i][3] >= this.animationDataDeath.getAnimation().animationFrameTime
                * (this.animationDataDeath.getAnimation().animationFrameIndexEnd - this.animationDataDeath.getAnimation().animationFrameIndexStart);
            if(!expired) continue;
            this.deathSpots.splice(i,1);
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
        if(this.enemies.length <= 0) return null;
        let distanceLowest = Math.hypot(this.enemies[0].getPositionX() - fromX, this.enemies[0].getPositionY() - fromY);
        let idFound = 0;
        for(let i = 1; i < this.enemies.length; i++)
        {
            const nextDistance = Math.hypot(this.enemies[i].getPositionX() - fromX, this.enemies[i].getPositionY() - fromY);
            if(distanceLowest > nextDistance)
            {
                distanceLowest = nextDistance;
                idFound = i;
            }
        }

        return this.enemies[idFound];
    }
    public getRandomClose(fromX: number, fromY: number): Enemy | null
    {
        if(this.enemies.length <= 0) return null;
        const maxDistance = 1000;
        const idFound: number[] = [];
        for(let i = 0; i < this.enemies.length; i++)
        {
            const nextDistance = Math.hypot(this.enemies[i].getPositionX() - fromX, this.enemies[i].getPositionY() - fromY);
            if(maxDistance >= nextDistance)
            {
                idFound.push(i);
            }
        }
        if(idFound.length <= 0) return null;
        return this.enemies[idFound[Math.floor(Math.random() *  idFound.length)]];
    }
    public nextWave(currentTime: number): void
    {
        this.lastWaveTime = currentTime;
        this.currentWave++;
    }
    public isNextWaveReady(currentTime: number, mapLevel: number): boolean
    {
        if(this.currentWave >= mapLevel * 50) return false;
        const waveDuration = Math.max(5000 - (mapLevel - 1) * 500, 3000);
        if(this.lastWaveTime + waveDuration <= currentTime) return true;
        else return false;
    }
    public isBossReady(mapLevel: number): boolean
    {
        if(this.currentWave == mapLevel * 50) return true;
        return false;
    }
    public moveTowardsPlayer(playerHandle: Player, delta: number)
    {
        this.enemies.forEach(enemy => enemy.moveUnitTowardsPlayer(playerHandle, this, delta));
    }
}
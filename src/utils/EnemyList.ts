import Player from "./Player";
import Enemy from "./Enemy";

export default class EnemyList{
    private enemies: Enemy[];
    private currentWave: number;
    private lastWaveTime: number;

    constructor()
    {
        this.enemies = [];
        this.currentWave = 0;
        this.lastWaveTime = 0;
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
    public nextWave(currentTime: number): void
    {
        this.lastWaveTime = currentTime;
        this.currentWave++;
    }
    public isNextWaveReady(currentTime: number, mapLevel: number): boolean
    {
        if(this.currentWave >= mapLevel * 20) return false;
        const waveDuration = Math.max(5000 - mapLevel * 100, 1000);
        if(this.lastWaveTime + waveDuration < currentTime) return true;
        else return false;
    }
    public moveTowardsPlayer(playerHandle: Player, delta: number)
    {
        this.enemies.forEach(enemy => enemy.moveUnitTowardsPlayer(playerHandle, this, delta));
    }
}
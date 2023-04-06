import Player from "../player/Player";
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
    public nextWave(currentTime: number): void
    {
        this.lastWaveTime = currentTime;
        this.currentWave++;
    }
    public isNextWaveReady(currentTime: number, level: number): boolean
    {
        if(this.currentWave >= level * 10) return false;
        const waveDuration = Math.max(5000 - level * 100, 1000);
        if(this.lastWaveTime + waveDuration < currentTime) return true;
        else return false;
    }
    public moveTowardsPlayer(playerHandle: Player, delta: number)
    {
        this.enemies.forEach(enemy => enemy.moveUnitTowardsPlayer(playerHandle, this, delta));
    }
}
import { idLimit } from "../data/globalData";
import { SkillAnimation } from "./animationData";
import Enemy from "./enemy";
import EnemyList from "./enemyList";
import Player from "./player";

export class SkillBase{
    public anchorX: number;
    public anchorY: number;
    public explodeable: boolean;
    public onExplodeSkillCast: SkillBase | null = null;
    public damageRadius: number;
    public damage: number;
    public castTime: number;
    public cooldown: number;
    public speed: number;
    public scale: number;
    public damagingPlayer: boolean;
    public damagingEnemies: boolean;
    public skillName: string;
    public speaning: boolean;
    public destroyAfter: number;
    public enemyTargetHandle: Enemy | null = null;
    
    private id: string = Math.floor(Math.random() * idLimit).toString();
    private normalizedVectorX: number;
    private normalizedVectorY: number;
    
    protected positionX: number;
    protected positionY: number;
    protected destinationX: number;
    protected destinationY: number;
    protected rotation: number;
    protected exploded: boolean;
    protected animation: SkillAnimation = new SkillAnimation();
    protected damagedEnemyTimeById: Map<string, number> = new Map<string, number>();

    constructor(reference: SkillBase | null = null)
    {
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.explodeable = true;
        this.damageRadius = 50;
        this.damage = 1;
        this.castTime = 0;
        this.cooldown = 1000;
        this.speed = 1;
        this.scale = 1;
        this.damagingPlayer = false;
        this.damagingEnemies = true;
        this.skillName = "Empty";
        this.speaning = false;
        this.destroyAfter = 5000;
        this.normalizedVectorX = 0;
        this.normalizedVectorY = 0;
        this.positionX = 0;
        this.positionY = 0;
        this.destinationX = 0;
        this.destinationY = 0;
        this.rotation = 0;
        this.exploded = false;

        if(reference === null) return;
        this.id = (Math.floor(Math.random() * idLimit).toString());
        this.anchorX = reference.anchorX;
        this.anchorY = reference.anchorY;
        this.explodeable = reference.explodeable;
        this.onExplodeSkillCast = reference.onExplodeSkillCast;
        this.damageRadius = reference.damageRadius;
        this.damage = reference.damage;
        this.castTime = reference.castTime;
        this.cooldown = reference.cooldown;
        this.speed = reference.speed;
        this.scale = reference.scale;
        this.damagingPlayer = reference.damagingPlayer;
        this.damagingEnemies = reference.damagingEnemies;
        this.skillName = reference.skillName;
        this.animation = reference.animation;
        this.speaning = reference.speaning;
        this.destroyAfter = reference.destroyAfter;
    }
    public getRotation()
    {
        // TODO: Fix this later
        const half = 2;
        if(this.skillName === "Fire") return this.rotation - Math.PI / half;
        return this.rotation;
    }
    public getDamageRadius()
    {
        return this.damageRadius;
    }   
    public getSkillAnimation(): SkillAnimation
    {
        return this.animation;
    }
    public getName()
    {
        return this.skillName;
    }
    public isEnemyDamaged(id: string, gameTime: number)
    {
        const damageTime = this.damagedEnemyTimeById.get(id);
        if(damageTime !== undefined)
        {
            const cooldownRefreshTime = gameTime + this.cooldown;
            if(damageTime <= cooldownRefreshTime) return true;
        }
        return false;
    }
    public addDamageEnemy(id: string, gameTime: number)
    {
        this.damagedEnemyTimeById.set(id,gameTime);
    }
    public isDamagingEnemies()
    {
        return this.damagingEnemies;
    }
    public isDamagingPlayer()
    {
        return this.damagingPlayer;
    }
    public isExplodable()
    {
        return this.explodeable;
    }
    public getDamage()
    {
        return this.damage;
    }
    public getId()
    {
        return this.id;
    }
    public moveUnit(delta: number, miliseconds: number, currentEnemiesHandle: EnemyList, playerHandle: Player)
    {
        // TODO: Fix this if
        if(!this.isAlive(miliseconds))
        {
            this.explode();
        }
        if(this.speaning)
        {
            this.setPosition(...playerHandle.getPosition());
            const halfCircle = 180;
            this.rotation -= Math.PI / halfCircle * delta * this.speed;
        }
        else
        {
            const zeroDistance = 0;
            if(this.normalizedVectorX !== zeroDistance) this.positionX += this.normalizedVectorX * delta * this.speed;
            if(this.normalizedVectorY !== zeroDistance) this.positionY += this.normalizedVectorY * delta * this.speed;
        }
        // Skill damage
        for(let i = 0; i < currentEnemiesHandle.getList().length; i++)
        {
            const enemy = currentEnemiesHandle.getList()[i];
            const distanceEnemyToSkill = Math.hypot(enemy.getPositionX() - this.positionX, enemy.getPositionY() - this.positionY);

            if(distanceEnemyToSkill <= this.damageRadius
                && this.isDamagingEnemies()
                && !this.isEnemyDamaged(enemy.getId(), miliseconds)
                && !this.hasExploded())
            {
                this.addDamageEnemy(enemy.getId(), miliseconds);
                const strengthAddition = 1;
                enemy.addHp(- this.getDamage() * (playerHandle.getStrength() + strengthAddition));
                if(this.explodeable) this.explode();
            }
        }

    }
    public explode(): void
    {
        // For overriding. 
        this.exploded = true;

    }
    public hasExploded()
    {
        return this.exploded;
    }
    public update():void
    {
        // For overriding.     
    }
    public setRotation(value: number)
    {
        this.rotation = value;
    }
    private recalculateNormalizedVector()
    {
        const relativeLengthX = this.destinationX - this.positionX;
        const relativeLengthY = this.destinationY - this.positionY;
        const distance = Math.hypot(relativeLengthX, relativeLengthY);
        const minimumDistance = 5;
        if(distance > minimumDistance)
        {
            this.normalizedVectorX = relativeLengthX / distance;
            this.normalizedVectorY = relativeLengthY / distance;
            this.rotation = Math.atan2(this.normalizedVectorY, this.normalizedVectorX);
        }
        else
        {
            this.normalizedVectorX = 0;
            this.normalizedVectorY = 0;
        }

    }
    public setAnimation(value: SkillAnimation)
    {
        this.animation = value;
    }
    public setPosition(x: number, y: number)
    {
        this.positionX = x;
        this.positionY = y;
        if(!this.speaning) this.recalculateNormalizedVector();
    }
    public setDestination(x: number, y: number, enemy: Enemy | null = null)
    {
        const positionXIndex = 0;
        const positionYIndex = 1;
        const minimumDistance = 10;
        const isDestinationReached = this.enemyTargetHandle !== null
            && (Math.hypot(this.enemyTargetHandle.getPosition()[positionXIndex] - this.positionX, this.enemyTargetHandle.getPosition()[positionYIndex]-this.positionY) < minimumDistance);
        if(enemy !== null && this.enemyTargetHandle === null)
        {
            this.enemyTargetHandle = enemy;
        }
        else if(isDestinationReached)
        {
            this.enemyTargetHandle = enemy;
        }
        if(this.enemyTargetHandle === null)
        {
            this.destinationX = x;
            this.destinationY = y;
        }
        else
        {
            this.destinationX = this.enemyTargetHandle.getPositionX();
            this.destinationY = this.enemyTargetHandle.getPositionY();
        }
        if(!this.speaning) this.recalculateNormalizedVector();
    }
    public getPosition(): [x: number, y: number]
    {
        return [this.positionX, this.positionY];
    }
    public getDestination()
    {
        return [this.destinationX, this.destinationY];
    }
    public isAlive(miliseconds: number)
    {
        if(this.castTime + this.destroyAfter <= miliseconds) return false;
        return true;
    }
    public resetCooldown()
    {
        this.castTime = 0;
    }
}
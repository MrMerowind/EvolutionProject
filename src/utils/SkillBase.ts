import { BaseTexture } from "pixi.js";
import { SkillAnimation } from "./AnimationData";

export class SkillBase{
    private id: string;
    private skillName: string;
    protected positionX: number;
    protected positionY: number;
    protected finalPositionX: number;
    protected finalPositionY: number;
    protected rotation: number;
    protected anchorX: number;
    protected anchorY: number;
    protected anchorYFinal: number;
    protected middleOffsetMultiplier: number;
    protected normalizedVectorX: number;
    protected normalizedVectorY: number;
    protected isExploding: boolean;
    protected onExplodeSkill: SkillBase | null;
    protected angle: number;
    protected distanceLifetime: number;
    protected spaceRadiusDamage: number;
    protected damage: number;
    protected damageTimeCooldown: number;
    protected lastFiredTime: number;
    protected animation: SkillAnimation;
    protected speed: number;
    protected scale: number;

    protected damagingPlayer: boolean;
    protected damagingEnemies: boolean;
    protected damagedEnemyTimeById: Map<string, number>;
    protected fireCooldown: number;
    protected timeLasting: number;


    constructor(reference: SkillBase | null = null)
    {
        this.id = Math.floor(Math.random() * 1000000).toString();
        this.positionX = 0;
        this.positionY = 0;
        this.finalPositionX = 0;
        this.finalPositionY = 0;
        this.rotation = 0;
        this.anchorX = 0;
        this.anchorY = 0;
        this.anchorYFinal = 0;
        this.middleOffsetMultiplier = 0;
        this.normalizedVectorX = 0;
        this.normalizedVectorY = 0;
        this.isExploding = false;
        this.onExplodeSkill = null;
        this.angle = 0;
        this.distanceLifetime = 0;
        this.spaceRadiusDamage = 0;
        this.damage = 0;
        this.damageTimeCooldown = 1000;
        this.animation = new SkillAnimation();
        this.speed = 1;
        this.scale = 1;
        this.damagingEnemies = true;
        this.damagingPlayer = false;
        this.damagedEnemyTimeById = new Map<string, number>();
        this.skillName = "empty";
        this.lastFiredTime = 0;
        this.fireCooldown = 1000;
        this.timeLasting = 5000;

        if(reference === null) return;
        this.positionX = reference.positionX;
        this.positionY = reference.positionY;
        this.finalPositionX = reference.finalPositionX;
        this.finalPositionY = reference.finalPositionY;
        this.rotation = reference.rotation;
        this.anchorX = reference.anchorX;
        this.anchorY = reference.anchorY;
        this.anchorYFinal = reference.anchorYFinal;
        this.middleOffsetMultiplier = reference.middleOffsetMultiplier;
        this.normalizedVectorX = reference.normalizedVectorX;
        this.normalizedVectorY = reference.normalizedVectorY;
        this.isExploding = reference.isExploding;
        this.onExplodeSkill = reference.onExplodeSkill;
        this.angle = reference.angle;
        this.distanceLifetime = reference.distanceLifetime;
        this.spaceRadiusDamage = reference.spaceRadiusDamage;
        this.damage = reference.damage;
        this.damageTimeCooldown = reference.damageTimeCooldown;
        this.animation = reference.animation;
        this.speed = reference.speed;
        this.scale = reference.scale;
        this.damagingEnemies = reference.damagingEnemies;
        this.damagingPlayer = reference.damagingPlayer;
        // this.damagedEnemyTimeById = new Map<string, number>();
        this.skillName = reference.skillName;
        this.lastFiredTime = reference.lastFiredTime;
        this.fireCooldown = reference.fireCooldown;
        this.timeLasting = reference.timeLasting;
    }
    public getPositionX()
    {
        return this.positionX;
    }
    public getPositionY()
    {
        return this.positionY;
    }
    public getDestinationX()
    {
        return this.finalPositionX;
    }
    public getDestinationY()
    {
        return this.finalPositionY;
    }
    public getFireCooldown()
    {
        return this.fireCooldown;
    }
    public getAngle()
    {
        return this.angle;
    }
    public getMiddleOffsetMultiplier()
    {
        return this.middleOffsetMultiplier;
    }
    public getSpaceRadiusDamage()
    {
        return this.spaceRadiusDamage;
    }   
    public getSkillAnimation(): SkillAnimation
    {
        return this.animation;
    }
    public getName()
    {
        return this.skillName;
    }
    public getLastFiredTime()
    {
        return this.lastFiredTime;
    }
    public isEnemyDamaged(id: string, gameTime: number)
    {
        const damageTime = this.damagedEnemyTimeById.get(id);
        if(damageTime !== undefined)
        {
            const cooldownRefreshTime = gameTime + this.damageTimeCooldown;
            if(damageTime > cooldownRefreshTime) return true;
        }

        return false;
    }
    public isDamagingEnemies()
    {
        return this.damagingEnemies;
    }
    public isDamagingPlayer()
    {
        return this.damagingPlayer;
    }
    public getDamage()
    {
        return this.damage;
    }
    public getDamageTimeCooldown()
    {
        return this.damageTimeCooldown;
    }
    public getId()
    {
        return this.id;
    }
    public getScale()
    {
        return this.scale;
    }
    public getAnchor(): [x: number, y: number]
    {
        return [this.anchorX, this.anchorYFinal];
    }
    public getTimeLasting(): number
    {
        return this.timeLasting;
    }
    public moveUnit(delta: number)
    {
        if(this.normalizedVectorX !== 0 || this.normalizedVectorY !== 0)
        {
            this.positionX += this.normalizedVectorX * delta * this.speed; 
            this.positionY += this.normalizedVectorY * delta * this.speed; 
        }
        const distanceFromDestinationX = this.finalPositionX - this.positionX;
        const distanceFromDestinationY = this.finalPositionY - this.positionY;

        const distanceFromDestination = Math.hypot(distanceFromDestinationX, distanceFromDestinationY);

        if(Math.abs(distanceFromDestination) < this.spaceRadiusDamage) this.explode();

    }
    public explode(): void
    {
        // For overriding.     
    }
    public update(delta: number):void
    {
        // For overriding.     
    }
    public setAnchor(x: number, y: number)
    {
        this.anchorX = x;
        this.anchorY = y;
        this.anchorYFinal = y * this.middleOffsetMultiplier;
    }
    public setRotation(value: number)
    {
        this.rotation = value;
    }
    public setMiddleOffsetMultiplier(value: number)
    {
        this.middleOffsetMultiplier = value;
        this.anchorYFinal = this.anchorY * this.middleOffsetMultiplier;
    }
    private recalculateNormalizedVector()
    {
        const relativeLengthX = this.finalPositionX - this.positionX;
        const relativeLengthY = this.finalPositionY - this.positionY;
        const distance = Math.hypot(relativeLengthX, relativeLengthY);
        if(distance > 0)
        {
            this.normalizedVectorX = relativeLengthX / distance;
            this.normalizedVectorY = relativeLengthY / distance;
        }
        else
        {
            this.normalizedVectorX = 0;
            this.normalizedVectorY = 0;
        }

        this.angle = Math.atan2(this.normalizedVectorY, this.normalizedVectorX);

    }
    public setDestination(x: number, y: number)
    {
        this.finalPositionX = x;
        this.finalPositionY = y;
        this.recalculateNormalizedVector();
    }
    public setPosition(x: number, y: number)
    {
        this.positionX = x;
        this.positionY = y;
        this.recalculateNormalizedVector();
    }
    public setSpaceRadiusDamage(value: number)
    {
        this.spaceRadiusDamage = value;
    }
    public setDamage(value: number)
    {
        this.damage = value;
    }
    public setDamageTimeCooldown(value: number)
    {
        this.damageTimeCooldown = value;
    }
    public setScale(value: number)
    {
        this.scale = value;
    }
    public setDamagingPlayer(value: boolean)
    {
        this.damagingPlayer = value;
    }
    public setDamagingEnemies(value: boolean)
    {
        this.damagingEnemies = value;
    }
    public setName(value: string)
    {
        this.skillName = value;
    }
    public setFireTime(value: number)
    {
        this.fireCooldown = value;
    }
    public setAnimation(value: SkillAnimation)
    {
        this.animation = value;
    }
    public addFireTime()
    {
        this.lastFiredTime += this.fireCooldown;
    }
    public setTimeLasting(value: number)
    {
        this.timeLasting = value;
    }
    public setSpeed(value: number)
    {
        this.speed = value;
    }
}
import { SkillAnimation } from "./AnimationData";
import EnemyList from "./EnemyList";

export class SkillBase{
    public anchorX = 0.5;
    public anchorY = 0.5;
    public explodeable = true;
    public onExplodeSkillCast: SkillBase | null = null;
    public damageRadius = 50;
    public damage = 1;
    public castTime = 0;
    public cooldown = 1000;
    public speed = 1;
    public scale = 1;
    public damagingPlayer = false;
    public damagingEnemies = true;
    public skillName = "Empty";
    
    private id: string = Math.floor(Math.random() * 1000000).toString();
    private normalizedVectorX = 0;
    private normalizedVectorY = 0;
    
    protected positionX = 0;
    protected positionY = 0;
    protected destinationX = 0;
    protected destinationY = 0;
    protected rotation = 0;
    protected exploded = false;
    protected animation: SkillAnimation = new SkillAnimation();
    protected damagedEnemyTimeById: Map<string, number> = new Map<string, number>();


    constructor(reference: SkillBase | null = null)
    {
        if(reference === null) return;
        this.id = (Math.floor(Math.random() * 1000000).toString());
        this.anchorX = reference.anchorX;
        this.anchorY = reference.anchorY;
        this.explodeable = reference.explodeable;
        this.onExplodeSkillCast = reference.onExplodeSkillCast;
        this.damageRadius = reference.damageRadius;
        this.damage = reference.damage;
        this.castTime = 0;
        this.cooldown = reference.cooldown;
        this.speed = reference.speed;
        this.scale = reference.scale;
        this.damagingPlayer = reference.damagingPlayer;
        this.damagingEnemies = reference.damagingEnemies;
        this.skillName = reference.skillName;
        this.animation = reference.animation;
    }
    public getRotation()
    {
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
            if(damageTime > cooldownRefreshTime) return true;
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
    public moveUnit(delta: number, miliseconds: number, currentEnemiesHandle: EnemyList)
    {
        if(this.normalizedVectorX !== 0) this.positionX += this.normalizedVectorX * delta * this.speed;
        if(this.normalizedVectorY !== 0) this.positionY += this.normalizedVectorY * delta * this.speed;

        // Skill damage
        for(let i = 0; i < currentEnemiesHandle.getList().length; i++)
        {
            const enemy = currentEnemiesHandle.getList()[i];
            const distanceEnemyToSkill = Math.hypot(enemy.getPositionX() - this.positionX, enemy.getPositionY() - this.positionY);

            // TODO: hasExploded() not working
            if(distanceEnemyToSkill <= this.damageRadius
                && this.isDamagingEnemies()
                && !this.isEnemyDamaged(enemy.getId(), miliseconds)
                && !this.hasExploded())
            {
                this.addDamageEnemy(enemy.getId(), miliseconds);
                enemy.addHp(- this.getDamage());
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
    public update(delta: number):void
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

        this.rotation = Math.atan2(this.normalizedVectorY, this.normalizedVectorX);

    }
    public setAnimation(value: SkillAnimation)
    {
        this.animation = value;
    }
    public setPosition(x: number, y: number)
    {
        this.positionX = x;
        this.positionY = y;
        this.recalculateNormalizedVector();
    }
    public setDestination(x: number, y: number)
    {
        this.destinationX = x;
        this.destinationY = y;
        this.recalculateNormalizedVector();
    }
    public getPosition()
    {
        return [this.positionX, this.positionY];
    }
    public getDestination()
    {
        return [this.destinationX, this.destinationY];
    }
    public isAlive(miliseconds: number)
    {
        return this.castTime + this.cooldown < miliseconds;
    }
}
import { CreatureAnimation } from "./AnimationData";
import EnemyList from "./EnemyList";
import { AnimationState } from "../data/Types";

export default class Player{
    private id: string;
    private level: number;
    private currentExp: number;
    private strength: number;
    private vitality: number;
    private agility: number;
    private currentHp: number;
    private points: number;
    private positionX: number;
    private positionY: number;
    private readonly spaceRadius: number = 40;
    public readonly scale = 1;
    public readonly speed = 5;
    public readonly agilityMultipier = 0.01;
    private speedThroughEnemies = 1;

    private animationDataWalking: CreatureAnimation;
    private animationDataAttacking: CreatureAnimation;
    private animationDataStanding: CreatureAnimation;

    constructor()
    {
        this.id = Math.floor(Math.random() * 1e20).toString();
        this.level = 1;
        this.currentExp = 0;
        this.strength = 0;
        this.vitality = 0;
        this.agility = 0;
        this.currentHp = this.getMaxHp();
        this.points = 1;
        this.positionX = 0;
        this.positionY = 0;
        this.animationDataWalking = new CreatureAnimation();
        this.animationDataAttacking = new CreatureAnimation();
        this.animationDataStanding = new CreatureAnimation();
    }
    public getSpaceRadius(): number
    {
        return this.spaceRadius;
    }
    public getAnimationData(animationState: AnimationState): CreatureAnimation
    {
        switch(animationState)
        {
        case AnimationState.attacking: return this.animationDataAttacking;
        case AnimationState.standing: return this.animationDataStanding;
        case AnimationState.walking: return this.animationDataWalking;
        }
        throw new Error("Unknown animationState in Player.getAnimationData()");
    }
    public getPositionX(): number
    {
        return this.positionX;
    }
    public getPositionY(): number
    {
        return this.positionY;
    }
    public getPosition(): [x: number, y: number]
    {
        return [this.positionX, this.positionY];
    }
    public getId(): string
    {
        return this.id;
    }
    public getMaxHp(): number
    {
        return 1000 * (this.vitality + 1);
    }
    public getCurrentHp(): number
    {
        return this.currentHp;
    }
    public getNeededExp(): number
    {
        return (this.level * 200);
    }
    public getCurrentExp(): number
    {
        return this.currentExp;
    }
    public getStrength(): number
    {
        return this.strength;
    }
    public getVitality(): number
    {
        return this.vitality;
    }
    public getAgility(): number
    {
        return this.agility;
    }
    public getLevel(): number
    {
        return this.level;
    }
    public getPoints(): number
    {
        return this.points;
    }
    public getSpeed(): number
    {
        return this.speed + this.speed * this.agilityMultipier * this.getAgility();
    }
    public getSpeedThorughEnemies(): number
    {
        return this.speedThroughEnemies + this.speedThroughEnemies * this.agilityMultipier * this.getAgility();
    }
    public move(x:number, y: number)
    {
        this.positionX += x;
        this.positionY += y;
    }
    public moveUnits(x:number, y: number, enemyListHandle: EnemyList, delta: number)
    {
        // Preventing moving too fast on both axises
        const distance = Math.hypot(x,y);

        let newPositionX = this.positionX;
        let newPositionY = this.positionY;

        if(x !== 0)
        {
            newPositionX = this.positionX + x / distance * this.getSpeed() * delta;
        }
        if(y !== 0)
        {
            newPositionY = this.positionY + y / distance * this.getSpeed() * delta;
        }


        // Prevent moving through enemy
        let freeWalk = true;
        enemyListHandle.getList().forEach(enemy => {
            const distanceToAnother = Math.hypot(newPositionX - enemy.getPositionX(), newPositionY - enemy.getPositionY());
            const minimumSpaceBetween = Math.max(enemy.getSpaceRadius(), this.spaceRadius);
            if(distanceToAnother <= minimumSpaceBetween)
            {
                freeWalk = false;
                return;
            }
        });
        if(!freeWalk)
        {
            if(x !== 0)
            {
                newPositionX = this.positionX + x / distance * this.getSpeedThorughEnemies() * delta;
            }
            if(y !== 0)
            {
                newPositionY = this.positionY + y / distance * this.getSpeedThorughEnemies() * delta;
            }
            this.positionX = newPositionX;
            this.positionY = newPositionY;
        }

        this.positionX = newPositionX;
        this.positionY = newPositionY;
        
    }
    public addHp(value: number): void
    {
        this.currentHp += value;
        if(this.currentHp < 0) this.currentHp = 0;
        if(this.currentHp > this.getMaxHp()) this.currentHp = this.getMaxHp();
    }
    public subtractHp(value: number): void
    {
        this.currentHp -= value;
        if(this.currentHp < 0) this.currentHp = 0;
        if(this.currentHp > this.getMaxHp()) this.currentHp = this.getMaxHp();
    }
    public addExp(value: number): void
    {
        this.currentExp += value;
        if(this.currentExp < 0) this.currentExp = 0;
        while(this.currentExp >= this.getNeededExp())
        {
            this.currentExp -= this.getNeededExp();
            this.addLevel(1);
            this.addPoints(1);
        }
    }
    public addStrength(value: number): void
    {
        if(value < 0) return;
        if(this.points < value) return;
        this.strength += value;
        this.points -= value;
    }
    public addVitality(value: number): void
    {
        if(value < 0) return;
        if(this.points < value) return;
        this.vitality += value;
        this.points -= value;
    }
    public addAgility(value: number): void
    {
        if(value < 0) return;
        if(this.points < value) return;
        this.agility += value;
        this.points -= value;
    }
    public addLevel(value: number): void
    {
        if(value < 0) return;
        this.level += value;
    }
    public addPoints(value: number): void
    {
        this.points += value;
        if(this.points < 0)
        {
            throw new Error("Player points are below zero");
        }
    }
}
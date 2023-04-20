import { CreatureAnimation } from "./AnimationData";
import EnemyList from "./EnemyList";
import { AnimationState } from "../data/Types";
import { idLimit } from "../data/globalData";

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
    private readonly spaceRadius: number;
    public readonly scale;
    public readonly speed;
    public readonly agilityMultipier;
    private speedThroughEnemies;

    private animationDataWalking: CreatureAnimation;
    private animationDataAttacking: CreatureAnimation;
    private animationDataStanding: CreatureAnimation;

    constructor()
    {
        this.spaceRadius = 40;
        this.scale = 1;
        this.speed = 5;
        this.agilityMultipier = 0.01;
        this.speedThroughEnemies = 1;

        this.id = Math.floor(Math.random() * idLimit).toString();
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

        const savedLevel = localStorage.getItem("Player_level");
        const savedAgility = localStorage.getItem("Player_agility");
        const savedVitality = localStorage.getItem("Player_vitality");
        const savedStrength = localStorage.getItem("Player_strength");
        const savedExp = localStorage.getItem("Player_exp");
        const savedPoints = localStorage.getItem("Player_points");

        if(savedLevel) this.level = parseInt(savedLevel);
        if(savedAgility) this.agility = parseInt(savedAgility);
        if(savedVitality) this.vitality = parseInt(savedVitality);
        if(savedStrength) this.strength = parseInt(savedStrength);
        if(savedExp) this.currentExp = parseInt(savedExp);
        if(savedPoints) this.points = parseInt(savedPoints);

        this.currentHp = this.getMaxHp();

    }
    public saveToLocalStorage()
    {
        localStorage.setItem("Player_level", this.level.toString());
        localStorage.setItem("Player_agility", this.agility.toString());
        localStorage.setItem("Player_vitality", this.vitality.toString());
        localStorage.setItem("Player_strength", this.strength.toString());
        localStorage.setItem("Player_exp", this.currentExp.toString());
        localStorage.setItem("Player_points", this.points.toString());
    }
    public resetStats()
    {
        this.level = 1;
        this.agility = 0;
        this.vitality = 0;
        this.strength = 0;
        this.currentExp = 0;
        this.points = 1;
        this.saveToLocalStorage();
        this.currentHp = this.getMaxHp();
    }
    public getSpaceRadius(): number
    {
        return this.spaceRadius;
    }
    public addSpeedThroughEnemies(points: number)
    {
        const multiplier = 0.5;
        this.speedThroughEnemies += multiplier * points;
    }
    public resetSpeedThroughEnemies()
    {
        this.speedThroughEnemies = 1;
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
        const baseHp = 1000;
        const vitalityIncreaser = 1;
        return baseHp * (this.vitality + vitalityIncreaser);
    }
    public getCurrentHp(): number
    {
        return this.currentHp;
    }
    public getNeededExp(): number
    {
        const baseExpNeed = 200;
        return (this.level * baseExpNeed);
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

        const zeroUnits = 0;

        if(x !== zeroUnits)
        {
            newPositionX = this.positionX + x / distance * this.getSpeed() * delta;
        }
        if(y !== zeroUnits)
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
            if(x !== zeroUnits)
            {
                newPositionX = this.positionX + x / distance * this.getSpeedThorughEnemies() * delta;
            }
            if(y !== zeroUnits)
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
        const minimumHp = 0;
        if(this.currentHp < minimumHp) this.currentHp = minimumHp;
        if(this.currentHp > this.getMaxHp()) this.currentHp = this.getMaxHp();
    }
    public subtractHp(value: number): void
    {
        this.currentHp -= value;
        const minimumHp = 0;
        if(this.currentHp < minimumHp) this.currentHp = minimumHp;
        if(this.currentHp > this.getMaxHp()) this.currentHp = this.getMaxHp();
    }
    public addExp(value: number): void
    {
        this.currentExp += value;
        const miminumExp = 0;
        const levelStep = 1;
        const pointsStep = 1;
        if(this.currentExp < miminumExp) this.currentExp = miminumExp;
        while(this.currentExp >= this.getNeededExp())
        {
            this.currentExp -= this.getNeededExp();
            this.addLevel(levelStep);
            this.addPoints(pointsStep);
        }
        this.saveToLocalStorage();
    }
    public addStrength(value: number): void
    {
        const minimumAddedValue = 0;
        if(value < minimumAddedValue) return;
        if(this.points < value) return;
        this.strength += value;
        this.points -= value;
        this.saveToLocalStorage();
    }
    public addVitality(value: number): void
    {
        const minimumAddedValue = 0;
        if(value < minimumAddedValue) return;
        if(this.points < value) return;
        this.vitality += value;
        this.points -= value;
        this.saveToLocalStorage();
    }
    public addAgility(value: number): void
    {
        const minimumAddedValue = 0;
        if(value < minimumAddedValue) return;
        if(this.points < value) return;
        this.agility += value;
        this.points -= value;
        this.saveToLocalStorage();
    }
    public addLevel(value: number): void
    {
        const minimumAddedValue = 0;
        if(value < minimumAddedValue) return;
        this.level += value;
        this.saveToLocalStorage();
    }
    public addPoints(value: number): void
    {
        this.points += value;
        const minimumAddedValue = 0;
        if(this.points < minimumAddedValue)
        {
            throw new Error("Player points are below zero");
        }
        this.saveToLocalStorage();
    }
}
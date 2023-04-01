import { PlayerOutfit } from "./PlayerOutfit";

export default class Player{
    private id: string;
    private level: number;
    private currentExp: number;
    private strength: number;
    private vitality: number;
    private agility: number;
    private currentHp: number;
    private points: number;
    private playerOutfit: PlayerOutfit;
    private positionX: number;
    private positionY: number;
    public readonly scale = 10;

    constructor()
    {
        this.id = Math.floor(Math.random() * 1000000).toString();
        this.level = 1;
        this.currentExp = 0;
        this.strength = 0;
        this.vitality = 0;
        this.agility = 0;
        this.currentHp = this.getMaxHp();
        this.points = 0;
        this.playerOutfit = new PlayerOutfit();
        this.positionX = 0;
        this.positionY = 0;
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
    public getOutfit(): PlayerOutfit
    {
        return this.playerOutfit;
    }
    public getId(): string
    {
        return this.id;
    }
    public getMaxHp(): number
    {
        return 100 * (this.vitality + 1);
    }
    public getCurrentHp(): number
    {
        return this.currentHp;
    }
    public getNeededExp(): number
    {
        return (this.level * 10);
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


    public addHp(value: number): void
    {
        this.currentHp += value;
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
        }
    }
    public addStrength(value: number): void
    {
        if(value < 0) return;
        this.strength += value;
    }
    public addVitality(value: number): void
    {
        if(value < 0) return;
        this.vitality += value;
    }
    public addAgility(value: number): void
    {
        if(value < 0) return;
        this.agility += value;
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
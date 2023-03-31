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
    public readonly scale = 0.2;

    constructor()
    {
        this.id = Math.floor(Math.random() * 1000000).toString();
        this.level = 1;
        this.currentExp = 0;
        this.strength = 0;
        this.vitality = 0;
        this.agility = 0;
        this.currentHp = this.GetMaxHp();
        this.points = 0;
        this.playerOutfit = new PlayerOutfit();
        this.positionX = 0;
        this.positionY = 0;
    }

    public GetPositionX(): number
    {
        return this.positionX;
    }
    public GetPositionY(): number
    {
        return this.positionY;
    }
    public GetPosition(): [x: number, y: number]
    {
        return [this.positionX, this.positionY];
    }
    public GetOutfit(): PlayerOutfit
    {
        return this.playerOutfit;
    }
    public GetId(): string
    {
        return this.id;
    }
    public GetMaxHp(): number
    {
        return 100 * (this.vitality + 1);
    }
    public GetCurrentHp(): number
    {
        return this.currentHp;
    }
    public GetNeededExp(): number
    {
        return (this.level * 10);
    }
    public GetCurrentExp(): number
    {
        return this.currentExp;
    }
    public GetStrength(): number
    {
        return this.strength;
    }
    public GetVitality(): number
    {
        return this.vitality;
    }
    public GetAgility(): number
    {
        return this.agility;
    }
    public GetLevel(): number
    {
        return this.level;
    }
    public GetPoints(): number
    {
        return this.points;
    }


    public AddHp(value: number): void
    {
        this.currentHp += value;
        if(this.currentHp < 0) this.currentHp = 0;
        if(this.currentHp > this.GetMaxHp()) this.currentHp = this.GetMaxHp();
    }
    public AddExp(value: number): void
    {
        this.currentExp += value;
        if(this.currentExp < 0) this.currentExp = 0;
        while(this.currentExp >= this.GetNeededExp())
        {
            this.currentExp -= this.GetNeededExp();
            this.AddLevel(1);
        }
    }
    public AddStrength(value: number): void
    {
        if(value < 0) return;
        this.strength += value;
    }
    public AddVitality(value: number): void
    {
        if(value < 0) return;
        this.vitality += value;
    }
    public AddAgility(value: number): void
    {
        if(value < 0) return;
        this.agility += value;
    }
    public AddLevel(value: number): void
    {
        if(value < 0) return;
        this.level += value;
    }
    public AddPoints(value: number): void
    {
        this.points += value;
        if(this.points < 0)
        {
            throw new Error("Player point are below zero");
        }
    }
}
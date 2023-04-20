import { BaseTexture } from "pixi.js";

export default class SkillSelect{
    private skillLevels: number[];
    private background: BaseTexture | null = null;
    private overlay: BaseTexture | null = null;
    private bar: BaseTexture | null = null;
    private button: BaseTexture | null = null;
    private possibleUpgrade: number[] = [];
    public readonly maxSkillLevel: number;
    private readonly upgradeChoiceCount: number;

    private points: number;

    public constructor()
    {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        this.skillLevels = [1,0,0,0,0,0,0,0,0,0,0];
        this.maxSkillLevel = 10;
        this.upgradeChoiceCount = 3;
        this.points = 0;
        this.randomizeUpgrades();
    }
    public reset()
    {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        this.skillLevels = [1,0,0,0,0,0,0,0,0,0,0];
        this.possibleUpgrade = [];
        this.points = 0;
    }
    public getPoints()
    {
        return this.points;
    }
    public addPoints(value: number)
    {
        const minimumValue = 0;
        if(value <= minimumValue) return;
        this.points += value;
        this.randomizeUpgrades();
    }
    public removePoints(value: number)
    {
        const minimumValue = 0;
        if(value <= minimumValue) return;
        this.points -= value;
    }
    public getSkillLevel(index: number)
    {
        return this.skillLevels[index];
    }
    public upgradeSkill(index: number)
    {
        this.skillLevels[index]++;
        if(this.skillLevels[index] > this.maxSkillLevel)
        {
            this.skillLevels[index] = this.maxSkillLevel;
        }
    }
    public setBackground(texture: BaseTexture)
    {
        this.background = texture;
    }
    public setOverlay(texture: BaseTexture)
    {
        this.overlay = texture;
    }
    public setBar(texture: BaseTexture)
    {
        this.bar = texture;
    }
    public setButton(texture: BaseTexture)
    {
        this.button = texture;
    }
    public randomizeUpgrades()
    {
        const one = 1;
        const minimumValue = 0;
        this.possibleUpgrade = [];
        const arrayOfPossibleUpgradeIndexes: number[] = [];
        for(let i = 0; i < this.skillLevels.length; i++)
        {
            if(this.getSkillLevel(i) >= this.maxSkillLevel) continue;
            
            arrayOfPossibleUpgradeIndexes.push(i);
        }
        for (let i = arrayOfPossibleUpgradeIndexes.length - one; i > minimumValue; i--)
        {
            const j = Math.floor(Math.random() * (i + one));
            const temp = arrayOfPossibleUpgradeIndexes[i];
            arrayOfPossibleUpgradeIndexes[i] = arrayOfPossibleUpgradeIndexes[j];
            arrayOfPossibleUpgradeIndexes[j] = temp;
        }
        for(let i = 0; i < this.upgradeChoiceCount; i++)
        {
            this.possibleUpgrade.push(arrayOfPossibleUpgradeIndexes[i]);
        }
    }
    public getPossibleUpgradeIndexes()
    {
        return this.possibleUpgrade;
    }
    public isIndexInPossibleUpgradeIndexes(index: number): boolean
    {
        for(let i = 0; i < this.possibleUpgrade.length; i++)
        {
            if(this.possibleUpgrade[i] === index) return true;
        }
        return false;
    }
    public getBackgroud()
    {
        return this.background;
    }
    public getOverlay()
    {
        return this.overlay;
    }
    public getBar()
    {
        return this.bar;
    }
    public getButton()
    {
        return this.button;
    }
}
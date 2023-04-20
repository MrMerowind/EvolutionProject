import { SkillBase } from "./skillBase";

export default class SkillList{
    private skills: Map<string, SkillBase>;

    constructor()
    {
        this.skills = new Map<string, SkillBase>();
    }

    public getMap(): Map<string, SkillBase>
    {
        return this.skills;
    }
    public addSkillPrototype(skill: SkillBase)
    {
        const name = skill.getName();
        this.skills.set(name, skill);
    }
    public reset()
    {
        this.skills.clear();
    }
    public castSkill(skill: SkillBase)
    {
        const id = skill.getId();
        this.skills.set(id, skill);
    }
    public getSkill(name: string): SkillBase | undefined
    {
        return this.skills.get(name);
    }
    public resetCooldowns()
    {
        this.skills.forEach(skill => skill.resetCooldown());
    }
}
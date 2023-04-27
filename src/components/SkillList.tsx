import React from "react";
import SkillComponent from "./Skill";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import { SkillBase } from "../utils/skillBase";

interface SkillListComponentProps{
    miliseconds: number;
    delta: number;
}

export default function SkillListComponent(props: SkillListComponentProps) {

    const ctx = useGameManagerStore();

    const result: JSX.Element[] = [];

    ctx.skillListOnScreen.getMap().forEach((skill, skillKey) => {
        
        skill.moveUnit(props.delta, props.miliseconds, ctx.enemyList, ctx.player);
        
        if(!skill.hasExploded()) {
            result.push(<SkillComponent miliseconds={props.miliseconds} skillData={skill} key={skill.getId()}/>);
        }
        else if(skill.onExplodeSkillCast !== null)
        {
            const followedSkill = new SkillBase(skill.onExplodeSkillCast);
            followedSkill.setPosition(...skill.getPosition());  
            followedSkill.castTime = props.miliseconds;
            followedSkill.setDestination(...skill.getPosition());             
            ctx.skillListOnScreen.castSkill(followedSkill);
        }
        if(skill.hasExploded()) ctx.skillListOnScreen.getMap().delete(skillKey);
    });

    return (
        <>
            {result.map(element => element)}
        </>
    );
}

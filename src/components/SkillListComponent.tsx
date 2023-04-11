import React from "react";
import SkillComponent from "./SkillComponent";
import { useGameManagerStore } from "../hooks/useGameManagerStore";

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
        else
        {
            ctx.skillListOnScreen.getMap().delete(skillKey);
        }
    });

    return (
        <>
            {result.map(element => element)}
        </>
    );
}

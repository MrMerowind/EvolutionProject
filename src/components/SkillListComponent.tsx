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
    ctx.skillListOnScreen.getMap().forEach((skill) => {

        if(skill.isAlive(props.miliseconds) && !skill.hasExploded()) {
            skill.moveUnit(props.delta, props.miliseconds, ctx.enemyList);
            result.push(<SkillComponent miliseconds={props.miliseconds} skillData={skill} key={skill.getId()}/>);
        }
    });

    return (
        <>
            {result.map(element => element)}
        </>
    );
}

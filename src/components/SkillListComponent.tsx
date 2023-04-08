import React from "react";
import SkillList from "../utils/SkillList";
import SkillComponent from "./SkillComponent";

interface SkillListComponentProps{
    skillList: SkillList;
    miliseconds: number;
}

export default function SkillListComponent(props: SkillListComponentProps) {

    console.log("Skill list component: ", props.skillList);

    const result: JSX.Element[] = [];
    props.skillList.getMap().forEach((skill) => {
        const isAlive = skill.getLastFiredTime() + skill.getTimeLasting() >  + props.miliseconds;
        if(isAlive) {
            result.push(<SkillComponent miliseconds={props.miliseconds} skillData={skill} key={skill.getId()}/>);
        }
    });

    return (
        <>
            {result.map(element => element)}
        </>
    );
}

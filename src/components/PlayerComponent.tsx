import React, { useEffect, useState } from "react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import { AnimationState, Direction, DirectionHorizontal } from "../data/Types";
import { AnimationComponent } from "./AnimationComponent";
import { useTick } from "@pixi/react";
import { SkillBase } from "../utils/SkillBase";


interface PlayerComponentProps{
  miliseconds: number;
  delta: number;
}

export default function PlayerComponent(props: PlayerComponentProps) {

    const ctx = useGameManagerStore();

    const [buttonLeftPressed, setButtonLeftPressed] = useState(false);
    const [buttonRightPressed, setButtonRightPressed] = useState(false);
    const [buttonUpPressed, setButtonUpPressed] = useState(false);
    const [buttonDownPressed, setButtonDownPressed] = useState(false);
    const [facedDirection, setFacedDirection] = useState<Direction>(Direction.left);
    const [facedSecondaryDirection, setFacedSecondaryDirection] = useState<DirectionHorizontal>(DirectionHorizontal.left);

    const handleUserKeyPressDown = (e: KeyboardEvent) => {
        if (e.code === "KeyW") { setButtonUpPressed(true); setFacedDirection(Direction.up);}
        if (e.code === "KeyS") { setButtonDownPressed(true); setFacedDirection(Direction.down);}
        if (e.code === "KeyA") { setButtonLeftPressed(true); setFacedDirection(Direction.left); setFacedSecondaryDirection(DirectionHorizontal.left);}
        if (e.code === "KeyD") { setButtonRightPressed(true); setFacedDirection(Direction.right); setFacedSecondaryDirection(DirectionHorizontal.right);}
        // TODO: Remove for production
        if (e.code === "KeyI") {ctx.map.previousLevel();}
        if (e.code === "KeyO") {ctx.map.nextLevel();}
        if (e.code === "KeyP") {ctx.player.addLevel(1);ctx.player.addPoints(1);}
    };

    const handleUserKeyPressUp = (e: KeyboardEvent) => {
        if (e.code === "KeyW") { setButtonUpPressed(false); }
        if (e.code === "KeyA") { setButtonLeftPressed(false); }
        if (e.code === "KeyD") { setButtonRightPressed(false); }
        if (e.code === "KeyS") { setButtonDownPressed(false); }
    };



    useEffect(() => {
        window.addEventListener("keydown", handleUserKeyPressDown);
        window.addEventListener("keyup", handleUserKeyPressUp);

        return () => {
            window.removeEventListener("keydown", handleUserKeyPressDown);
            window.removeEventListener("keyup", handleUserKeyPressUp);
        };
    }, []);

    useTick((delta) => {
        const x = (buttonLeftPressed ? -1 : 0) + (buttonRightPressed ? 1 : 0);
        const y = (buttonUpPressed ? -1 : 0) + (buttonDownPressed ? 1 : 0);
        ctx.player.moveUnits(x, y, ctx.enemyList, delta);
    });

    const [playerPosition, setPlayerPosition] = useState(ctx.player.getPosition());

    useEffect(() => {
        setPlayerPosition([ctx.player.getPositionX(), ctx.player.getPositionY()]);
    }, [props.miliseconds]);

    const [animationState, setAnimationState] = useState(AnimationState.standing);
    useEffect(() => {
        if(buttonDownPressed || buttonLeftPressed || buttonRightPressed || buttonUpPressed) setAnimationState(AnimationState.walking);
        else setAnimationState(AnimationState.standing);
    }, [buttonDownPressed, buttonLeftPressed, buttonRightPressed, buttonUpPressed]);


    const playerOnScreenPositionX = playerPosition[0] - ctx.camera.getOffsetX();
    const playerOnScreenPositionY = playerPosition[1] - ctx.camera.getOffsetY();


    useEffect(() => {
        ctx.skillListAvaliable.getMap().forEach((skill) => {

            const skillAvailableAt = skill.castTime + skill.cooldown;
            const nearestEnemyToSkill = ctx.enemyList.getNearest(skill.getPosition()[0], skill.getPosition()[1]);

            const nearestEnemyToPlayer = ctx.enemyList.getNearest(ctx.player.getPosition()[0], ctx.player.getPosition()[1]);
            if(nearestEnemyToPlayer === null) return;
            const enemyDistanceToPlayer = Math.hypot(nearestEnemyToPlayer.getPositionX() - ctx.player.getPositionX(),
                nearestEnemyToPlayer.getPositionY() - ctx.player.getPositionY());
            const visibleDistanceOnScreen = Math.min(...ctx.screen.getCenter());
            
            if(nearestEnemyToSkill !== null && enemyDistanceToPlayer < visibleDistanceOnScreen)
            {  
                if(skillAvailableAt <= props.miliseconds /*&& ctx.skillSelect.getPoints() <= 0*/)
                {
                    skill.castTime = props.miliseconds;
                    const skillCopy = new SkillBase(skill);
                    skillCopy.castTime = props.miliseconds;
                    skillCopy.setPosition(playerPosition[0], playerPosition[1]);
                    if(skillCopy.getName() === "Orb") skillCopy.setDestination(...nearestEnemyToSkill.getPosition());
                    if(skillCopy.getName() === "Poison")
                    {
                        const randomPositionX = ctx.player.getPositionX() + Math.random() * ctx.screen.getWidth() - ctx.screen.getCenterHorizontal();
                        const randomPositionY = ctx.player.getPositionY() + Math.random() * ctx.screen.getHeight() - ctx.screen.getCenterVertical();
                        skillCopy.setPosition(randomPositionX, randomPositionY);
                        skillCopy.setDestination(randomPositionX, randomPositionY);
                    }
                    const randomEnemyInRange = ctx.enemyList.getRandomClose(...ctx.player.getPosition());
                    if(randomEnemyInRange !== null && (skillCopy.getName() === "Arrow" || skillCopy.getName() === "Bird")) skillCopy.setDestination(...randomEnemyInRange.getPosition(),randomEnemyInRange);
                    if(randomEnemyInRange !== null && skillCopy.getName() === "Ice")
                    {
                        skillCopy.setPosition(...randomEnemyInRange.getPosition());
                        skillCopy.setDestination(...randomEnemyInRange.getPosition());
                    }
                    ctx.skillListOnScreen.castSkill(skillCopy);
                }
            }
        });
    }, [props.miliseconds]);

    return (
        <>
            <AnimationComponent animationDataWalking={ctx.player.getAnimationData(AnimationState.walking)}
                animationDataStanding={ctx.player.getAnimationData(AnimationState.standing)}
                animationDataAttacking={ctx.player.getAnimationData(AnimationState.attacking)}
                animationState={animationState} facedDirection={facedDirection} secondaryFacedDirection={facedSecondaryDirection}
                time={props.miliseconds} scale={2} positionX={playerOnScreenPositionX}
                positionY={playerOnScreenPositionY} rotation={0}/>
        </>
    );
}

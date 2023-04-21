import React, { useEffect, useState } from "react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import { AnimationState, Direction, DirectionHorizontal } from "../data/types";
import { AnimationComponent } from "./Animation";
import { useTick } from "@pixi/react";
import { SkillBase } from "../utils/skillBase";
import Shadow from "./Shadow";

interface PlayerComponentProps{
  miliseconds: number;
  delta: number;
}

export default function PlayerComponent(props: PlayerComponentProps) {

    const ctx = useGameManagerStore();

    const [facedDirection, setFacedDirection] = useState<Direction>(Direction.left);
    const [facedSecondaryDirection, setFacedSecondaryDirection] = useState<DirectionHorizontal>(DirectionHorizontal.left);

    const playerMovementHorizontalInitialState = 0;
    const playerMovementVerticalInitialState = 0;
    const [playerMovementHorizontal, setPlayerMovementHorizontal] = useState(playerMovementHorizontalInitialState);
    const [playerMovementVertical, setPlayerMovementVertical] = useState(playerMovementVerticalInitialState);

    const movementUnit = 1;
    const noMove = 0;
    
    const handleUserKeyPressDown = (e: KeyboardEvent) => {
        e.code === "KeyA" || e.code === "KeyD" ? setPlayerMovementHorizontal(() => e.code === "KeyA" ? -movementUnit : (e.code === "KeyD" ? movementUnit : noMove)) : null;
        e.code === "KeyW" || e.code === "KeyS" ? setPlayerMovementVertical(() => e.code === "KeyW" ? -movementUnit : (e.code === "KeyS" ? movementUnit : noMove)) : null;
        e.code === "Escape" ? ctx.map.level = 0 : null;
    };

    const handleUserKeyPressUp = (e: KeyboardEvent) => {
        setPlayerMovementHorizontal((previousMovementValue) => e.code === "KeyA" || e.code === "KeyD" ? noMove : previousMovementValue);
        setPlayerMovementVertical((previousMovementValue) => e.code === "KeyW" || e.code === "KeyS" ? noMove : previousMovementValue);
    };

    useEffect(() => {
        setFacedSecondaryDirection((previousDirection) => playerMovementHorizontal > noMove ? DirectionHorizontal.right : (playerMovementHorizontal < noMove ? DirectionHorizontal.left : previousDirection));
        setFacedDirection((previousDirection) => playerMovementHorizontal > noMove ? Direction.right : (playerMovementHorizontal < noMove ? Direction.left :
            (playerMovementVertical > noMove ? Direction.down : (playerMovementVertical < noMove ? Direction.up : previousDirection))));
        
    },[playerMovementHorizontal, playerMovementVertical]);

    useEffect(() => {
        window.addEventListener("keydown", handleUserKeyPressDown);
        window.addEventListener("keyup", handleUserKeyPressUp);

        return () => {
            window.removeEventListener("keydown", handleUserKeyPressDown);
            window.removeEventListener("keyup", handleUserKeyPressUp);
        };
    }, []);

    useTick((delta) => {

        const aboveThisPointsCountPlayerIsNotMoving = 0;
        if(ctx.skillSelect.getPoints() > aboveThisPointsCountPlayerIsNotMoving) return;
        const x = playerMovementHorizontal;
        const y = playerMovementVertical;
        ctx.player.moveUnits(x, y, ctx.enemyList, delta);
    });

    const [playerPosition, setPlayerPosition] = useState(ctx.player.getPosition());

    useEffect(() => {
        setPlayerPosition([ctx.player.getPositionX(), ctx.player.getPositionY()]);
    }, [props.miliseconds]);

    const [animationState, setAnimationState] = useState(AnimationState.standing);
    useEffect(() => {
        if(playerMovementHorizontal === playerMovementHorizontalInitialState && playerMovementVertical === playerMovementVerticalInitialState) setAnimationState(AnimationState.standing);
        else setAnimationState(AnimationState.walking);
    }, [playerMovementHorizontal, playerMovementVertical]);

    const indexOfPlayerPositionX = 0;
    const indexOfPlayerPositionY = 1;
    const playerOnScreenPositionX = playerPosition[indexOfPlayerPositionX] - ctx.camera.getOffsetX();
    const playerOnScreenPositionY = playerPosition[indexOfPlayerPositionY] - ctx.camera.getOffsetY();

    useEffect(() => {
        const aboveThisPointsCountPlayerIsNotCastingSpells = 0;
        if(ctx.skillSelect.getPoints() > aboveThisPointsCountPlayerIsNotCastingSpells) return;
        ctx.skillListAvaliable.getMap().forEach((skill) => {

            const indexOfPositionX = 0;
            const indexOfPositionY = 1;

            const skillAvailableAt = skill.castTime + skill.cooldown;
            const nearestEnemyToSkill = ctx.enemyList.getNearest(skill.getPosition()[indexOfPositionX], skill.getPosition()[indexOfPositionY]);

            const nearestEnemyToPlayer = ctx.enemyList.getNearest(ctx.player.getPosition()[indexOfPositionX], ctx.player.getPosition()[indexOfPositionY]);
            if(nearestEnemyToPlayer === null) return;
            const enemyDistanceToPlayer = Math.hypot(nearestEnemyToPlayer.getPositionX() - ctx.player.getPositionX(),
                nearestEnemyToPlayer.getPositionY() - ctx.player.getPositionY());
            const visibleDistanceOnScreen = Math.min(...ctx.screen.getCenter());
            
            if(nearestEnemyToSkill !== null && enemyDistanceToPlayer < visibleDistanceOnScreen)
            {  
                if(skillAvailableAt <= props.miliseconds)
                {
                    skill.castTime = props.miliseconds;
                    const skillCopy = new SkillBase(skill);
                    skillCopy.castTime = props.miliseconds;
                    skillCopy.setPosition(playerPosition[indexOfPositionX], playerPosition[indexOfPositionY]);
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
            <Shadow positionX={playerOnScreenPositionX} positionY={playerOnScreenPositionY} scale={2} anchorY={0.6}/>
            <AnimationComponent animationDataWalking={ctx.player.getAnimationData(AnimationState.walking)}
                animationDataStanding={ctx.player.getAnimationData(AnimationState.standing)}
                animationDataAttacking={ctx.player.getAnimationData(AnimationState.attacking)}
                animationState={animationState} facedDirection={facedDirection} secondaryFacedDirection={facedSecondaryDirection}
                time={props.miliseconds} scale={2} positionX={playerOnScreenPositionX}
                positionY={playerOnScreenPositionY} rotation={0}/>
        </>
    );
}

import React, { useEffect, useRef, useState } from "react";
import { useGameManagerStore } from "../game/GameManagerStoreContext";
import Enemy from "./Enemy";
import { Sprite } from "@pixi/react";
import AnimationRenderer, { AnimationData } from "../animation/AnimationData";
import { AnimationState } from "../globalData/Types";
import EnemyHealthRenderer from "../ui/AboveHeadHealthRenderer";
import AboveHeadHealthRenderer from "../ui/AboveHeadHealthRenderer";
import PlayerRenderer from "../player/PlayerRenderer";

interface EnemyRendererProps{
    miliseconds: number;
    delta: number;
}

export default function EnemyRenderer(props: EnemyRendererProps) {

    const ctx = useGameManagerStore();

    

    useEffect(() => {
        if(!ctx.enemyList.isNextWaveReady(props.miliseconds,ctx.map.level))
        {
            // Moving enemies towards player
            ctx.enemyList.moveTowardsPlayer(ctx.player, props.delta);
            return;
        }
        
        ctx.enemyList.nextWave(props.miliseconds);
        ctx.enemyPrototypes.getList().forEach(enemy => {
            if(enemy.getLevel() === ctx.map.level)
            {
                for(let i = 0; i < ctx.map.level * 5; i++)
                {
                    const objClone = enemy.clone();
                    const randomBorder = Math.floor(Math.random() * 4);

                    const maxScreenAxisLength = Math.max(...ctx.screen.getSize());
                    const spawnPositionX = ctx.player.getPositionX() + maxScreenAxisLength * (randomBorder % 2 === 0 ? -1 : 1) * (randomBorder < 2 ? 1 : Math.random());
                    const spawnPositionY = ctx.player.getPositionY() + maxScreenAxisLength * (randomBorder < 2 ? -1 : 1) * (randomBorder >= 2 ? 1 : Math.random());

                    objClone.setPositionX(spawnPositionX);
                    objClone.setPositionY(spawnPositionY);

                    ctx.enemyList.addEnemy(objClone);
                }
            }
        });
        

        // Moving enemies towards player
        ctx.enemyList.moveTowardsPlayer(ctx.player, props.delta);


    }, [props.miliseconds]);

    const playerOnScreenPositionX = ctx.player.getPositionX() - ctx.camera.getOffsetX();
    const playerOnScreenPositionY = ctx.player.getPositionY() - ctx.camera.getOffsetY();
    const playerHealthPercentage = ctx.player.getCurrentHp() * 100.0 / ctx.player.getMaxHp();
    

    return (
        <>
            {ctx.enemyList.getList().map(enemy => {

                const enemyOnScreenPositionX = enemy.getPositionX() - ctx.camera.getOffsetX();
                const enemyOnScreenPositionY = enemy.getPositionY() - ctx.camera.getOffsetY();

                return (
                    <AnimationRenderer  animationDataAttacking={enemy.getAnimationData(AnimationState.attacking)}
                        animationDataStanding={enemy.getAnimationData(AnimationState.standing)}
                        animationDataWalking={enemy.getAnimationData(AnimationState.walking)}
                        facedDirection={enemy.getFacedDirection()} secondaryFacedDirection={enemy.getSecondaryFacedDirection()}
                        positionX={enemyOnScreenPositionX} positionY={enemyOnScreenPositionY} scale={enemy.getScale()} rotation={0}
                        animationState={enemy.getAnimationState()} time={props.miliseconds} key={enemy.getId() + "enemy"}/>
                );
            })}
            <PlayerRenderer miliseconds={props.miliseconds} delta={props.delta}/>
            {ctx.enemyList.getList().map(enemy => {
            
                const enemyOnScreenPositionX = enemy.getPositionX() - ctx.camera.getOffsetX();
                const enemyOnScreenPositionY = enemy.getPositionY() - ctx.camera.getOffsetY();

                return (
                    <AboveHeadHealthRenderer positionX={enemyOnScreenPositionX} positionY={enemyOnScreenPositionY} 
                        percentage={enemy.getCurrentHp() * 100 / enemy.getMaxHp()} heightOffset={/* TODO: Put here height of image */ 30} player={false} key={enemy.getId() + "enemyhp"}/>
                );
            })}
            <AboveHeadHealthRenderer positionX={playerOnScreenPositionX} positionY={playerOnScreenPositionY} 
                percentage={playerHealthPercentage}
                heightOffset={/* TODO: Put here height of image */ 60} player={true} />
        </>
    );
}

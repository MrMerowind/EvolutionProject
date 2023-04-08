import React, { useEffect } from "react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import { AnimationState } from "../utils/Types";
import AboveHeadHealthComponent from "./AboveHeadHealthComponent";
import PlayerComponent from "./PlayerComponent";
import { AnimationComponent } from "./AnimationComponent";

interface EnemyComponentProps{
    miliseconds: number;
    delta: number;
}

export default function EnemyComponent(props: EnemyComponentProps) {

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

    // Removing dead enemies
    for(let i = 0; i < ctx.enemyList.getList().length; i++)
    {
        const enemyHp = ctx.enemyList.getList()[i].getCurrentHp();
        if(enemyHp <= 0)
        {
            const addedExp = ctx.enemyList.getList()[i].getExpReward();
            ctx.player.addExp(addedExp);
            ctx.enemyList.getList().splice(i,1);
            i--;
        }
    }
    

    return (
        <>
            {ctx.enemyList.getList().map(enemy => {

                const enemyOnScreenPositionX = enemy.getPositionX() - ctx.camera.getOffsetX();
                const enemyOnScreenPositionY = enemy.getPositionY() - ctx.camera.getOffsetY();

                return (
                    <AnimationComponent  animationDataAttacking={enemy.getAnimationData(AnimationState.attacking)}
                        animationDataStanding={enemy.getAnimationData(AnimationState.standing)}
                        animationDataWalking={enemy.getAnimationData(AnimationState.walking)}
                        facedDirection={enemy.getFacedDirection()} secondaryFacedDirection={enemy.getSecondaryFacedDirection()}
                        positionX={enemyOnScreenPositionX} positionY={enemyOnScreenPositionY} scale={enemy.getScale()} rotation={0}
                        animationState={enemy.getAnimationState()} time={props.miliseconds} key={enemy.getId() + "enemy"}/>
                );
            })}
            <PlayerComponent miliseconds={props.miliseconds} delta={props.delta}/>
            {ctx.enemyList.getList().map(enemy => {
            
                const enemyOnScreenPositionX = enemy.getPositionX() - ctx.camera.getOffsetX();
                const enemyOnScreenPositionY = enemy.getPositionY() - ctx.camera.getOffsetY();

                return (
                    <AboveHeadHealthComponent positionX={enemyOnScreenPositionX} positionY={enemyOnScreenPositionY} 
                        percentage={enemy.getCurrentHp() * 100 / enemy.getMaxHp()} heightOffset={/* TODO: Put here height of image */ 30} player={false} key={enemy.getId() + "enemyhp"}/>
                );
            })}
            <AboveHeadHealthComponent positionX={playerOnScreenPositionX} positionY={playerOnScreenPositionY} 
                percentage={playerHealthPercentage}
                heightOffset={/* TODO: Put here height of image */ 60} player={true} />
        </>
    );
}

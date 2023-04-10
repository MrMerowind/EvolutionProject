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
        let bossSpawned = false;
        if(ctx.enemyList.isBossReady(ctx.map.level))
        {
            ctx.enemyList.nextWave(props.miliseconds);
            ctx.bossPrototypes.getList().forEach(enemy => {
                if(enemy.getLevel() === ctx.map.level && !bossSpawned)
                {
                    const objClone = enemy.clone();
                    const randomBorder = Math.floor(Math.random() * 4);
    
                    const maxScreenAxisLength = Math.max(...ctx.screen.getSize());
                    let spawnPositionX = ctx.player.getPositionX() + maxScreenAxisLength * (randomBorder % 2 === 0 ? -1 : 1) * (randomBorder < 2 ? 1 : Math.random());
                    let spawnPositionY = ctx.player.getPositionY() + maxScreenAxisLength * (randomBorder < 2 ? -1 : 1) * (randomBorder >= 2 ? 1 : Math.random());
    
                    // Preventing spawning on another
                    const loop = true;
                    while(loop)
                    {
                        const nearestEnemy = ctx.enemyList.getNearest(spawnPositionX, spawnPositionY);
                        if(nearestEnemy === null) break;
                        const enemiesDistance = Math.hypot(nearestEnemy.getPositionX() - spawnPositionX, nearestEnemy.getPositionY() - spawnPositionY);
                        const minDistance = Math.max(objClone.getSpaceRadius(), nearestEnemy.getSpaceRadius());
                        if(enemiesDistance > minDistance) break;
                            
                        spawnPositionX = ctx.player.getPositionX() + maxScreenAxisLength * (randomBorder % 2 === 0 ? -1 : 1) * (randomBorder < 2 ? 1 : Math.random());
                        spawnPositionY = ctx.player.getPositionY() + maxScreenAxisLength * (randomBorder < 2 ? -1 : 1) * (randomBorder >= 2 ? 1 : Math.random());
                    }
    
                    objClone.setPositionX(spawnPositionX);
                    objClone.setPositionY(spawnPositionY);
    
                    ctx.enemyList.addEnemy(objClone);
                    bossSpawned = true;
                }
            });
        }

        if(!ctx.enemyList.isNextWaveReady(props.miliseconds,ctx.map.level))
        {
            // Moving enemies towards player
            ctx.enemyList.moveTowardsPlayer(ctx.player, props.delta);
            return;
        }
        
        ctx.enemyList.nextWave(props.miliseconds);
        ctx.enemyPrototypes.getList().forEach(enemy => {
            if(enemy.getLevel() <= ctx.map.level && enemy.getLevel() >= ctx.map.level - 3)
            {
                const enemiesSpawnForWave = Math.min(ctx.map.level, 7);
                for(let i = 0; i < enemiesSpawnForWave; i++)
                {
                    const objClone = enemy.clone();
                    const randomBorder = Math.floor(Math.random() * 4);

                    const maxScreenAxisLength = Math.max(...ctx.screen.getSize());
                    let spawnPositionX = ctx.player.getPositionX() + maxScreenAxisLength * (randomBorder % 2 === 0 ? -1 : 1) * (randomBorder < 2 ? 1 : Math.random());
                    let spawnPositionY = ctx.player.getPositionY() + maxScreenAxisLength * (randomBorder < 2 ? -1 : 1) * (randomBorder >= 2 ? 1 : Math.random());

                    // Preventing spawning on another
                    const loop = true;
                    while(loop)
                    {
                        const nearestEnemy = ctx.enemyList.getNearest(spawnPositionX, spawnPositionY);
                        if(nearestEnemy === null) break;
                        const enemiesDistance = Math.hypot(nearestEnemy.getPositionX() - spawnPositionX, nearestEnemy.getPositionY() - spawnPositionY);
                        const minDistance = Math.max(objClone.getSpaceRadius(), nearestEnemy.getSpaceRadius());
                        if(enemiesDistance > minDistance) break;
                        
                        spawnPositionX = ctx.player.getPositionX() + maxScreenAxisLength * (randomBorder % 2 === 0 ? -1 : 1) * (randomBorder < 2 ? 1 : Math.random());
                        spawnPositionY = ctx.player.getPositionY() + maxScreenAxisLength * (randomBorder < 2 ? -1 : 1) * (randomBorder >= 2 ? 1 : Math.random());
                    }

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

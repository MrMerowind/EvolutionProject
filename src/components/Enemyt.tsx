import React, { useEffect } from "react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import { AnimationState } from "../data/types";
import AboveHeadHealthComponent from "./AboveHeadHealth";
import PlayerComponent from "./Player";
import { AnimationComponent } from "./Animation";
import DeathComponent from "./Death";

interface EnemyComponentProps{
    miliseconds: number;
    delta: number;
}

export default function EnemyComponent(props: EnemyComponentProps) {

    const ctx = useGameManagerStore();

    useEffect(() => {

        const milisecondsInSecond = 1000;
        const baseFramsCountInSecond = 60;

        const milisecondsPerFrame = milisecondsInSecond / baseFramsCountInSecond;
        ctx.enemyList.progressDeathSpotsTime(props.delta * milisecondsPerFrame);

        const aboveThisPointsEnemiesAreNotMoving = 0;

        if(ctx.skillSelect.getPoints() > aboveThisPointsEnemiesAreNotMoving) return;

        let bossSpawned = false;
        if(ctx.enemyList.isBossReady(ctx.map.level))
        {
            ctx.enemyList.nextWave(props.miliseconds);
            ctx.bossPrototypes.getList().forEach(enemy => {
                if(enemy.getLevel() === ctx.map.level && !bossSpawned)
                {
                    const objClone = enemy.clone();
                    const borderCount = 4;
                    const randomBorder = Math.floor(Math.random() * borderCount);

                    const borderSideLeft = -1;
                    const borderSideRight = 1;
                    const borderSideUp = -1;
                    const borderSideDown = 1;

                    const two = 2;
                    const zero = 0;
                    const multipier = 1;
    
                    const maxScreenAxisLength = Math.max(...ctx.screen.getSize());
                    let spawnPositionX = ctx.player.getPositionX() + maxScreenAxisLength * (randomBorder % two === zero ? borderSideLeft : borderSideRight) * (randomBorder < two ? multipier : Math.random());
                    let spawnPositionY = ctx.player.getPositionY() + maxScreenAxisLength * (randomBorder < two ? borderSideUp : borderSideDown) * (randomBorder >= two ? multipier : Math.random());
    
                    // Preventing spawning on another
                    const loop = true;
                    while(loop)
                    {
                        const nearestEnemy = ctx.enemyList.getNearest(spawnPositionX, spawnPositionY);
                        if(nearestEnemy === null) break;
                        const enemiesDistance = Math.hypot(nearestEnemy.getPositionX() - spawnPositionX, nearestEnemy.getPositionY() - spawnPositionY);
                        const minDistance = Math.max(objClone.getSpaceRadius(), nearestEnemy.getSpaceRadius());
                        if(enemiesDistance > minDistance) break;
                            
                        spawnPositionX = ctx.player.getPositionX() + maxScreenAxisLength * (randomBorder % two === zero ? borderSideLeft : borderSideRight) * (randomBorder < two ? multipier : Math.random());
                        spawnPositionY = ctx.player.getPositionY() + maxScreenAxisLength * (randomBorder < two ? borderSideUp : borderSideDown) * (randomBorder >= two ? multipier : Math.random());
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
        const enemiesFromLastMapCount = 3;
        ctx.enemyPrototypes.getList().forEach(enemy => {
            if(enemy.getLevel() <= ctx.map.level && enemy.getLevel() >= ctx.map.level - enemiesFromLastMapCount)
            {
                const enemiesCountDivider = 4;
                const maximumEnemiesSpawnedForKind = 12;
                const enemiesSpawnForWave = Math.min(Math.ceil(ctx.enemyList.getCurrentWave() / enemiesCountDivider), maximumEnemiesSpawnedForKind);
                for(let i = 0; i < enemiesSpawnForWave; i++)
                {
                    const objClone = enemy.clone();

                    const borderCount = 4;
                    const borderSideLeft = -1;
                    const borderSideRight = 1;
                    const borderSideUp = -1;
                    const borderSideDown = 1;

                    const two = 2;
                    const zero = 0;
                    const multipier = 1;

                    const randomBorder = Math.floor(Math.random() * borderCount);

                    const maxScreenAxisLength = Math.max(...ctx.screen.getSize());
                    let spawnPositionX = ctx.player.getPositionX() + maxScreenAxisLength * (randomBorder % two === zero ? borderSideLeft : borderSideRight) * (randomBorder < two ? multipier : Math.random());
                    let spawnPositionY = ctx.player.getPositionY() + maxScreenAxisLength * (randomBorder < two ? borderSideUp : borderSideDown) * (randomBorder >= two ? multipier : Math.random());

                    // Preventing spawning on another
                    const loop = true;
                    while(loop)
                    {
                        const nearestEnemy = ctx.enemyList.getNearest(spawnPositionX, spawnPositionY);
                        if(nearestEnemy === null) break;
                        const enemiesDistance = Math.hypot(nearestEnemy.getPositionX() - spawnPositionX, nearestEnemy.getPositionY() - spawnPositionY);
                        const minDistance = Math.max(objClone.getSpaceRadius(), nearestEnemy.getSpaceRadius());
                        if(enemiesDistance > minDistance) break;
                        
                        spawnPositionX = ctx.player.getPositionX() + maxScreenAxisLength * (randomBorder % two === zero ? borderSideLeft : borderSideRight) * (randomBorder < two ? multipier : Math.random());
                        spawnPositionY = ctx.player.getPositionY() + maxScreenAxisLength * (randomBorder < two ? borderSideUp : borderSideDown) * (randomBorder >= two ? multipier : Math.random());
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
    const maxHealthPercentage = 100;
    const playerHealthPercentage = ctx.player.getCurrentHp() * maxHealthPercentage / ctx.player.getMaxHp();

    // Removing dead enemies
    for(let i = 0; i < ctx.enemyList.getList().length; i++)
    {
        const enemyHp = ctx.enemyList.getList()[i].getCurrentHp();
        const enemyPosition = ctx.enemyList.getList()[i].getPosition();
        const miminumHealthPercentage = 0;
        if(enemyHp <= miminumHealthPercentage)
        {
            ctx.enemyList.addDeathSpot(...enemyPosition);
            const addedExp = ctx.enemyList.getList()[i].getExpReward();
            ctx.player.addExp(addedExp);
            const deleteCount = 1;
            ctx.enemyList.getList().splice(i,deleteCount);
            i--;
        }
    }

    return (
        <>
            {ctx.enemyList.getDeathSpots().map(deathSpot => {

                const zeroIndex = 0;
                const oneIndex = 1;
                const twoIndex = 2;
                const threeIndex = 3;

                const spotOnScreenPositionX = deathSpot[zeroIndex] - ctx.camera.getOffsetX();
                const spotOnScreenPositionY = deathSpot[oneIndex] - ctx.camera.getOffsetY();

                return (
                    <DeathComponent positionX={spotOnScreenPositionX} positionY={spotOnScreenPositionY} time={deathSpot[threeIndex]} key={deathSpot[twoIndex].toString()}/>
                );
            })}
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
                const heightOffset = 30;
                const maxHealthPercentage = 100;
                const hpPercentage = enemy.getCurrentHp() * maxHealthPercentage / enemy.getMaxHp();

                return (
                    <AboveHeadHealthComponent positionX={enemyOnScreenPositionX} positionY={enemyOnScreenPositionY} 
                        percentage={hpPercentage} heightOffset={heightOffset} player={false} key={enemy.getId() + "enemyhp"}/>
                );
            })}
            <AboveHeadHealthComponent positionX={playerOnScreenPositionX} positionY={playerOnScreenPositionY} 
                percentage={playerHealthPercentage}
                heightOffset={60} player={true} />
        </>
    );
}

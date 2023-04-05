import React, { useEffect, useRef, useState } from 'react'
import { useGameManagerStore } from '../game/GameManagerStoreContext';
import Enemy from './Enemy';
import { Sprite } from '@pixi/react';
import AnimationRenderer, { AnimationData } from '../animation/AnimationData';
import { AnimationState } from '../globalData/Types';

interface EnemyRendererProps{
    miliseconds: number;
}

export default function EnemyRenderer(props: EnemyRendererProps) {

    const ctx = useGameManagerStore();

    

    useEffect(() => {
        if(ctx.enemyList.isNextWaveReady(props.miliseconds,ctx.map.level))
        {
            ctx.enemyList.nextWave(props.miliseconds);
            ctx.enemyPrototypes.getList().forEach((p) => {
                if(p.getLevel() === ctx.map.level)
                {
                    for(let i = 0; i < ctx.map.level * 5; i++)
                    {
                        const objClone = p.clone();
                        let r = Math.floor(Math.random() * 4);
                        if(r === 0)
                        {
                            objClone.setPositionX(ctx.player.getPositionX() - (ctx.screen.getCenterHorizontal() + 100));
                            objClone.setPositionY(ctx.player.getPositionY() + ctx.screen.getHeight() * Math.random() - ctx.screen.getCenterVertical());
                        }
                        else if(r === 1)
                        {
                            objClone.setPositionX(ctx.player.getPositionX() + (ctx.screen.getCenterHorizontal() + 100));
                            objClone.setPositionY(ctx.player.getPositionY() + ctx.screen.getHeight() * Math.random() - ctx.screen.getCenterVertical());
                        }
                        else if(r === 2)
                        {
                            objClone.setPositionY(ctx.player.getPositionY() - (ctx.screen.getCenterVertical() + 100));
                            objClone.setPositionX(ctx.player.getPositionX() + ctx.screen.getWidth() * Math.random() - ctx.screen.getCenterHorizontal());
                        }
                        else if(r === 3)
                        {
                            objClone.setPositionY(ctx.player.getPositionY() + (ctx.screen.getCenterVertical() + 100));
                            objClone.setPositionX(ctx.player.getPositionX() + ctx.screen.getWidth() * Math.random() - ctx.screen.getCenterHorizontal());
                        }

                        ctx.enemyList.addEnemy(objClone);
                    }
                }
            });
        }

        // Moving enemies towards player
        ctx.enemyList.moveTowardsPlayer(ctx.player);


    }, [props.miliseconds]);


  return (
    <>
    {ctx.enemyList.getList().map(p => {
        return <AnimationRenderer animationDataAttacking={p.getAnimationData(AnimationState.attacking)}
        animationDataStanding={p.getAnimationData(AnimationState.standing)}
        animationDataWalking={p.getAnimationData(AnimationState.walking)}
        facedDirection={p.getFacedDirection()} secondaryFacedDirection={p.getSecondaryFacedDirection()}
        positionX={p.getPositionX() - ctx.camera.getOffsetX()} positionY={p.getPositionY() - ctx.camera.getOffsetY()} scale={p.getScale()} rotation={0}
        animationState={p.getAnimationState()} time={props.miliseconds} key={p.getId()}/>
    })}
    </>
  )
}

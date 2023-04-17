/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from "react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import { Rectangle, Texture } from "pixi.js";
import { Sprite } from "@pixi/react";
import { SkillNames } from "../data/Types";
import { SkillBase } from "../utils/SkillBase";


export default function SkillSelectComponent() {

    const ctx = useGameManagerStore();

    useEffect(() => {
        if(ctx.enemyList.getCurrentWave() % 6 === 0 && ctx.enemyList.getCurrentWave() !== 0)
        {
            ctx.skillSelect.addPoints(1);
        }
    }, [ctx.enemyList.getCurrentWave()]);
    

    if(ctx.skillSelect.getPoints() <= 0) return null;

    function upgradeSkill(index: number, level: number)
    {
        const skillName = SkillNames[index];
        if(skillName === "Heart")
        {
            ctx.player.addHp(ctx.player.getMaxHp());
        }
        else if(skillName === "Mobility")
        {
            ctx.player.addSpeedThroughEnemies(1);
        }
        else if(ctx.skillListAvaliable.getSkill(skillName) !== undefined)
        {
            const skillBaseCooldown = ctx.skillPrototypes.getSkill(skillName)?.cooldown;
            if(skillBaseCooldown)
            {
                const skillNewCooldown = skillBaseCooldown - skillBaseCooldown / ctx.skillSelect.maxSkillLevel * level;
                const skill = ctx.skillListAvaliable.getSkill(skillName);
                if(skill !== undefined)
                    skill.cooldown = skillNewCooldown;
            }
        }   
        else
        {
            const skillCopy = ctx.skillPrototypes.getSkill(skillName);
            if(skillCopy !== undefined)
                ctx.skillListAvaliable.addSkillPrototype(new SkillBase(skillCopy));
        }
        ctx.skillSelect.upgradeSkill(index);
        ctx.skillSelect.removePoints(1);
    }
    
    const imageRefBackground = ctx.skillSelect.getBackgroud();
    const imageRefOverlay = ctx.skillSelect.getOverlay();
    const imageRefButton = ctx.skillSelect.getButton();
    const imageRefBar = ctx.skillSelect.getBar();

    if(imageRefBackground === null) return null;
    if(imageRefOverlay === null) return null;
    if(imageRefButton === null) return null;
    if(imageRefBar === null) return null;

    const cutRegionBackground = new Rectangle(0, 0, imageRefBackground.width, imageRefBackground.height);
    const cutRegionOverlay = new Rectangle(0, 0, imageRefOverlay.width, imageRefOverlay.height);
    const cutRegionButton = new Rectangle(0, 0, imageRefButton.width, imageRefButton.height);
    const cutRegionBar = new Rectangle(0, 0, imageRefBar.width, imageRefBar.height);
    
    const cutTextureBackground = new Texture(imageRefBackground, cutRegionBackground);
    const cutTextureOverlay = new Texture(imageRefOverlay, cutRegionOverlay);
    const cutTextureButton = new Texture(imageRefButton, cutRegionButton);
    const cutTextureBar = new Texture(imageRefBar, cutRegionBar);
    
    const barPositions = [
        [122,62],
        [122,119],
        [122,176],
        [122,233],
        [122,291],
        [369,62],
        [369,119],
        [369,176],
        [369,233],
        [369,291],
    ];



    return (
        <>
            <Sprite texture={cutTextureBackground} width={imageRefBackground.width} height={imageRefBackground.height}
                x={ctx.screen.getCenterHorizontal()} y={ctx.screen.getCenterVertical()} rotation={0} anchor={[0.5,0.5]} />

            {
                barPositions.map((barPos, index) => {

                    const barPositionX = barPos[0] + ctx.screen.getCenterHorizontal() - cutRegionBackground.width / 2;
                    const barPositionY = barPos[1] + ctx.screen.getCenterVertical() - cutRegionBackground.height / 2;
                    const barWidth = imageRefBar.width * ctx.skillSelect.getSkillLevel(index) / ctx.skillSelect.maxSkillLevel;

                    const buttonPositionX = barPositionX + imageRefBar.width;
                    const buttonPositionY = barPositionY + imageRefBar.height / 2;
                    const buttonScale = 0.3;
                    const buttonWidth = imageRefButton.width * buttonScale;
                    const buttonHeight = imageRefButton.height * buttonScale;

                    return (
                        <>
                            <Sprite texture={cutTextureBar} width={barWidth} height={imageRefBar.height}
                                x={barPositionX} y={barPositionY} rotation={0} anchor={[0,0]} key={index.toString()}/>
                                
                            {ctx.skillSelect.isIndexInPossibleUpgradeIndexes(index) ? (
                                <Sprite texture={cutTextureButton}
                                    width={buttonWidth} height={buttonHeight} scale={buttonScale}
                                    x={buttonPositionX} y={buttonPositionY} rotation={0} anchor={[0,0.5]}
                                    key={(index.toString() + "xUpgrade")} interactive={true}
                                    pointerdown={() => {
                                        const upgradeToLevel = ctx.skillSelect.getSkillLevel(index) + 1;
                                        upgradeSkill(index, upgradeToLevel);
                                    }}  />) : null}
                            
                        </>
                    );
                })
            }

            <Sprite texture={cutTextureOverlay} width={imageRefOverlay.width} height={imageRefOverlay.height}
                x={ctx.screen.getCenterHorizontal()} y={ctx.screen.getCenterVertical()} rotation={0} anchor={[0.5,0.5]} />
        </>
    );
}

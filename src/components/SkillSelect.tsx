/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from "react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import { Rectangle, Texture } from "pixi.js";
import { Sprite } from "@pixi/react";
import { SkillNames } from "../data/types";
import { SkillBase } from "../utils/skillBase";

export default function SkillSelectComponent() {

    const ctx = useGameManagerStore();

    const everyThisWaveCountAddPoint = 4;
    const zero = 0;
    const addPointsCount = 1;

    useEffect(() => {
        if(ctx.enemyList.getCurrentWave() % everyThisWaveCountAddPoint !== zero || ctx.enemyList.getCurrentWave() === zero) return;
        ctx.skillSelect.addPoints(addPointsCount);
    }, [ctx.enemyList.getCurrentWave()]);

    if(ctx.skillSelect.getPoints() <= zero) return null;

    function upgradeSkill(index: number, level: number)
    {
        const skillName = SkillNames[index];
        if(skillName === "Heart")
        {
            ctx.player.addHp(ctx.player.getMaxHp());
        }
        else if(skillName === "Mobility")
        {
            const speedPointsAdded = 1;
            ctx.player.addSpeedThroughEnemies(speedPointsAdded);
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
        const removePointsCount = 1;
        ctx.skillSelect.removePoints(removePointsCount);
    }
    
    const imageRefBackground = ctx.skillSelect.getBackgroud();
    const imageRefOverlay = ctx.skillSelect.getOverlay();
    const imageRefButton = ctx.skillSelect.getButton();
    const imageRefBar = ctx.skillSelect.getBar();

    if(imageRefBackground === null) return null;
    if(imageRefOverlay === null) return null;
    if(imageRefButton === null) return null;
    if(imageRefBar === null) return null;

    const cutRegionStartX = 0;
    const cutRegionStartY = 0;
    const cutRegionBackground = new Rectangle(cutRegionStartX, cutRegionStartY, imageRefBackground.width, imageRefBackground.height);
    const cutRegionOverlay = new Rectangle(cutRegionStartX, cutRegionStartY, imageRefOverlay.width, imageRefOverlay.height);
    const cutRegionButton = new Rectangle(cutRegionStartX, cutRegionStartY, imageRefButton.width, imageRefButton.height);
    const cutRegionBar = new Rectangle(cutRegionStartX, cutRegionStartY, imageRefBar.width, imageRefBar.height);
    
    const cutTextureBackground = new Texture(imageRefBackground, cutRegionBackground);
    const cutTextureOverlay = new Texture(imageRefOverlay, cutRegionOverlay);
    const cutTextureButton = new Texture(imageRefButton, cutRegionButton);
    const cutTextureBar = new Texture(imageRefBar, cutRegionBar);
    
    const barPositions = [
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        [122,62],[122,119],[122,176],[122,233],[122,291],[369,62],[369,119],[369,176],[369,233],[369,291],
    ];

    const anchorX = 0.5;
    const anchorY = 0.5;

    return (
        <>
            <Sprite texture={cutTextureBackground} width={imageRefBackground.width} height={imageRefBackground.height}
                x={ctx.screen.getCenterHorizontal()} y={ctx.screen.getCenterVertical()} rotation={0} anchor={[anchorX,anchorY]} key={"bgskillselect"}/>

            {
                barPositions.map((barPos, index) => {
                    const indexX = 0;
                    const indexY = 1;
                    const divider = 2;
                    const barPositionX = barPos[indexX] + ctx.screen.getCenterHorizontal() - cutRegionBackground.width / divider;
                    const barPositionY = barPos[indexY] + ctx.screen.getCenterVertical() - cutRegionBackground.height / divider;
                    const barWidth = imageRefBar.width * ctx.skillSelect.getSkillLevel(index) / ctx.skillSelect.maxSkillLevel;

                    const buttonPositionX = barPositionX + imageRefBar.width;
                    const buttonPositionY = barPositionY + imageRefBar.height / divider;
                    const buttonScale = 0.3;
                    const buttonWidth = imageRefButton.width * buttonScale;
                    const buttonHeight = imageRefButton.height * buttonScale;

                    const upgradeAnchorX = 0;
                    const upgradeAnchorY = 0;
                    const buttonAnchorX = 0;
                    const buttonAnchorY = 0.5;
                    const levelIncrement = 1;

                    return (
                        <>
                            <Sprite texture={cutTextureBar} width={barWidth} height={imageRefBar.height}
                                x={barPositionX} y={barPositionY} rotation={0} anchor={[upgradeAnchorX,upgradeAnchorY]} key={index.toString()}/>
                                
                            {ctx.skillSelect.isIndexInPossibleUpgradeIndexes(index) ? (
                                <Sprite texture={cutTextureButton}
                                    width={buttonWidth} height={buttonHeight} scale={buttonScale}
                                    x={buttonPositionX} y={buttonPositionY} rotation={0} anchor={[buttonAnchorX, buttonAnchorY]}
                                    key={(index.toString() + "xUpgrade")} interactive={true}
                                    pointerdown={() => {
                                        const upgradeToLevel = ctx.skillSelect.getSkillLevel(index) + levelIncrement;
                                        upgradeSkill(index, upgradeToLevel);
                                    }}  />) : null}
                            
                        </>
                    );
                })
            }

            <Sprite texture={cutTextureOverlay} width={imageRefOverlay.width} height={imageRefOverlay.height}
                x={ctx.screen.getCenterHorizontal()} y={ctx.screen.getCenterVertical()} rotation={0} anchor={[anchorX, anchorY]} key={"overlayskillselect"}/>
        </>
    );
}

/* eslint-disable react/jsx-no-undef */
import React from "react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import { Sprite, Text } from "@pixi/react";
import { Rectangle, Texture } from "pixi.js";
import { levelFont, statsFont } from "../utils/Fonts";

export default function StatisticsComponent() {

    const ctx = useGameManagerStore();

    const imageRefCorner = ctx.statistics.getCornerOverlay();
    const imageRefHealthOverlay = ctx.statistics.getHealthOverlay();
    const imageRefHpBar = ctx.statistics.getHealthBar();
    const imageRefExpBar = ctx.statistics.getExpBar();

    if(imageRefCorner === null) return null;
    if(imageRefHealthOverlay === null) return null;
    if(imageRefHpBar === null) return null;
    if(imageRefExpBar === null) return null;
    
    const cutRegionCorner = new Rectangle(0, 0, imageRefCorner.width, imageRefCorner.height);
    const cutRegionOverlay = new Rectangle(0, 0, imageRefHealthOverlay.width, imageRefHealthOverlay.height);
    const cutRegionHpBar = new Rectangle(0, 0, imageRefHpBar.width, imageRefHpBar.height);
    const cutRegionExpBar = new Rectangle(0, 0, imageRefExpBar.width, imageRefExpBar.height);
    
    
    const cutTextureCorner = new Texture(imageRefCorner, cutRegionCorner);
    const cutTextureOverlay = new Texture(imageRefHealthOverlay, cutRegionOverlay);
    const cutTextureHpBar = new Texture(imageRefHpBar, cutRegionHpBar);
    const cutTextureExpBar = new Texture(imageRefExpBar, cutRegionExpBar);


    const hpBarHeight = imageRefHpBar.height * ctx.player.getCurrentHp() / ctx.player.getMaxHp();
    const expBarHeiht = imageRefExpBar.height * ctx.player.getCurrentExp() / ctx.player.getNeededExp();

    const textOffsetBig = 230;
    const textOffsetSmall = 25;

    const textDescriptionX = ctx.screen.getWidth() - textOffsetBig;
    const textValueX = ctx.screen.getWidth() - textOffsetSmall;

    const textY = [ctx.screen.getHeight() - 140,
        ctx.screen.getHeight() - 90,
        ctx.screen.getHeight() - 60,
        ctx.screen.getHeight() - 30];

    return (
        <>
            {/* Corners*/}
            <Sprite texture={cutTextureCorner} width={imageRefCorner.width * 0.3} height={imageRefCorner.height * 0.3} scale={0.3}
                x={0} y={0} rotation={0} anchor={[0,0]}/>
            <Sprite texture={cutTextureCorner} width={imageRefCorner.width * 0.3} height={imageRefCorner.height * 0.3} scale={0.3}
                x={ctx.screen.getWidth()} y={0} rotation={Math.PI / 2} anchor={[0,0]}/>
            <Sprite texture={cutTextureCorner} width={imageRefCorner.width * 0.3} height={imageRefCorner.height * 0.3} scale={0.3}
                x={0} y={ctx.screen.getHeight()} rotation={-Math.PI / 2} anchor={[0,0]}/>

            {/* Health and exp*/}
            <Sprite texture={cutTextureHpBar} width={imageRefHpBar.width} height={hpBarHeight}
                x={ctx.screen.getWidth() - 325} y={ctx.screen.getHeight()} rotation={0} anchor={[1,1]}/> 
            <Sprite texture={cutTextureExpBar} width={imageRefExpBar.width} height={expBarHeiht}
                x={ctx.screen.getWidth() - 200} y={ctx.screen.getHeight()} rotation={0} anchor={[1,1]}/> 

            {/* Health and exp overlay*/}
            <Sprite texture={cutTextureOverlay} width={imageRefHealthOverlay.width} height={imageRefHealthOverlay.height} scale={1}
                x={ctx.screen.getWidth()} y={ctx.screen.getHeight()} rotation={0} anchor={[1,1]}/>  

            {/* Level and stats */}
            <Text text={"Level: "} anchor={0} x={textDescriptionX} y={textY[0]} style={levelFont} />
            <Text text={"Strenght: "} anchor={0} x={textDescriptionX } y={textY[1]} style={statsFont} />
            <Text text={"Vitality: "} anchor={0} x={textDescriptionX } y={textY[2]} style={statsFont} />
            <Text text={"Agility: "} anchor={0} x={textDescriptionX } y={textY[3]} style={statsFont} />
            <Text text={ctx.player.getLevel().toString()} anchor={[1,0]} x={textValueX} y={textY[0]} style={levelFont} />
            <Text text={ctx.player.getStrength().toString()} anchor={[1,0]} x={textValueX} y={textY[1]} style={statsFont} />
            <Text text={ctx.player.getVitality().toString()} anchor={[1,0]} x={textValueX} y={textY[2]} style={statsFont} />
            <Text text={ctx.player.getAgility().toString()} anchor={[1,0]} x={textValueX} y={textY[3]} style={statsFont} />
        </>
    );
}

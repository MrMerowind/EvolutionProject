import { AppProvider, useApp, useTick} from "@pixi/react";
import React, { useEffect, useRef, useState } from "react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import MapComponent from "./Map";
import { LoadingScreenComponent } from "./LoadingScreen";
import EnemyComponent from "./Enemy";
import StatisticsComponent from "./Statistics";
import SkillListComponent from "./SkillList";
import SkillSelectComponent from "./SkillSelect";
import MapSelectComponent from "./MapSelect";
import { ScreenIsTooSmallComponent } from "./ScreenIsTooSmall";

export function MainGameComponent(){

    const ctx = useGameManagerStore();
    const app = useApp();
    const initialMilisecondsState = 0;
    const [miliseconds, setMiliseconds] = useState(initialMilisecondsState);
    const initialDeltaTimeState = 0;
    const deltaTime = useRef(initialDeltaTimeState);
    const milisecondsInSecond = 1000;
    const framesPerSecond = 60;
    const frameTime = milisecondsInSecond / framesPerSecond;

    // On map change reset timer.
    useEffect(() => {
        setMiliseconds(initialMilisecondsState);
        ctx.enemyList.resetLastWaveTime();
        ctx.skillListAvaliable.resetCooldowns();
        ctx.player.resetSpeedThroughEnemies();
        ctx.skillSelect.reset();
        ctx.skillListOnScreen.reset();
        ctx.skillListAvaliable.reset();
        const skillOrb = ctx.skillPrototypes.getSkill("Orb");
        if(skillOrb) ctx.skillListAvaliable.addSkillPrototype(skillOrb);
        ctx.player.addHp(ctx.player.getMaxHp());
        const spliceFrom = 0;
        ctx.enemyList.getList().splice(spliceFrom);
    }, [ctx.map.level]);

    useEffect(() => {
        ctx.camera.centerOnPlayer();
    }, []);

    useTick((delta) => {
        deltaTime.current = delta;
        setMiliseconds(previousTime => previousTime + delta * frameTime);
        ctx.camera.moveTowardsPlayer(delta);
    });

    useEffect(() => {
        areGraphicLoaded.current = ctx.areGraphicsLoaded;
    }, [ctx.areGraphicsLoaded]);

    const areGraphicLoaded = useRef<boolean>(ctx.areGraphicsLoaded);

    const minimumScreenSize = {x: 1000, y: 800};

    if(!areGraphicLoaded.current) return (
        <AppProvider value={app}>
            <LoadingScreenComponent />
            {/*Render information that screen is too small*/}
            {ctx.screen.getWidth() < minimumScreenSize.x || ctx.screen.getHeight() < minimumScreenSize.y ? <ScreenIsTooSmallComponent /> : null}
        </AppProvider>
    );

    const mapLevelThatIsConsideredGameMenu = 0;

    return (
        <AppProvider value={app}>
            {/*Render map*/}
            {ctx.map.level > mapLevelThatIsConsideredGameMenu ? <MapComponent /> : null}

            {/*Skills.*/}
            {ctx.map.level > mapLevelThatIsConsideredGameMenu ? <SkillListComponent miliseconds={miliseconds} delta={deltaTime.current}/> : null}
    
            {/*Render enemies*/}
            {/*Player is rendered in Enemy Component so its z index is correct.*/}
            
            {ctx.map.level > mapLevelThatIsConsideredGameMenu ? <EnemyComponent miliseconds={miliseconds} delta={deltaTime.current}/> : null}

            {/*Render map select*/}
            {ctx.map.level <= mapLevelThatIsConsideredGameMenu ? <><MapSelectComponent /></> : null}

            {/*Render UI*/}
            <StatisticsComponent />

            {/*Render skill select*/}
            {ctx.map.level > mapLevelThatIsConsideredGameMenu ? <SkillSelectComponent /> : null}

            {/*Render information that screen is too small*/}
            {ctx.screen.getWidth() < minimumScreenSize.x || ctx.screen.getHeight() < minimumScreenSize.y ? <ScreenIsTooSmallComponent /> : null}

        </AppProvider>
    );
}
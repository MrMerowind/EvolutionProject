import { AppProvider, useApp, useTick} from "@pixi/react";
import React, { useEffect, useRef, useState } from "react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import MapComponent from "./MapComponent";
import { LoadingScreenComponent } from "./LoadingScreenComponent";
import EnemyComponent from "./EnemyComponent";
import StatisticsComponent from "./StatisticsComponent";
import SkillListComponent from "./SkillListComponent";
import SkillSelectComponent from "./SkillSelectComponent";
import MapSelectComponent from "./MapSelectComponent";



export function MainGameComponent(){

    const ctx = useGameManagerStore();
    const app = useApp();
    const [miliseconds, setMiliseconds] = useState(0);
    const deltaTime = useRef(0);
    const frameTime = 1000 / 60;
    

    // On map change reset timer.
    useEffect(() => {
        setMiliseconds(0);
        ctx.enemyList.resetLastWaveTime();
        ctx.skillListAvaliable.resetCooldowns();
        ctx.player.resetSpeedThroughEnemies();
        ctx.skillSelect.reset();
        ctx.skillListOnScreen.reset();
        ctx.skillListAvaliable.reset();
        const skillOrb = ctx.skillPrototypes.getSkill("Orb");
        if(skillOrb) ctx.skillListAvaliable.addSkillPrototype(skillOrb);
        ctx.player.addHp(ctx.player.getMaxHp());
        ctx.enemyList.getList().splice(0);
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


    if(!areGraphicLoaded.current) return (
        <AppProvider value={app}>
            <LoadingScreenComponent />
        </AppProvider>
    );

    return (
        <AppProvider value={app}>
            {/*Render map*/}
            {ctx.map.level > 0 ? <MapComponent /> : null}

            {/*Skills.*/}
            {ctx.map.level > 0 ? <SkillListComponent miliseconds={miliseconds} delta={deltaTime.current}/> : null}
    
            {/*Render enemies*/}
            {/*Player is rendered in Enemy Component so its z index is correct.*/}
            
            {ctx.map.level > 0 ? <EnemyComponent miliseconds={miliseconds} delta={deltaTime.current}/> : null}

            {/*Render map select*/}
            {ctx.map.level <= 0 ? <><LoadingScreenComponent /><MapSelectComponent /></> : null}

            {/*Render UI*/}
            <StatisticsComponent />

            {/*Render skill select*/}
            {ctx.map.level > 0 ? <SkillSelectComponent /> : null}

        </AppProvider>
    );
}
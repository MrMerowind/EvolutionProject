import { AppProvider, useApp, useTick} from "@pixi/react";
import React, { useEffect, useRef, useState } from "react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import MapComponent from "./MapComponent";
import { LoadingScreenComponent } from "./LoadingScreenComponent";
import EnemyComponent from "./EnemyComponent";



export function MainGameComponent(){

    const ctx = useGameManagerStore();
    const app = useApp();
    const [miliseconds, setMiliseconds] = useState(0);
    const deltaTime = useRef(0);


    useEffect(() => {
        ctx.camera.centerOnPlayer();
    }, []);

    useTick((delta) => {
        deltaTime.current = delta;
        setMiliseconds(previousTime => previousTime + delta * 1000 / 60);
        ctx.camera.moveTowardsPlayer(delta);
    });

    const areGraphicLoaded = useRef<boolean>(ctx.areGraphicsLoaded);


    if(!areGraphicLoaded) return (
        <AppProvider value={app}>
            <LoadingScreenComponent />
        </AppProvider>
    );
    // TODO: rewrite
    return (
        <AppProvider value={app}>
            {/*Render map*/}
            <MapComponent />

            {/*Render enemies*/}
            {/*Player is rendered in Enemy Component so its z index is correct.*/}
            <EnemyComponent miliseconds={miliseconds} delta={deltaTime.current}/>

            {/*Render UI*/}

        </AppProvider>
    );
}
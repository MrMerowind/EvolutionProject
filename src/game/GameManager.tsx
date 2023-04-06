import * as PIXI from "pixi.js";
import { Stage, Container, Sprite, Text } from "@pixi/react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { mainPixiFont } from "../globalData/Fonts";
import { GameManagerStoreProvider, useGameManagerStore } from "./GameManagerStoreContext";
import { GameManagerStore } from "./GameManagerStore";
import AnimationRenderer from "../animation/AnimationData";
import Player from "../player/Player";
import { AnimationState, Direction, DirectionHorizontal } from "../globalData/Types";
import PlayerRenderer from "../player/PlayerRenderer";
import MapRenderer from "../map/MapRenderer";
import { LoadingScreenRenderer } from "../loadingScreen/LoadingScreenRenderer";
import EnemyRenderer from "../enemies/EnemyRenderer";



export const GameManager = () => {

    const ctx = useGameManagerStore();
    const [miliseconds, setMiliseconds] = useState(0);

    const prevTime = useRef(new Date().getTime());
    const currentTime = useRef(new Date().getTime());
    const timeDifference = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            currentTime.current = new Date().getTime();
            timeDifference.current = currentTime.current - prevTime.current;
            setMiliseconds(previousTime => previousTime + timeDifference.current);
            prevTime.current = currentTime.current;
            ctx.camera.moveTowardsPlayer();
        }, 1);
        ctx.camera.centerOnPlayer();

        return () => {
            clearInterval(interval);
        };
    }, []);

    const areGraphicLoaded = useRef<boolean>(ctx.areGraphicsLoaded);


    if(!areGraphicLoaded) return (
        <GameManagerStoreProvider gameData={ctx}>
            <Stage width={ctx.screen.getWidth()} height={ctx.screen.getHeight()}>
                <LoadingScreenRenderer />
            </Stage>
        </GameManagerStoreProvider>
    );
    // TODO: rewrite
    return (
        <GameManagerStoreProvider gameData={ctx}>
            <Stage width={ctx.screen.getWidth()} height={ctx.screen.getHeight()}>

                {/*Render map*/}
                <MapRenderer />

                {/*Render enemies*/}
                <EnemyRenderer miliseconds={miliseconds} delta={timeDifference.current}/>

                {/*Player is rendered in Enemy Renderer so its z index is correct.*/}

                {/*Render UI*/}

                {/*<Container x={0} y={0}>
          <Text text="O, dziala!" x={0} y={0} anchor={{ x: 0, y: 0 }} style={mainPixiFont}/>
        </Container>*/}
            </Stage>
        </GameManagerStoreProvider>
    );
};
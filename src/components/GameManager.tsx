import { Stage/*, Text*/ } from "@pixi/react";
import React, { useEffect } from "react";
/*import { mainPixiFont } from "../globalData/Fonts";*/
import { GameManagerStoreProvider, useGameManagerStore } from "../hooks/useGameManagerStore";
import { MainGameComponent } from "./MainGameComponent";



export const GameManager = () => {

    const ctx = useGameManagerStore();

    return (
        <GameManagerStoreProvider gameData={ctx}>
            <Stage width={ctx.screen.getWidth()} height={ctx.screen.getHeight()}>
                <MainGameComponent />
            </Stage>
        </GameManagerStoreProvider>
    );
};
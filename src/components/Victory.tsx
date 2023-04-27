import React, { useEffect } from "react";
import { Text } from "@pixi/react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import { subVictoryFont, victoryFont } from "../data/fonts";

export default function Victory() {
    
    const ctx = useGameManagerStore();

    const victoryTextPositionX = ctx.screen.getCenterHorizontal();
    const victoryTextPositionY = ctx.screen.getCenterVertical();
    const subTextOffsetFromVictory = 70;

    const handleUserKeyPressDown = (e: KeyboardEvent) => {
        if(e.code === "Escape") ctx.map.level = 0;
    };

    useEffect(() => {
        window.addEventListener("keydown", handleUserKeyPressDown);
        return () => {
            window.removeEventListener("keydown", handleUserKeyPressDown);
        };
    }, []);

    return (
        <>
            <Text text={"Victory"} anchor={0.5} x={victoryTextPositionX} y={victoryTextPositionY} style={victoryFont} />
            <Text text={"Press escape to exit"} anchor={0.5} x={victoryTextPositionX} y={victoryTextPositionY + subTextOffsetFromVictory} style={subVictoryFont} />
        </>
    );
}

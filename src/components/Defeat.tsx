import React, { useEffect } from "react";
import { Text } from "@pixi/react";
import { useGameManagerStore } from "../hooks/useGameManagerStore";
import { subDefeatFont, defeatFont } from "../data/fonts";

export default function Defeat() {
    
    const ctx = useGameManagerStore();

    const defeatTextPositionX = ctx.screen.getCenterHorizontal();
    const defeatTextPositionY = ctx.screen.getCenterVertical();
    const subTextOffsetFromDefeat = 70;

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
            <Text text={"Defeat"} anchor={0.5} x={defeatTextPositionX} y={defeatTextPositionY} style={defeatFont} />
            <Text text={"Press escape to exit"} anchor={0.5} x={defeatTextPositionX} y={defeatTextPositionY + subTextOffsetFromDefeat} style={subDefeatFont} />
        </>
    );
}

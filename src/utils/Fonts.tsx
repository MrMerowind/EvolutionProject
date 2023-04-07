import { TextStyle } from "pixi.js";

export const levelFont = new TextStyle({
    align: "center",
    fontFamily: "\"Source Sans Pro\", Helvetica, sans-serif",
    fontSize: 20,
    fontWeight: "100",
    fill: "#ffffff",
    stroke: "#ffffff",
    strokeThickness: 2,
    letterSpacing: 10,
    dropShadow: false,
    wordWrap: true,
    wordWrapWidth: 440,
});

export const statsFont = new TextStyle({
    align: "center",
    fontFamily: "\"Source Sans Pro\", Helvetica, sans-serif",
    fontSize: 15,
    fontWeight: "100",
    fill: "#ffffff",
    stroke: "#ffffff",
    strokeThickness: 1,
    letterSpacing: 7,
    dropShadow: false,
    wordWrap: true,
    wordWrapWidth: 440,
});
import * as PIXI from "pixi.js";
import { Stage, Container, Sprite, Text } from '@pixi/react';
import React from 'react';
import { mainPixiFont } from "../global/Fonts";
import { graphicPath } from "../global/GraphicPaths";
import Player from "../player/Player";
import { GameScreen } from "../screen/GameScreen";
import { GameCamera } from "../screen/GameCamera";
import PlayerRenderer from "../player/PlayerRenderer";




export const GameManager = () => {

  // TODO: remove
  const testPlayer = new Player();
  const testCamera = new GameCamera();
  const testScreen = new GameScreen();
  testScreen.SetSize(800,600);
  testCamera.CenterOnPlayer(testScreen, testPlayer);

  // TODO: rewrite
  return (
    <Stage width={testScreen.GetWidth()} height={testScreen.GetHeight()}>
      <PlayerRenderer player={testPlayer} camera={testCamera} />

      <Container x={0} y={0}>
        <Text text="O, dziala!" x={200} y={200} anchor={{ x: 0.5, y: 0.5 }} style={mainPixiFont}/>
      </Container>
    </Stage>
  );
};
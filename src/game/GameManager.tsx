import * as PIXI from "pixi.js";
import { Stage, Container, Sprite, Text } from '@pixi/react';
import React from 'react';
import { mainPixiFont } from "../global/Fonts";
import { graphicPath } from "../global/GraphicPaths";




export const GameManager = () => {

  // TODO: rewrite
  return (
    <Stage>
      <Sprite
        image={graphicPath.player.body[0]}
        x={200}
        y={200}
        anchor={{ x: 0.5, y: 0.5 }}
      />

      <Container x={0} y={0}>
        <Text text="O, dziala!" x={200} y={200} anchor={{ x: 0.5, y: 0.5 }} style={mainPixiFont}/>
      </Container>
    </Stage>
  );
};
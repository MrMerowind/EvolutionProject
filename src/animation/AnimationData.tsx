import * as PIXI from "pixi.js";
import { Sprite } from "@pixi/react";
import { AnimationState, Direction, DirectionHorizontal } from "../globalData/Types";
import { useGameManagerStore } from "../game/GameManagerStoreContext";
import { useEffect, useState } from "react";


class AnimationSubData{
    horizontalFrames: number;
    verticalFrames: number;
    animationDirection: Direction;
    animationFrameIndexStart: number;
    animationFrameIndexEnd: number;
    animationFrameTime: number;
    graphicWidth: number;
    graphicHeight: number;
    imageRef: PIXI.BaseTexture | null;

    constructor()
    {
        this.horizontalFrames = 0;
        this.verticalFrames = 0;
        this.animationDirection = null;
        this.animationFrameIndexStart = 0;
        this.animationFrameIndexEnd = 0;
        this.animationFrameTime = 0;
        this.graphicHeight = 0;
        this.graphicWidth = 0;
        this.imageRef = null;
    }

    setData(horizontalFrames: number, verticalFrames: number,
        animationDirection: Direction, animationFrameIndexStart: number, animationFrameIndexEnd: number, animationFrameTime: number,
        graphicWidth: number, graphicHeight: number, imgRef: PIXI.BaseTexture)
    {
        this.horizontalFrames = horizontalFrames;
        this.verticalFrames = verticalFrames;
        this.animationDirection = animationDirection;
        this.animationFrameIndexStart = animationFrameIndexStart;
        this.animationFrameIndexEnd = animationFrameIndexEnd;
        this.animationFrameTime = animationFrameTime;
        this.graphicWidth = graphicWidth;
        this.graphicHeight = graphicHeight;
        this.imageRef = imgRef;
    }

}

export class AnimationData{
    animationLeft: AnimationSubData;
    animationRight: AnimationSubData;
    animationUp: AnimationSubData;
    animationDown: AnimationSubData;

    isSetLeft: boolean;
    isSetRight: boolean;

    constructor()
    {
        this.isSetLeft = false;
        this.isSetRight = false;
        this.animationDown = new AnimationSubData();
        this.animationUp = new AnimationSubData();
        this.animationLeft = new AnimationSubData();
        this.animationRight = new AnimationSubData();

    }

    public getAnimation(direction: Direction | DirectionHorizontal): AnimationSubData
    {
        console.log(direction);
        switch(direction)
        {
            case "right":
                return this.animationRight;
            case "up":
                return this.animationUp;
            case "down":
                return this.animationDown;
            case "left":
                return this.animationLeft;
            default:
                throw new Error("AnimationData direction is null");
        }
    }
    
}

interface AnimationRendererProps{
    animationDataWalking: AnimationData;
    animationDataAttacking: AnimationData;
    animationDataStanding: AnimationData;
    
    animationState: AnimationState;
    facedDirection: Direction;
    secondaryFacedDirection: DirectionHorizontal;
    time: number;
    scale: number;
    positionX: number;
    positionY: number;
    rotation: number;

}

export default function AnimationRenderer(props: AnimationRendererProps) {

    const ctx = useGameManagerStore();

    let animDataChosen: AnimationData;
    let reversed = false;

    switch(props.animationState)
    {
        case "attacking": animDataChosen = props.animationDataAttacking; break; 
        case "walking": animDataChosen = props.animationDataWalking; break; 
        case "standing": animDataChosen = props.animationDataStanding; break; 
        default: return null;
    }
    let animationDataStateAndDirection: AnimationSubData | null;
    animationDataStateAndDirection = animDataChosen.getAnimation(props.facedDirection);
    if(animationDataStateAndDirection.imageRef === null)
    {
        // Chosing secendary direction if first is missing omiting top and down
        animationDataStateAndDirection = animDataChosen.getAnimation(props.secondaryFacedDirection);
    }
    if(animationDataStateAndDirection.imageRef === null)
    {
        // Choosing oposite direction if graphics are missing
        animationDataStateAndDirection = animDataChosen.getAnimation((props.secondaryFacedDirection === "left" ? "right" : "left"));
        reversed = true;
    }
    if(animationDataStateAndDirection.imageRef === null)
    {
        // Did not find any graphic
        return null;
    }

    
    const graphicWidth = animationDataStateAndDirection!.graphicWidth / animationDataStateAndDirection!.horizontalFrames;
    const graphicHeight = animationDataStateAndDirection!.graphicHeight / animationDataStateAndDirection!.verticalFrames;
    
    const aFIS = animationDataStateAndDirection!.animationFrameIndexStart;
    const aFIE = animationDataStateAndDirection!.animationFrameIndexEnd;
    const aFT = animationDataStateAndDirection!.animationFrameTime;

    const frameNumber = Math.floor(props.time / aFT) % Math.floor(aFIE - aFIS + 1);

    const graphicPositionX = (frameNumber % animationDataStateAndDirection!.horizontalFrames) * graphicWidth;
    const graphicPositionY = ((frameNumber - (frameNumber % animationDataStateAndDirection!.horizontalFrames))
        / animationDataStateAndDirection!.horizontalFrames) * graphicHeight;

    

    const imageRef = animationDataStateAndDirection?.imageRef;
    if(imageRef === null) return null;

    const cutRegion = new PIXI.Rectangle(graphicPositionX, graphicPositionY, graphicWidth, graphicHeight);
    const cutTexture = new PIXI.Texture(imageRef, cutRegion);

    let reversedMultiplier: number;
    if(reversed) reversedMultiplier = -1;
    else reversedMultiplier = 1;

  return (
    <Sprite texture={cutTexture} width={graphicWidth * props.scale * reversedMultiplier} height={graphicHeight * props.scale} 
     x={props.positionX} y={props.positionY} rotation={props.rotation} anchor={0.5}/>
  )
}

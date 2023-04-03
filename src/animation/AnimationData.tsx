import * as PIXI from "pixi.js";
import { Sprite } from "@pixi/react";
import { AnimationState, Direction } from "../global/types";


class AnimationSubData{
    horizontalFrames: number;
    verticalFrames: number;
    animationDirection: Direction;
    animationFrameIndexStart: number;
    animationFrameIndexEnd: number;
    animationFrameTime: number;
    graphicWidth: number;
    graphicHeight: number;
    imageRef: PIXI.Texture | null;

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
        graphicWidth: number, graphicHeight: number, imgRef: PIXI.Texture)
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

    public getAnimation(direction: Direction): AnimationSubData
    {
        switch(direction)
        {
            case "right":
                return this.animationRight;
            case "up":
                return this.animationUp;
            case "down":
                return this.animationDown;
            default:
                return this.animationLeft;
        }
    }
    
}

interface AnimationRendererProps{
    animationDataWalking: AnimationData;
    animationDataAttacking: AnimationData;
    animationDataStanding: AnimationData;
    animationState: AnimationState;

    facedDirection: Direction;
    secondaryFacedDirection: Direction & ("left" | "right");
    time: number;
    scale: number;
    positionX: number;
    positionY: number;
    rotation: number;

}

export default function AnimationRenderer(props: AnimationRendererProps) {
    let animDataChosen: AnimationData;
    switch(props.animationState)
    {
        case "attacking": animDataChosen = props.animationDataAttacking; break; 
        case "walking": animDataChosen = props.animationDataWalking; break; 
        case "standing": animDataChosen = props.animationDataStanding; break; 
        default: return null;
    }
    let animationDataStateAndDirection: AnimationSubData | null;
    animationDataStateAndDirection = animDataChosen.getAnimation(props.facedDirection);
    if(animationDataStateAndDirection === null)
    {
        // Chosing secendary direction if first is missing omiting top and down
        animationDataStateAndDirection = animDataChosen.getAnimation(props.secondaryFacedDirection);
    }
    if(animationDataStateAndDirection === null)
    {
        // Choosing oposite direction if graphics are missing
        animationDataStateAndDirection = animDataChosen.getAnimation(props.secondaryFacedDirection === "left" ? "right" : "left");
    }
    if(animationDataStateAndDirection === null)
    {
        // Did not find any graphic
        return null;
    }

    
    const graphicWidth = animationDataStateAndDirection!.graphicWidth / animationDataStateAndDirection!.horizontalFrames;
    const graphicHeight = animationDataStateAndDirection!.graphicHeight / animationDataStateAndDirection!.verticalFrames;
    
    const aFIS = animationDataStateAndDirection!.animationFrameIndexStart;
    const aFIE = animationDataStateAndDirection!.animationFrameIndexEnd;
    const aFT = animationDataStateAndDirection!.animationFrameTime;

    const frameNumber = (props.time / aFT) % (aFIE - aFIS + 1);

    const graphicPositionX = frameNumber % animationDataStateAndDirection!.horizontalFrames;
    const graphicPositionY = (frameNumber - graphicPositionX) / animationDataStateAndDirection!.horizontalFrames;


  return (
    <Sprite texture={animationDataStateAndDirection!.imageRef!} width={graphicWidth} height={graphicHeight}
    filterArea={new PIXI.Rectangle(graphicPositionX, graphicPositionY, graphicWidth, graphicHeight)} 
    scale={props.scale} x={props.positionX} y={props.positionY} rotation={props.rotation}/>
  )
}

/* eslint-disable react/react-in-jsx-scope */
import { Texture, Rectangle} from "pixi.js";
import { Sprite, TilingSprite } from "@pixi/react";
import { AnimationState, Direction, DirectionHorizontal } from "../data/types";
import { CreatureAnimation, AnimationSubData } from "../utils/animationData";

interface AnimationComponentProps{
    animationDataWalking: CreatureAnimation;
    animationDataAttacking: CreatureAnimation;
    animationDataStanding: CreatureAnimation;
    
    animationState: AnimationState;
    facedDirection: Direction;
    secondaryFacedDirection: DirectionHorizontal;
    time: number;
    scale: number;
    positionX: number;
    positionY: number;
    rotation: number;

}

export function AnimationComponent(props: AnimationComponentProps) {

    let animDataChosen: CreatureAnimation;
    let reversed = false;

    switch(props.animationState)
    {
    case AnimationState.attacking: animDataChosen = props.animationDataAttacking; break; 
    case AnimationState.walking: animDataChosen = props.animationDataWalking; break; 
    case AnimationState.standing: animDataChosen = props.animationDataStanding; break; 
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
        const opositeDirection = props.secondaryFacedDirection === DirectionHorizontal.left ? DirectionHorizontal.right : DirectionHorizontal.left;
        animationDataStateAndDirection = animDataChosen.getAnimation(opositeDirection);
        reversed = true;
    }
    else
    {
        reversed = false;
    }
    // Did not find any graphic
    if(animationDataStateAndDirection.imageRef === null) return null;
    
    const graphicWidth = animationDataStateAndDirection.graphicWidth / animationDataStateAndDirection.horizontalFrames;
    const graphicHeight = animationDataStateAndDirection.graphicHeight / animationDataStateAndDirection.verticalFrames;
    
    // To create animated sprite you need separate images so it has to be cut anyway.
    const aFIS = animationDataStateAndDirection.animationFrameIndexStart;
    const aFIE = animationDataStateAndDirection.animationFrameIndexEnd;
    const aFT = animationDataStateAndDirection.animationFrameTime;

    const one = 1;
    const frameNumber = Math.floor(props.time / aFT) % Math.floor(aFIE - aFIS + one) + aFIS;

    const graphicPositionX = (frameNumber % animationDataStateAndDirection.horizontalFrames) * graphicWidth;
    
    const graphicPositionY = Math.floor((frameNumber - Math.floor(frameNumber % animationDataStateAndDirection.horizontalFrames))
    / animationDataStateAndDirection.horizontalFrames) * graphicHeight;

    const imageRef = animationDataStateAndDirection.imageRef;

    // Cutting region here because scale affects also scale of cutting area :c
    // So it only works with scale 1
    const cutRegion = new Rectangle(graphicPositionX, graphicPositionY, graphicWidth, graphicHeight);
    const cutTexture = new Texture(imageRef, cutRegion);

    const multiplier = 1;

    let reversedMultiplier: number;
    if(reversed) reversedMultiplier = -multiplier;
    else reversedMultiplier = multiplier;

    const graphicWidthOnScreen = (graphicWidth * props.scale * reversedMultiplier);
    const graphicHeightOnScreen = (graphicHeight * props.scale);

    const anchorX = 0.5;
    const anchorY = 0.7;

    return (
        <>
            <Sprite texture={cutTexture} width={graphicWidthOnScreen} height={graphicHeightOnScreen} scale={props.scale}
                x={props.positionX} y={props.positionY} rotation={props.rotation} anchor={[anchorX, anchorY]}/>
        </>
    );
}

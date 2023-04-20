import { BaseTexture} from "pixi.js";
import { Direction, DirectionHorizontal } from "../data/types";

export class AnimationSubData{
    horizontalFrames: number;
    verticalFrames: number;
    animationFrameIndexStart: number;
    animationFrameIndexEnd: number;
    animationFrameTime: number;
    graphicWidth: number;
    graphicHeight: number;
    imageRef: BaseTexture | null;

    constructor()
    {
        this.horizontalFrames = 0;
        this.verticalFrames = 0;
        this.animationFrameIndexStart = 0;
        this.animationFrameIndexEnd = 0;
        this.animationFrameTime = 0;
        this.graphicHeight = 0;
        this.graphicWidth = 0;
        this.imageRef = null;
    }

    setData(horizontalFrames: number, verticalFrames: number, animationFrameIndexStart: number,
        animationFrameIndexEnd: number, animationFrameTime: number,
        graphicWidth: number, graphicHeight: number, imgRef: BaseTexture)
    {
        this.horizontalFrames = horizontalFrames;
        this.verticalFrames = verticalFrames;
        this.animationFrameIndexStart = animationFrameIndexStart;
        this.animationFrameIndexEnd = animationFrameIndexEnd;
        this.animationFrameTime = animationFrameTime;
        this.graphicWidth = graphicWidth;
        this.graphicHeight = graphicHeight;
        this.imageRef = imgRef;
    }

}

export class CreatureAnimation{
    animationLeft: AnimationSubData;
    animationRight: AnimationSubData;
    animationUp: AnimationSubData;
    animationDown: AnimationSubData;

    constructor()
    {
        this.animationDown = new AnimationSubData();
        this.animationUp = new AnimationSubData();
        this.animationLeft = new AnimationSubData();
        this.animationRight = new AnimationSubData();

    }

    public getAnimation(direction: Direction | DirectionHorizontal): AnimationSubData
    {
        switch(direction)
        {
        case Direction.up:
            return this.animationUp;
        case Direction.down:
            return this.animationDown;
        case Direction.right:
        case DirectionHorizontal.right:
            return this.animationRight;
        case Direction.left:
        case DirectionHorizontal.left:
            return this.animationLeft;
        default:
            throw new Error("AnimationData direction is null");
        }
    }
    
}

export class SkillAnimation{
    animation: AnimationSubData;

    constructor()
    {
        this.animation = new AnimationSubData();
    }

    public getAnimation(): AnimationSubData
    {
        return this.animation;
    }

    public setAnimation(value: AnimationSubData)
    {
        this.animation = value;
    }
    
}
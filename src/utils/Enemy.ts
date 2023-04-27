import { CreatureAnimation } from "./animationData";
import { AnimationState, Direction, DirectionHorizontal } from "../data/types";
import Player from "./player";
import EnemyList from "./enemyList";
import { idLimit } from "../data/globalData";

export default class Enemy{
    private id: string;
    private level: number;
    private maxHp: number;
    private currentHp: number;
    private damage: number;
    private positionX: number;
    private positionY: number;
    private facedDirection: Direction;
    private secondaryFacedDirection: DirectionHorizontal;
    private animationState: AnimationState;
    private expReward: number;
    private scale: number;
    private speed: number;
    private spaceRadius: number;
    private shadowAnchorY: number;
    public isBoss: boolean;

    private animationDataWalking: CreatureAnimation;
    private animationDataAttacking: CreatureAnimation;
    private animationDataStanding: CreatureAnimation;

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    public static readonly bossScale = 3;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    public static readonly baseScale = 1;

    constructor()
    {
        this.id = Math.floor(Math.random() * idLimit).toString();
        this.level = 0;
        this.maxHp = 1;
        this.currentHp = 1;
        this.damage = 1;
        this.positionX = 0;
        this.positionY = 0;
        this.expReward = 1;
        this.scale = 1;
        this.speed = 0.025;
        this.facedDirection = Direction.down;
        this.secondaryFacedDirection = DirectionHorizontal.right;
        this.animationState = AnimationState.walking;
        this.spaceRadius = 30;
        this.shadowAnchorY = 0.6;
        this.isBoss = false;

        this.animationDataAttacking = new CreatureAnimation();
        this.animationDataWalking = new CreatureAnimation();
        this.animationDataStanding = new CreatureAnimation();
    }
    clone(): Enemy
    {
        const result = new Enemy();
        result.id = Math.floor(Math.random() * idLimit).toString();
        result.level = this.level;
        result.maxHp = this.maxHp;
        result.currentHp = this.maxHp;
        result.damage = this.damage;
        result.positionX = this.positionX;
        result.positionY = this.positionY;
        result.expReward = this.expReward;
        result.scale = this.scale;
        result.speed = this.speed;
        result.facedDirection = this.facedDirection;
        result.secondaryFacedDirection = this.secondaryFacedDirection;
        result.animationState = this.animationState;
        result.animationDataAttacking = this.animationDataAttacking;
        result.animationDataStanding = this.animationDataStanding;
        result.animationDataWalking = this.animationDataWalking;
        result.spaceRadius = this.spaceRadius;
        result.shadowAnchorY = this.shadowAnchorY;
        result.isBoss = this.isBoss;
        return result;
    }
    public getAnimationData(animationState: AnimationState): CreatureAnimation
    {
        switch(animationState)
        {
        case AnimationState.attacking: return this.animationDataAttacking;
        case AnimationState.standing: return this.animationDataStanding;
        case AnimationState.walking: return this.animationDataWalking;
        }
        throw new Error("Unknown animationState in Player.getAnimationData()");
    }
    public getPositionX(): number
    {
        return this.positionX;
    }
    public getShadowAnchorY()
    {
        return this.shadowAnchorY;
    }
    public getPositionY(): number
    {
        return this.positionY;
    }
    public getAnimationState(): AnimationState
    {
        return this.animationState;
    }
    public getFacedDirection(): Direction
    {
        return this.facedDirection;
    }
    public getSecondaryFacedDirection(): DirectionHorizontal
    {
        return this.secondaryFacedDirection;
    }
    public getPosition(): [x: number, y: number]
    {
        return [this.positionX, this.positionY];
    }
    public getId(): string
    {
        return this.id;
    }
    public getMaxHp(): number
    {
        return this.maxHp;
    }
    public getCurrentHp(): number
    {
        return this.currentHp;
    }
    public getExpReward(): number
    {
        return this.expReward;
    }
    public getLevel(): number
    {
        return this.level;
    }
    public getScale(): number
    {
        return this.scale;
    }
    public getSpeed(): number
    {
        return this.speed;
    }
    public getSpaceRadius(): number
    {
        return this.spaceRadius;
    }
    public move(x:number, y: number)
    {
        this.positionX += x;
        this.positionY += y;
    }
    public moveUnits(x:number, y: number)
    {
        this.positionX += x * this.speed;
        this.positionY += y * this.speed;
    }
    public moveUnitOrthogonal(playerHandle: Player, currentEnemiesHandle: EnemyList, delta: number)
    {
        const moveX = - (playerHandle.getPositionY() - this.positionY);
        const moveY = playerHandle.getPositionX() - this.positionX;

        const distance = Math.hypot(moveX, moveY);
        const maximumDistance = 4000;

        let finalPositionX = this.positionX;
        let finalPositionY = this.positionY;

        const zeroDistance = 0;
        if(distance !== zeroDistance)
        {
            finalPositionX = this.positionX + moveX / distance * this.getSpeed() * delta;
            finalPositionY = this.positionY + moveY / distance * this.getSpeed() * delta;
        }

        if(distance > maximumDistance)
        {
            finalPositionX = this.positionX + moveX / distance * playerHandle.getSpeed();
            finalPositionY = this.positionY + moveY / distance * playerHandle.getSpeed();
        }

        // Preventing moving through each other
        let changePosition = true;
        currentEnemiesHandle.getList().forEach(enemy => {
            if(enemy !== this)
            {
                const distanceToAnother = Math.hypot(finalPositionX - enemy.getPositionX(), finalPositionY - enemy.getPositionY());
                const minimumSpaceBetween = Math.max(enemy.getSpaceRadius(), this.spaceRadius);
                if(distanceToAnother <= minimumSpaceBetween)
                {
                    changePosition = false;
                    return;
                }
            }
        });

        if(changePosition)
        {
            this.animationState = AnimationState.walking;
            this.positionX = finalPositionX;
            this.positionY = finalPositionY;
        }
        else
        {
            this.animationState = AnimationState.standing;
        }
    } 
    public moveUnitTowardsPlayer(playerHandle: Player, currentEnemiesHandle: EnemyList, delta: number)
    {
        const moveX = playerHandle.getPositionX() - this.positionX;
        const moveY = playerHandle.getPositionY() - this.positionY;

        const distance = Math.hypot(moveX, moveY);
        const zeroDistance = 0;

        if(Math.abs(moveX) >= Math.abs(moveY))
        {
            const zeroDistance = 0;
            if(moveX > zeroDistance) this.facedDirection = Direction.right;
            else if(moveX < zeroDistance)this.facedDirection = Direction.left;
        }
        else
        {
            if(moveY > zeroDistance) this.facedDirection = Direction.down;
            else if(moveY < zeroDistance) this.facedDirection = Direction.up;
        }
        
        if(moveX > zeroDistance) this.secondaryFacedDirection = DirectionHorizontal.right;
        else if(moveX < zeroDistance) this.secondaryFacedDirection = DirectionHorizontal.left;

        let finalPositionX = this.positionX;
        let finalPositionY = this.positionY;

        if(distance !== zeroDistance)
        {
            finalPositionX = this.positionX + moveX / distance * this.getSpeed() * delta;
            finalPositionY = this.positionY + moveY / distance * this.getSpeed() * delta;
        }

        const maximumDistance = 4000;
        if(distance > maximumDistance)
        {
            finalPositionX = this.positionX + moveX / distance * playerHandle.getSpeed() * delta;
            finalPositionY = this.positionY + moveY / distance * playerHandle.getSpeed() * delta;
        }
        
        // Attacking
        const distanceToPlayer = Math.hypot(finalPositionX - playerHandle.getPositionX(), finalPositionY - playerHandle.getPositionY());
        if(distanceToPlayer <= playerHandle.getSpaceRadius())
        {
            const milisecondsInSecond = 1000;
            const framesPerSecond = 60;
            playerHandle.subtractHp(this.damage * delta / milisecondsInSecond * framesPerSecond);
            this.animationState = AnimationState.attacking;
            return;
        }

        // Preventing moving through each other
        let changePosition = true;
        currentEnemiesHandle.getList().forEach(enemy => {
            if(enemy !== this)
            {
                const distanceToAnother = Math.hypot(finalPositionX - enemy.getPositionX(), finalPositionY - enemy.getPositionY());
                const minimumSpaceBetween = Math.max(enemy.getSpaceRadius(), this.spaceRadius);
                if(distanceToAnother <= minimumSpaceBetween)
                {
                    this.moveUnitOrthogonal(playerHandle, currentEnemiesHandle, delta);
                    changePosition = false;
                    return;
                }
            }
        });

        if(changePosition)
        {
            this.animationState = AnimationState.walking;
            this.positionX = finalPositionX;
            this.positionY = finalPositionY;
        }
    }
    public addHp(value: number): void
    {
        this.currentHp += value;
        const minimumHealth = 0;
        if(this.currentHp < minimumHealth) this.currentHp = minimumHealth;
        if(this.currentHp > this.getMaxHp()) this.currentHp = this.getMaxHp();
    }
    public setSpeed(value: number)
    {
        const minimumSpeed = 0;
        if(value < minimumSpeed) this.speed = minimumSpeed;
        else this.speed = value;
    }
    public setScale(value: number)
    {
        const minimumScale = 0;
        if(value <= minimumScale) this.scale = 1;
        else this.scale = value;
    }
    public setPositionX(value: number)
    {
        this.positionX = value;
    }
    public setPositionY(value: number)
    {
        this.positionY = value;
    }
    public createPrototype(level: number, maxHp: number, damage: number,
        expReward: number, scale: number, speed: number,
        animationDataStanding: CreatureAnimation, animationDataWalking: CreatureAnimation,
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        animationDataAttacking: CreatureAnimation, shadowAnchorY: number, spaceRadius = 30, boss = false): void
    {
        this.level = level;
        this.maxHp = maxHp;
        this.damage = damage;
        this.expReward = expReward;
        this.scale = scale;
        this.speed = speed;
        this.animationDataStanding = animationDataStanding;
        this.animationDataWalking = animationDataWalking;
        this.animationDataAttacking = animationDataAttacking;
        this.spaceRadius = spaceRadius;
        this.shadowAnchorY = shadowAnchorY;
        this.isBoss = boss;
    }
}
enum Direction{
    up,
    down,
    left,
    right
}

export class CharacterAnimation{
    imgsMoveLeft: string[] | null = null;
    imgsMoveRight: string[] | null = null;
    imgsMoveUp: string[] | null = null;
    imgsMoveDown: string[] | null = null;

    imgsAttackLeft: string[] | null = null;
    imgsAttackRight: string[] | null = null;
    imgsAttackUp: string[] | null = null;
    imgsAttackDown: string[] | null = null;
}
type bodyType = 0 | 1 | 2;
type headType = 0 | 1 | 2;
type hairType = 0 | 1 | 2;

export class PlayerOutfit {
  
    constructor()
    {
        this.body = 0;
        this.head = 0;
        this.hair = 0;
    }

    private body: bodyType;
    private head: headType;
    private hair: hairType;

    public setBody(value: bodyType): void
    {
        this.body = value;
    }
    public setHead(value: headType): void
    {
        this.head = value;
    }
    public setHair(value: hairType): void
    {
        this.hair = value;
    }

    public getValues(): [body: number, head: number, hair: number]
    {
        return [this.body, this.head, this.hair];
    }
}

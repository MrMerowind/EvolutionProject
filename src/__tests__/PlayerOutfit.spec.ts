import { PlayerOutfit } from "../player/PlayerOutfit";

describe("Player outfit", () => {
    it("Set and get outfit", () => {
        const testPlayerOutfit = new PlayerOutfit();

        expect(testPlayerOutfit).toBeDefined();
        expect(testPlayerOutfit.getValues()[0]).toBe(0);
        expect(testPlayerOutfit.getValues()[1]).toBe(0);
        expect(testPlayerOutfit.getValues()[2]).toBe(0);

        testPlayerOutfit.setBody(2);
        testPlayerOutfit.setHead(2);
        testPlayerOutfit.setHair(2);

        expect(testPlayerOutfit.getValues()[0]).toBe(2);
        expect(testPlayerOutfit.getValues()[1]).toBe(2);
        expect(testPlayerOutfit.getValues()[2]).toBe(2);

        expect.assertions(7);
    });
});
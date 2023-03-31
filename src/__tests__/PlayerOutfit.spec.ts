import { PlayerOutfit } from "../player/PlayerOutfit";

describe("Player outfit", () => {
    it("Set and get outfit", () => {
        const testPlayerOutfit = new PlayerOutfit();

        expect(testPlayerOutfit).toBeDefined();
        expect(testPlayerOutfit.GetValues()[0]).toBe(0);
        expect(testPlayerOutfit.GetValues()[1]).toBe(0);
        expect(testPlayerOutfit.GetValues()[2]).toBe(0);

        testPlayerOutfit.SetBody(2);
        testPlayerOutfit.SetHead(2);
        testPlayerOutfit.SetHair(2);

        expect(testPlayerOutfit.GetValues()[0]).toBe(2);
        expect(testPlayerOutfit.GetValues()[1]).toBe(2);
        expect(testPlayerOutfit.GetValues()[2]).toBe(2);

        expect.assertions(7);
    });
});
import Player from "../Classes/Player";

describe("Player details", () => {
    it("Values generated", () => {
        const testPlayer = new Player();
        expect(testPlayer.GetId()).toBeTruthy();
        expect(testPlayer.GetMaxHp())
            .toBe(testPlayer.GetCurrentHp());
        expect(testPlayer.GetNeededExp()).toBeGreaterThanOrEqual(0);
        expect(testPlayer.GetCurrentExp()).toBe(0);
        expect(testPlayer.GetStrength()).toBe(0);
        expect(testPlayer.GetVitality()).toBe(0);
        expect(testPlayer.GetAgility()).toBe(0);
        expect(testPlayer.GetLevel()).toBe(1);
        expect(testPlayer.GetPoints()).toBe(0);
        expect.assertions(9);
    });


    it("Adding count to player details", () => {
        const testPlayer = new Player();
        testPlayer.AddStrength(1);
        testPlayer.AddVitality(1);
        testPlayer.AddAgility(1);
        testPlayer.AddLevel(1);
        testPlayer.AddExp(1);
        testPlayer.AddHp(1000);
        testPlayer.AddPoints(1);

        expect(testPlayer.GetId()).toBeTruthy();
        expect(testPlayer.GetMaxHp())
            .toBeGreaterThanOrEqual(testPlayer.GetCurrentHp());
        expect(testPlayer.GetNeededExp()).toBeGreaterThanOrEqual(0);
        expect(testPlayer.GetCurrentExp()).toBe(1);
        expect(testPlayer.GetStrength()).toBe(1);
        expect(testPlayer.GetVitality()).toBe(1);
        expect(testPlayer.GetAgility()).toBe(1);
        expect(testPlayer.GetLevel()).toBe(2);
        expect(testPlayer.GetPoints()).toBe(1);
        expect.assertions(9);
    });
})
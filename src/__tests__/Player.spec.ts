import Player from "../player/Player";

describe("Player details", () => {
    it("Values generated", () => {
        const testPlayer = new Player();
        expect(testPlayer.getId()).toBeTruthy();
        expect(testPlayer.getMaxHp())
            .toBe(testPlayer.getCurrentHp());
        expect(testPlayer.getNeededExp()).toBeGreaterThanOrEqual(0);
        expect(testPlayer.getCurrentExp()).toBe(0);
        expect(testPlayer.getStrength()).toBe(0);
        expect(testPlayer.getVitality()).toBe(0);
        expect(testPlayer.getAgility()).toBe(0);
        expect(testPlayer.getLevel()).toBe(1);
        expect(testPlayer.getPoints()).toBe(0);
        expect.assertions(9);
    });


    it("Adding count to player details", () => {
        const testPlayer = new Player();
        testPlayer.addStrength(1);
        testPlayer.addVitality(1);
        testPlayer.addAgility(1);
        testPlayer.addLevel(1);
        testPlayer.addExp(1);
        testPlayer.addHp(1000);
        testPlayer.addPoints(1);

        expect(testPlayer.getId()).toBeTruthy();
        expect(testPlayer.getMaxHp())
            .toBeGreaterThanOrEqual(testPlayer.getCurrentHp());
        expect(testPlayer.getNeededExp()).toBeGreaterThanOrEqual(0);
        expect(testPlayer.getCurrentExp()).toBe(1);
        expect(testPlayer.getStrength()).toBe(1);
        expect(testPlayer.getVitality()).toBe(1);
        expect(testPlayer.getAgility()).toBe(1);
        expect(testPlayer.getLevel()).toBe(2);
        expect(testPlayer.getPoints()).toBe(1);
        expect.assertions(9);
    });
})
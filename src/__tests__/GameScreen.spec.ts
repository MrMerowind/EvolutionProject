import { GameScreen } from "../screen/GameScreen"

describe("Game screen", () => {
    it("Set and get screen size", () => {
        const testGameScreen = new GameScreen();

        expect(testGameScreen).toBeDefined();

        testGameScreen.setSize(0, 0);
        expect(testGameScreen.getWidth()).toBe(0);
        expect(testGameScreen.getHeight()).toBe(0);
        expect(testGameScreen.getSize()[0]).toBe(0);
        expect(testGameScreen.getSize()[1]).toBe(0);

        testGameScreen.setSize(100, 200);
        expect(testGameScreen.getWidth()).toBe(100);
        expect(testGameScreen.getHeight()).toBe(200);
        expect(testGameScreen.getSize()[0]).toBe(100);
        expect(testGameScreen.getSize()[1]).toBe(200);

        expect(testGameScreen.getCenterHorizontal()).toBe(50);
        expect(testGameScreen.getCenterVertical()).toBe(100);

        expect.assertions(11);
    });
});
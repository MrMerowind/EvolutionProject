import { GameScreen } from "../screen/GameScreen"

describe("Game screen", () => {
    it("Set and get screen size", () => {
        const testGameScreen = new GameScreen();

        expect(testGameScreen).toBeDefined();

        testGameScreen.SetSize(0, 0);
        expect(testGameScreen.GetWidth()).toBe(0);
        expect(testGameScreen.GetHeight()).toBe(0);
        expect(testGameScreen.GetSize()[0]).toBe(0);
        expect(testGameScreen.GetSize()[1]).toBe(0);

        testGameScreen.SetSize(100, 200);
        expect(testGameScreen.GetWidth()).toBe(100);
        expect(testGameScreen.GetHeight()).toBe(200);
        expect(testGameScreen.GetSize()[0]).toBe(100);
        expect(testGameScreen.GetSize()[1]).toBe(200);

        expect(testGameScreen.GetCenterHorizontal()).toBe(50);
        expect(testGameScreen.GetCenterVertical()).toBe(100);

        expect.assertions(11);
    });
});
import { GameCamera } from "../screen/GameCamera";

describe("Game camera", () => {
    it("Set and get camera offset", () => {
        const testGameCamera = new GameCamera();

        expect(testGameCamera).toBeDefined();
        expect(testGameCamera.getOffsetX()).toBe(0);
        expect(testGameCamera.getOffsetY()).toBe(0);
        expect(testGameCamera.getOffset()[0]).toBe(0);
        expect(testGameCamera.getOffset()[1]).toBe(0);

        testGameCamera.setOffset(100,200);

        expect(testGameCamera.getOffsetX()).toBe(100);
        expect(testGameCamera.getOffsetY()).toBe(200);
        expect(testGameCamera.getOffset()[0]).toBe(100);
        expect(testGameCamera.getOffset()[1]).toBe(200);

        testGameCamera.move(-50, -50);

        expect(testGameCamera.getOffsetX()).toBe(50);
        expect(testGameCamera.getOffsetY()).toBe(150);
        expect(testGameCamera.getOffset()[0]).toBe(50);
        expect(testGameCamera.getOffset()[1]).toBe(150);

        expect.assertions(13);
    });
});
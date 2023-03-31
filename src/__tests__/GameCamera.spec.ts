import { GameCamera } from "../screen/GameCamera";

describe("Game camera", () => {
    it("Set and get camera offset", () => {
        const testGameCamera = new GameCamera();

        expect(testGameCamera).toBeDefined();
        expect(testGameCamera.GetOffsetX()).toBe(0);
        expect(testGameCamera.GetOffsetY()).toBe(0);
        expect(testGameCamera.GetOffset()[0]).toBe(0);
        expect(testGameCamera.GetOffset()[1]).toBe(0);

        testGameCamera.SetOffset(100,200);

        expect(testGameCamera.GetOffsetX()).toBe(100);
        expect(testGameCamera.GetOffsetY()).toBe(200);
        expect(testGameCamera.GetOffset()[0]).toBe(100);
        expect(testGameCamera.GetOffset()[1]).toBe(200);

        testGameCamera.Move(-50, -50);

        expect(testGameCamera.GetOffsetX()).toBe(50);
        expect(testGameCamera.GetOffsetY()).toBe(150);
        expect(testGameCamera.GetOffset()[0]).toBe(50);
        expect(testGameCamera.GetOffset()[1]).toBe(150);

        expect.assertions(13);
    });
});
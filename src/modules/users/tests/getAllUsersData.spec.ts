import { getUsersData } from "../services";

describe("Crud User", () => {
    it("should be list all users", async () => {
        const result = await getUsersData();

        expect(result).toHaveProperty("data");
    });
});

import { getUserByIdData } from "../services";

describe("Crud Users", () => {
    const user = {
        id_users: "5a2dd14f-34dd-45fd-81a3-cd28286ee614",
    };
    it("should be get user by id", async () => {
        const { id_users } = user;

        const result = await getUserByIdData({ id_users });

        expect(result).toHaveProperty("data");
    });
});

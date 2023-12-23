import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

async function main() {
    const password_hash = await bcrypt.hash("12356678", 8);
    const admin = await prisma.users.upsert({
        where: { email_users: "admin@email.com" },
        update: {},
        create: {
            email_users: "admin@email.com",
            name_users: "Admin",
            id_users: uuidv4(),
            permission: "admin",
            password_hash: password_hash,
        },
    });
    console.log({ admin });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });


import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: { username, "Soham" },
        update: {},
        create: {
            username: "Soham",
            password: await hash("untrained0", 10),
        },
    });
    console.log(user);
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.emit(1);
    })
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.project.deleteMany({});
    await prisma.news.deleteMany({});
    await prisma.career.deleteMany({});
    console.log('Deleted all dummy items from remote database!');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());

const { PrismaClient } = require('@prisma/client');

// Global singleton for Prisma, just like your src/lib/db.js to prevent memory leaks during dev
const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

module.exports = prisma;

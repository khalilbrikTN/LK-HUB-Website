/**
 * LK-HUB Database Seed Script
 * Migrates existing JSON data into MySQL via Prisma.
 * Safe to run multiple times — skips existing records.
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');
    console.log('📡 Connecting to:', process.env.DATABASE_URL?.split('@')[1] || 'URL NOT FOUND');

    // ─── PROJECTS ───────────────────────────────────────────────────────────
    const projectsFile = path.join(__dirname, '../src/data/projects.json');
    if (fs.existsSync(projectsFile)) {
        const projects = JSON.parse(fs.readFileSync(projectsFile, 'utf-8'));
        let created = 0;
        for (const p of projects) {
            const existing = await prisma.project.findUnique({ where: { id: p.id } });
            if (!existing) {
                await prisma.project.create({
                    data: {
                        id: p.id,
                        division: p.division || 'General',
                        title: p.title || 'Untitled',
                        subtitle: p.subtitle || '',
                        description: p.description || '',
                        content: p.content || '',
                        icon: p.icon || '🚀',
                        tags: JSON.stringify(Array.isArray(p.tags) ? p.tags : []),
                        coverImage: p.coverImage || '',
                        images: JSON.stringify(Array.isArray(p.images) ? p.images : []),
                        createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
                    }
                });
                created++;
            }
        }
        console.log(`✅ Projects: ${created} seeded (${projects.length - created} already existed)`);
    }

    // ─── NEWS ────────────────────────────────────────────────────────────────
    const newsFile = path.join(__dirname, '../src/data/news.json');
    if (fs.existsSync(newsFile)) {
        const newsItems = JSON.parse(fs.readFileSync(newsFile, 'utf-8'));
        let created = 0;
        for (const n of newsItems) {
            const existing = await prisma.news.findUnique({ where: { id: n.id } });
            if (!existing) {
                await prisma.news.create({
                    data: {
                        id: n.id,
                        title: n.title,
                        date: n.date || new Date().toISOString().split('T')[0],
                        category: n.category || 'General',
                        status: n.status || 'Draft',
                        content: n.content || '',
                        image: n.image || '',
                    }
                });
                created++;
            }
        }
        console.log(`✅ News: ${created} seeded`);
    }

    // ─── CAREERS ─────────────────────────────────────────────────────────────
    const careersFile = path.join(__dirname, '../src/data/careers.json');
    if (fs.existsSync(careersFile)) {
        const careers = JSON.parse(fs.readFileSync(careersFile, 'utf-8'));
        let created = 0;
        for (const c of careers) {
            const existing = await prisma.career.findUnique({ where: { id: c.id } });
            if (!existing) {
                await prisma.career.create({
                    data: {
                        id: c.id,
                        title: c.title,
                        location: c.location || 'Cairo, Egypt',
                        type: c.type || 'Full-time',
                        department: c.department || 'General',
                        applicants: c.applicants || 0,
                        status: c.status || 'Active',
                        date_posted: c.date_posted || new Date().toISOString().split('T')[0],
                    }
                });
                created++;
            }
        }
        console.log(`✅ Careers: ${created} seeded`);
    }

    // ─── USERS ───────────────────────────────────────────────────────────────
    console.log('👥 Checking for Admin users...');
    const usersFile = path.join(__dirname, '../src/data/users.json');
    let usersToSeed = [];

    if (fs.existsSync(usersFile)) {
        usersToSeed = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
    } else {
        // Fallback user if JSON doesn't exist
        usersToSeed = [{
            username: "Super Admin",
            email: "admin@lk-hub.com",
            password: "admin123",
            role: "Super Admin"
        }];
    }

    let usersCreated = 0;
    for (const u of usersToSeed) {
        const existing = await prisma.user.findUnique({ where: { email: u.email } });
        if (!existing) {
            await prisma.user.create({
                data: {
                    username: u.username,
                    email: u.email,
                    password: u.password,
                    role: u.role || 'Admin',
                    active: true,
                }
            });
            usersCreated++;
        }
    }
    console.log(`✅ Users: ${usersCreated} seeded (${usersToSeed.length - usersCreated} already existed)`);

    console.log('🎉 Seed complete!');
}

main()
    .catch(e => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());

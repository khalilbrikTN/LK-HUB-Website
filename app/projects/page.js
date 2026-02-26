
import ProjectsClient from './ProjectsClient';
import prisma from '@/src/lib/db';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Projects | LK-HUB',
    description: 'Explore our latest projects, programs, and initiatives across all our divisions.',
};

export default async function ProjectsPage() {
    const dbProjectsRaw = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
        where: { title: { not: '' } } // Safety
    });

    const dbProjects = dbProjectsRaw.map(p => ({
        ...p,
        tags: JSON.parse(p.tags || '[]'),
        images: JSON.parse(p.images || '[]'),
        createdAt: p.createdAt ? p.createdAt.toISOString() : null,
        updatedAt: p.updatedAt ? p.updatedAt.toISOString() : null,
    }));

    return (
        <ProjectsClient dbProjects={dbProjects} />
    );
}

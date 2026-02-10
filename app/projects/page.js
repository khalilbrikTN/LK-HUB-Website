
import ProjectsClient from './ProjectsClient';
import { getProjects } from '@/app/actions/projects';

export const metadata = {
    title: 'Projects | LK-HUB',
    description: 'Explore our latest projects, programs, and initiatives across all our divisions.',
};

export default async function ProjectsPage() {
    const dbProjects = await getProjects();

    return (
        <ProjectsClient dbProjects={dbProjects} />
    );
}

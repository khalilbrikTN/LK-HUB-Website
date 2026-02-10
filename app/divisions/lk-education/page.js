import DivisionTemplate from '@/src/components/templates/DivisionTemplate';
import { divisionsData } from '@/src/data/divisionsContent';

export const metadata = {
    title: 'LK Education | Saleh Kamel Applied Technology School',
    description: 'Building a new generation of technical leaders in the textile industry through education, innovation, and global standards.',
};

export default function LKEducationPage() {
    const data = divisionsData['lk-education'];

    if (!data) {
        return <div>Division content coming soon...</div>;
    }

    return <DivisionTemplate data={data} />;
}

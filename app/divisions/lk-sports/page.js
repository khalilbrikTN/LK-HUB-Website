import DivisionTemplate from '@/src/components/templates/DivisionTemplate';
import { divisionsData } from '@/src/data/divisionsContent';

export default function LKSportsPage() {
    return <DivisionTemplate data={divisionsData['lk-sports']} />;
}

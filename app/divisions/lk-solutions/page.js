"use client";
import DivisionTemplate from '@/src/components/templates/DivisionTemplate';
import { divisionsData } from '@/src/data/divisionsContent';

export default function LKSolutionsPage() {
    return <DivisionTemplate data={divisionsData['lk-solutions']} />;
}

"use server";
import prisma from '@/src/lib/db';

export async function getCareers() {
    try {
        const careers = await prisma.career.findMany({ orderBy: { createdAt: 'desc' } });
        return careers;
    } catch (error) {
        console.error("Error reading careers:", error);
        return [];
    }
}

export async function getCareerById(id) {
    try {
        return await prisma.career.findUnique({ where: { id } });
    } catch (error) {
        console.error("Error reading career:", error);
        return null;
    }
}

export async function deleteCareer(id) {
    try {
        await prisma.career.delete({ where: { id } });
        return { success: true, message: "Career deleted successfully!" };
    } catch (error) {
        return { success: false, message: "Failed to delete career." };
    }
}

export async function createCareer(formData) {
    try {
        await prisma.career.create({
            data: {
                title: formData.get('title'),
                location: formData.get('location') || 'Cairo, Egypt',
                type: formData.get('type') || 'Full-time',
                department: formData.get('department') || 'General',
                applicants: 0,
                status: formData.get('status') || 'Active',
                date_posted: new Date().toISOString().split('T')[0],
            }
        });
        return { success: true };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

export async function updateCareer(id, formData) {
    try {
        await prisma.career.update({
            where: { id },
            data: {
                title: formData.get('title'),
                location: formData.get('location'),
                type: formData.get('type'),
                department: formData.get('department'),
                status: formData.get('status'),
            }
        });
        return { success: true };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

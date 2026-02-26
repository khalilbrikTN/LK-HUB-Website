"use server";
import prisma from '@/src/lib/db';

export async function loginLK(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const user = await prisma.user.findFirst({
            where: { email, password }
        });

        if (user) {
            return { success: true };
        }
    } catch (e) {
        console.error('Login error:', e);
        return { error: 'Database connection failed.' };
    }

    return { error: 'Invalid email or password.' };
}

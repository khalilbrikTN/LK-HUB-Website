"use server";
import { createSession, deleteSession } from '@/src/lib/auth';
import prisma from '@/src/lib/db';

export async function login(formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    let isSuccess = false;

    try {
        const user = await prisma.user.findFirst({
            where: { email, password, active: true } // TODO: hash passwords
        });

        if (user) {
            await createSession(user.id);
            isSuccess = true;
        }
    } catch (e) {
        console.error('Login error:', e);
        return { error: 'An error occurred during login. Please try again.' };
    }

    if (isSuccess) {
        return { success: true };
    }

    return { error: 'Invalid email or password' };
}

export async function logout() {
    await deleteSession();
    return { success: true };
}

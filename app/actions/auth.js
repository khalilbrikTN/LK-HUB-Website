"use server";
import { redirect } from 'next/navigation';
import { createSession, deleteSession } from '@/src/lib/auth';
// import prisma from '@/src/lib/prisma'; // We will set this up later
// import bcrypt from 'bcryptjs'; 

export async function login(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    // TODO: Temporary HARDCODED check until Database is live
    // This allows you to test the UI immediately without a running DB
    if (email === 'admin@lk-hub.com' && password === 'admin123') {
        await createSession('temp-admin-id');
        redirect('/admin');
    }

    /* 
    // REAL IMPLEMENTATION (Uncomment when DB is ready)
    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.passwordHash)) {
        return { error: 'Invalid credentials' };
    }
    await createSession(user.id);
    redirect('/admin');
    */

    return { error: 'Invalid email or password' };
}

export async function logout() {
    await deleteSession();
    redirect('/admin/login');
}

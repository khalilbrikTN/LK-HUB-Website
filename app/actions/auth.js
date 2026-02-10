"use server";
import { redirect } from 'next/navigation';
import { createSession, deleteSession } from '@/src/lib/auth'; // Existing session logic
import fs from 'fs';
import path from 'path';

// Path to users file
const USERS_FILE = path.join(process.cwd(), 'src', 'data', 'users.json');

// Helper to get users safely
async function getUsers() {
    try {
        if (!fs.existsSync(USERS_FILE)) return [];
        const fileContent = fs.readFileSync(USERS_FILE, 'utf-8');
        return JSON.parse(fileContent);
    } catch (e) {
        return [];
    }
}

export async function login(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const users = await getUsers();
    const user = users.find(u => u.email === email && u.password === password); // Add hashing here later!

    if (user) {
        await createSession(user.id);
        redirect('/admin');
    }

    return { error: 'Invalid email or password' };
}

export async function logout() {
    await deleteSession();
    redirect('/admin/login');
}

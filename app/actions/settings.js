"use server";
import prisma from '@/src/lib/db';

export async function getUsers() {
    try {
        const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
        return users.map(u => ({ ...u, password: undefined })); // never return passwords
    } catch (error) {
        console.error("Error reading users:", error);
        return [];
    }
}

export async function createUser(formData) {
    try {
        const email = formData.get('email');
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) return { success: false, message: "Email already registered." };

        await prisma.user.create({
            data: {
                username: formData.get('username'),
                email,
                password: formData.get('password'), // TODO: hash in production
                role: 'Admin',
                active: true,
            }
        });
        return { success: true, message: "User created successfully!" };
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, message: "Failed to create user." };
    }
}

export async function deleteUser(id) {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return { success: false, message: "User not found." };
        if (user.role === 'Super Admin') return { success: false, message: "Cannot delete Super Admin." };

        await prisma.user.delete({ where: { id } });
        return { success: true, message: "User deleted successfully!" };
    } catch (error) {
        return { success: false, message: "Failed to delete user." };
    }
}

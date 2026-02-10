"use server";
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const USERS_FILE = path.join(process.cwd(), 'src', 'data', 'users.json');

// --- READ USERS ---
export async function getUsers() {
    try {
        if (!fs.existsSync(USERS_FILE)) return [];
        const fileContent = fs.readFileSync(USERS_FILE, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading users:", error);
        return [];
    }
}

// --- CREATE USER ---
export async function createUser(formData) {
    try {
        const users = await getUsers();
        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');

        // Check if user already exists
        if (users.find(u => u.email === email)) {
            return { success: false, message: "Email already registered." };
        }

        const newUser = {
            id: randomUUID(),
            username: username,
            email: email,
            password: password, // Ideally hash this!
            role: "Admin", // For now everyone is Admin
            active: true,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');

        return { success: true, message: "User created successfully!" };
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, message: "Failed to create user." };
    }
}

// --- DELETE USER ---
export async function deleteUser(id) {
    try {
        const users = await getUsers();
        // Prevent deleting the last Super Admin or self if possible (complex logic skipped for simplicity)
        const userToDelete = users.find(u => u.id === id);

        if (!userToDelete) return { success: false, message: "User not found." };
        if (userToDelete.role === 'Super Admin') return { success: false, message: "Cannot delete Super Admin." };

        const newUsers = users.filter(u => u.id !== id);
        fs.writeFileSync(USERS_FILE, JSON.stringify(newUsers, null, 2), 'utf-8');

        return { success: true, message: "User deleted successfully!" };
    } catch (error) {
        return { success: false, message: "Failed to delete user." };
    }
}

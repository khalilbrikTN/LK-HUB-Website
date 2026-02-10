"use server";
import fs from 'fs';
import path from 'path';

const CAREERS_FILE = path.join(process.cwd(), 'src', 'data', 'careers.json');

export async function getCareers() {
    try {
        if (!fs.existsSync(CAREERS_FILE)) return [];
        const fileContent = fs.readFileSync(CAREERS_FILE, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading careers:", error);
        return [];
    }
}

export async function deleteCareer(id) {
    try {
        const careers = await getCareers();
        const filtered = careers.filter(c => c.id !== id);

        fs.writeFileSync(CAREERS_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
        return { success: true, message: "Career deleted successfully!" };
    } catch (error) {
        return { success: false, message: "Failed to delete career." };
    }
}

export async function createCareer(formData) {
    try {
        const careers = await getCareers();
        const newItem = {
            id: crypto.randomUUID(),
            title: formData.get('title'),
            location: formData.get('location'),
            type: formData.get('type'),
            applicants: 0,
            status: formData.get('status') || 'Active',
            date_posted: new Date().toISOString().split('T')[0]
        };
        careers.push(newItem);
        fs.writeFileSync(CAREERS_FILE, JSON.stringify(careers, null, 2), 'utf-8');
        return { success: true };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

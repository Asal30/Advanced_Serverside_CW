import { db } from '../config/database.js';
import bcrypt from 'bcrypt';

export default class User {
    static async create(email, password) {
        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const { lastID } = await db.run(
            `INSERT INTO users (email, password) VALUES (?, ?)`,
            [email, hashedPassword]
        );

        return { id: lastID };
    }

    static async findByEmail(email) {
        if (!email) throw new Error("Email is required");
        return await db.get(`SELECT * FROM users WHERE email = ?`, [email]);
    }
}
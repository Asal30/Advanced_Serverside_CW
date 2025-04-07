import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from 'crypto';
import { db } from '../config/database.js';

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.create(email, password);

        const apiKey = crypto.randomBytes(16).toString('hex');

        await db.run(
            'INSERT INTO api_keys (user_id, key) VALUES (?, ?)',
            [user.id, apiKey]
        );

        res.status(201).json({ 
            message: "User registered successfully",
            apiKey: apiKey
        });
        
    } catch (error) {
        res.status(400).json({ 
            error: error.message,
            message: "User already registered" 
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, { expiresIn: "1h" });
        res.status(200).json({ token });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
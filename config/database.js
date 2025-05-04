import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const db = await open({
  filename: './db.sqlite',
  driver: sqlite3.Database
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    user_type TEXT DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_user_type CHECK (user_type IN ('admin', 'user'))
  )
`);

await db.exec(`
  CREATE TABLE IF NOT EXISTS api_keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    key TEXT UNIQUE NOT NULL,
    name TEXT,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`);

await db.exec(`
  CREATE TABLE IF NOT EXISTS countries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    currency TEXT,
    capital TEXT,
    languages TEXT,
    flag TEXT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

await db.exec(`
  CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    country TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    date TEXT NOT NULL,
    image TEXT, -- main image URL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

await db.exec('CREATE INDEX IF NOT EXISTS idx_country_name ON countries (name)');

// await db.exec("DROP TABLE IF EXISTS api_keys");
// await db.exec("DROP TABLE IF EXISTS users");
// await db.exec("DROP TABLE IF EXISTS countries");
// await db.exec("DROP TABLE IF EXISTS blogs");

// await db.exec("DELETE FROM api_keys");
// await db.exec("DELETE FROM users");
// await db.exec("DELETE FROM countries");
// await db.exec("DELETE FROM blogs");

export default db;
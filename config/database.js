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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

await db.exec(`
  CREATE TABLE IF NOT EXISTS api_keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    key TEXT UNIQUE NOT NULL,
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
    languages TEXT, -- Store as JSON string
    flag TEXT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

await db.exec('CREATE INDEX IF NOT EXISTS idx_country_name ON countries (name)');

// await db.exec("DELETE FROM api_keys");
// await db.exec("DELETE FROM users");
// await db.exec("DELETE FROM countries");
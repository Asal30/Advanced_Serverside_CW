import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const db = await open({
  filename: './db.sqlite',
  driver: sqlite3.Database
});

await db.exec(
    `CREATE TABLE IF NOT EXISTS users
    (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL)`
);

await db.exec(
    `CREATE TABLE IF NOT EXISTS api_keys
    (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL,
    key TEXT UNIQUE NOT NULL, usage_count INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users (id))`
);
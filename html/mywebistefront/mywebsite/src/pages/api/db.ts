import sqlite3 from 'sqlite3'
import { open,Database  } from 'sqlite'

// Open SQLite database connection
export async function openDb(): Promise<Database> {
  return open({
    filename: './mydb.db',
    driver: sqlite3.Database
  })  
}
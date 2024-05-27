import fs from "fs"
import sqlite3 from "sqlite3"
import { open, Database } from "sqlite"
import type Stripe from "stripe"

interface Price {
  id: number
  priceId: string
  productId: string
}

// Database file path
const DATABASE_FILE = "./database.db"

// Initialize SQLite database
export async function initializeDatabase(): Promise<Database> {
  const dbExists: boolean = fs.existsSync(DATABASE_FILE)
  const db: Database = await open({
    filename: DATABASE_FILE,
    driver: sqlite3.Database,
  })

  // If the database file doesn't exist, create it and initialize tables
  if (!dbExists) {
    await initializeTables(db)
  }

  return db
}

// Initialize database tables
async function initializeTables(db: Database): Promise<void> {
  try {
    // Create users table if not exists
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullName TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phoneNumber TEXT NOT NULL,
        paymentLinkUrl TEXT NOT NULL,
        paymentLinkId TEXT NOT NULL,
        status TEXT NOT NULL
      );
    `)

    // Create prices table if not exists
    await db.exec(`
      CREATE TABLE IF NOT EXISTS prices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        priceId TEXT NOT NULL,
        productId TEXT NOT NULL
      );
    `)
  } catch (error) {
    console.error("Error initializing tables:", error)
    throw error
  }
}

// Check if a user exists by email
export async function checkUserExists(email: string) {
  const db: Database = await initializeDatabase()
  try {
    const result = await db.get("SELECT * FROM users WHERE email = ?", [email])
    return result || null
  } catch (error) {
    console.error("Error checking user existence:", error)
    throw error
  } finally {
    await db.close()
  }
}

// Create a new user
export async function createUser(user: any) {
  const db: Database = await initializeDatabase()
  try {
    await db.run(
      "INSERT INTO users (fullName, email, phoneNumber, paymentLinkUrl, paymentLinkId, status) VALUES (?, ?, ?, ?, ?, ?)",
      [
        user.fullName.toLowerCase(),
        user.email.toLowerCase(),
        user.phoneNumber,
        user.paymentLinkUrl,
        user.paymentLinkId,
        user.status,
      ]
    )
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  } finally {
    await db.close()
  }
}

// Get all users
export async function getAllUsers() {
  const db: Database = await initializeDatabase()
  try {
    const users = await db.all("SELECT * FROM users")
    return users
  } catch (error) {
    console.error("Error getting all users:", error)
    throw error
  } finally {
    await db.close()
  }
}

// Update user status
export async function updateUser(
  id: number,
  updatedUserData: Partial<any>
): Promise<void> {
  const db: Database = await initializeDatabase()
  try {
    const { status } = updatedUserData
    await db.run(`UPDATE users SET status = ? WHERE id = ?`, [status, id])
  } catch (error) {
    console.error("Error updating user:", error)
    throw error
  } finally {
    await db.close()
  }
}

// Check if any price exists
export async function checkAnyPriceExists(): Promise<Price | null> {
  const db: Database = await initializeDatabase()
  try {
    const result: Price | undefined = await db.get<Price>(
      "SELECT * FROM prices LIMIT 1"
    )
    return result || null
  } catch (error) {
    console.error("Error checking price existence:", error)
    throw error
  } finally {
    await db.close()
  }
}

// Create a new price
export async function createPrice(price: Stripe.Price): Promise<void> {
  const db: Database = await initializeDatabase()
  try {
    await db.run("INSERT INTO prices (priceId, productId) VALUES (?, ?)", [
      price.id,
      price.product,
    ])
  } catch (error) {
    console.error("Error creating price:", error)
    throw error
  } finally {
    await db.close()
  }
}

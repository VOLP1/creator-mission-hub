import 'dotenv/config'
import { Pool } from 'pg'

// Prefer a single connection string for deployments (Coolify, etc.)
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error(
    'Variável de ambiente DATABASE_URL não encontrada! Verifique seu .env ou o painel do Coolify.',
  )
}

const pool = new Pool({
  connectionString,
  // Production-friendly SSL defaults (commonly required by managed/VPS Postgres)
  ssl: {
    rejectUnauthorized: false,
  },
})

export default pool

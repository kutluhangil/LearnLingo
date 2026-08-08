import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { config } from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: join(__dirname, '..', '.env') })

const databaseUrl = process.env.VITE_FIREBASE_DATABASE_URL
if (!databaseUrl) {
  throw new Error('VITE_FIREBASE_DATABASE_URL is not set in .env')
}

const teachersPath = join(__dirname, '..', 'teachers.json')
const teachers = JSON.parse(readFileSync(teachersPath, 'utf-8'))

const payload = Object.fromEntries(teachers.map((teacher, index) => [`t${index + 1}`, teacher]))

const response = await fetch(`${databaseUrl}/teachers.json`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
})

if (!response.ok) {
  const text = await response.text()
  throw new Error(`Seed failed: ${response.status} ${text}`)
}

console.log(`Seeded ${teachers.length} teachers to ${databaseUrl}/teachers.json`)

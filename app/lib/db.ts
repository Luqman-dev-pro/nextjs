import postgres from 'postgres'

const db = postgres(process.env.POSTGRES_URL!, {
  ssl: 'require',
  idle_timeout: 60,
  max_lifetime: 60 * 60,
})

export default db
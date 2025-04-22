import 'server-only'
 
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import db from './db'
 
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.userId) {
    redirect('/login')
  }
 
  return { isAuth: true, userId: session.userId }
})

export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null
   
    try {
        const data = await db`
        SELECT id, name, email
        FROM users
        WHERE id = ${session.userId}
      `;
   
      const user = data[0];

      return user
    } catch (error) {
      console.log('Failed to fetch user')
      return null
    }
  })
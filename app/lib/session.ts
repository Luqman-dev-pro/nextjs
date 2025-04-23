import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/app/lib/definitions'
import { cookies } from 'next/headers'
import { TextEncoder } from 'util'

const secretKey = process.env.AUTH_SECRET
const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET || secretKey)

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session', error)
  }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const session = await encrypt({ userId, expiresAt });
    const cookieStore = await cookies();
   
    cookieStore.set('session', session, {
      httpOnly: true,
      secure: true,
      expires: new Date(expiresAt),
      sameSite: 'lax',
      path: '/',
    })
}

//Create session in DB
// export async function createSession(id: number) {
//     const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

//     // 1. Create a session in the database
//     const data = await db
//         .insert(sessions)
//         .values({
//         userId: id,
//         expiresAt,
//         })
//         // Return the session ID
//         .returning({ id: sessions.id })

//     const sessionId = data[0].id

//     // 2. Encrypt the session ID
//     const session = await encrypt({ sessionId, expiresAt })

//     // 3. Store the session in cookies for optimistic auth checks
//     const cookieStore = await cookies()
//     cookieStore.set('session', session, {
//         httpOnly: true,
//         secure: true,
//         expires: expiresAt,
//         sameSite: 'lax',
//         path: '/',
//     })
// }

export async function updateSession() {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)
 
  if (!session || !payload) {
    return null
  }
 
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
 
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}
  
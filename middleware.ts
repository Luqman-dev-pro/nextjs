import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

// middleware.ts
// import { NextRequest, NextResponse } from 'next/server'
// import jwt from 'jsonwebtoken'

// const JWT_SECRET = process.env.JWT_SECRET!

// const protectedRoutes = ['/profile', '/checkout']

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl

//   const isProtected = protectedRoutes.some(path =>
//     pathname.startsWith(path)
//   )

//   if (!isProtected) return NextResponse.next()

//   const token =
//     request.headers.get('authorization')?.split(' ')[1] ||
//     request.cookies.get('token')?.value

//   if (!token) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   try {
//     jwt.verify(token, JWT_SECRET)
//     return NextResponse.next()
//   } catch {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }
// }

// export const config = {
//   matcher: ['/profile/:path*', '/checkout'],
// }

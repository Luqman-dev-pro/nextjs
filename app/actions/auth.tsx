import { LoginFormSchema, FormState } from '@/app/lib/definitions'
import { createSession, deleteSession } from '../lib/session';
import bcrypt from 'bcryptjs';
import db from '@/app/lib/db';
import { redirect } from 'next/navigation';

export async function login(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });
    
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    //Insert the user into the database or call an Library API
    const { email, password } = validatedFields.data;
    const user = await db`
    SELECT * FROM users
    WHERE email='${email}' LIMIT 1
    `;

    // If any form fields are invalid, return early
    if (!user.length) {
        return {
            message: 'Invalid email or password.',
        }
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const passwordMatch = await bcrypt.compare(password, user[0].password);

    if (!passwordMatch) {
        return {
            message: 'Invalid email or password.',
        };
    }

    //Create user session
    await createSession(user[0].id);
    redirect('/dashboard');
}

export async function logout() {
    deleteSession()
    redirect('/login')
  }
import { LoginFormSchema, FormState } from '@/app/lib/definitions'
import { createSession, deleteSession } from '../lib/session';
import { redirect } from 'next/dist/server/api-utils';

 
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await db
    .insert(user)
    .values({
        email,
        password: hashedPassword,
    })
    .returning({ id: user.id });

    //Create user session
    await createSession(user.id)

    // If any form fields are invalid, return early
    if (!user) {
        return {
            message: 'An error occurred while creating your account.',
        }
    }
 
  // Call the provider or db to create a user...
  //Redirect user
  redirect('/dashboard');
}

export async function logout() {
    deleteSession()
    redirect('/login')
  }
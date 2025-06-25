'use server'

import {prisma} from '@/db/prisma';
import bcrypt from 'bcryptjs';
import { logEvent } from '@/utils/sentry';
import { signAuthToken, setAuthCookie, removeAuthCookie } from '@/lib/auth';

type ResponeseResult = {
  success: boolean;
  message: string;
}

// Register a new user
export async function registerUser(prevState: ResponeseResult, formData: FormData): Promise<ResponeseResult> {

  try {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

    if (!name || !email || !password) {
      logEvent('Validation Error: Missing register fields', 'auth', { name, email }, 'warning');
      return {success : false, message: 'All fields are required.'};
    }
  const existingUser = await prisma.user.findUnique({
    where: { email }});

  if (existingUser) {
    logEvent(`User Registration Error: User already exists ${email}`, 'auth', { email }, 'warning');
    return {success : false, message: 'User already exists.'};
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  // Sign the auth token
  const token = await signAuthToken({userId: user.id});
  await setAuthCookie(token);

  logEvent(`User Registration Success: User created ${email}`, 'auth', { userID: user.id, email }, 'info');

  return {success : true, message: 'User registered successfully.'};
  } catch (error) {
  logEvent(`User Registration Error: ${error}`, 'auth', {}, 'error', error);
  return {success : false, message: 'An error occurred during registration.'};
  }
}

// Log user out and remove auth cookie
export async function logoutUser(): Promise<{success: boolean; message: string}> {
  try {
    // Clear the auth cookie
    await removeAuthCookie();
    logEvent('User Logout Success', 'auth', {}, 'info');
    
    return {success : true, message: 'Logged out successfully.'};
  } catch (error) {
    logEvent(`User Logout Error: ${error}`, 'auth', {}, 'error', error);
    return {success : false, message: 'An error occurred during logout.'};
  }
}
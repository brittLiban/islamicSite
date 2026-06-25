'use server'

import { signIn, signOut } from '@/auth'
import { AuthError } from 'next-auth'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function login(_prev: string | null, formData: FormData): Promise<string | null> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  try {
    await signIn('credentials', { email, password, redirectTo: '/dashboard' })
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.'
        default:
          return 'Something went wrong. Please try again.'
      }
    }
    throw err
  }
  return null
}

export async function signup(_prev: string | null, formData: FormData): Promise<string | null> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!name || !email || !password) return 'All fields are required.'
  if (password.length < 8) return 'Password must be at least 8 characters.'

  const existing = await db.user.findUnique({ where: { email } })
  if (existing) return 'An account with this email already exists.'

  const hash = await bcrypt.hash(password, 12)
  await db.user.create({ data: { name, email, passwordHash: hash } })

  try {
    await signIn('credentials', { email, password, redirectTo: '/dashboard' })
  } catch (err) {
    if (err instanceof AuthError) return 'Account created. Please sign in.'
    throw err
  }
  return null
}

export async function logout() {
  await signOut({ redirectTo: '/' })
}

'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function updateProfile(_prev: string | null, formData: FormData): Promise<string | null> {
  const session = await auth()
  if (!session?.user?.id) return 'Not authenticated.'

  const name = formData.get('name') as string
  if (!name?.trim()) return 'Name is required.'

  await db.user.update({ where: { id: session.user.id }, data: { name: name.trim() } })
  revalidatePath('/dashboard/account')
  return null
}

export async function updatePassword(_prev: string | null, formData: FormData): Promise<string | null> {
  const session = await auth()
  if (!session?.user?.id) return 'Not authenticated.'

  const current = formData.get('currentPassword') as string
  const next = formData.get('newPassword') as string
  const confirm = formData.get('confirmPassword') as string

  if (!current || !next || !confirm) return 'All fields are required.'
  if (next !== confirm) return 'New passwords do not match.'
  if (next.length < 8) return 'New password must be at least 8 characters.'

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user?.passwordHash) return 'No password set on this account.'

  const ok = await bcrypt.compare(current, user.passwordHash)
  if (!ok) return 'Current password is incorrect.'

  const hash = await bcrypt.hash(next, 12)
  await db.user.update({ where: { id: session.user.id }, data: { passwordHash: hash } })
  return null
}

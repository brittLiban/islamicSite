'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { db } from '@/lib/db'

function userId(session: Awaited<ReturnType<typeof auth>>) {
  return (session?.user as { id?: string })?.id ?? ''
}

// Admin sends a message to a student
export async function sendMessageToStudent(
  _prev: string | null,
  formData: FormData
): Promise<string | null> {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if ((session.user as { role?: string }).role !== 'admin') redirect('/dashboard')

  const toUserId = formData.get('toUserId') as string
  const body = (formData.get('body') as string)?.trim()
  if (!body) return 'Message cannot be empty.'

  await db.message.create({
    data: { fromUserId: userId(session), toUserId, body },
  })

  revalidatePath(`/admin/students/${toUserId}`)
  return null
}

// Student replies to the Sheikh
export async function sendReplyToAdmin(
  _prev: string | null,
  formData: FormData
): Promise<string | null> {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const body = (formData.get('body') as string)?.trim()
  if (!body) return 'Message cannot be empty.'

  const admin = await db.user.findFirst({ where: { role: 'admin' } })
  if (!admin) return 'Unable to reach the instructor at this time.'

  await db.message.create({
    data: { fromUserId: userId(session), toUserId: admin.id, body },
  })

  revalidatePath('/dashboard/messages')
  return null
}

// Mark all messages from `otherUserId` to the current user as read
export async function markConversationRead(otherUserId: string) {
  const session = await auth()
  if (!session?.user) return
  await db.message.updateMany({
    where: { fromUserId: otherUserId, toUserId: userId(session), readAt: null },
    data: { readAt: new Date() },
  })
}

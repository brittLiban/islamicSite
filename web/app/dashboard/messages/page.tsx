import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { TopNav } from '@/components/layout/top-nav'
import { Footer } from '@/components/layout/footer'
import { markConversationRead } from '@/lib/message-actions'
import { ReplyForm } from './ReplyForm'

export default async function MessagesPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const userId = (session.user as { id?: string }).id!

  // Find the Sheikh (admin)
  const admin = await db.user.findFirst({ where: { role: 'admin' } })

  // Fetch conversation
  const messages = admin
    ? await db.message.findMany({
        where: {
          OR: [
            { fromUserId: userId, toUserId: admin.id },
            { fromUserId: admin.id, toUserId: userId },
          ],
        },
        orderBy: { createdAt: 'asc' },
      })
    : []

  // Mark admin's messages to this student as read
  if (admin) await markConversationRead(admin.id)

  return (
    <>
      <TopNav />

      <div style={{ background: 'var(--forest)', color: 'var(--paper)', padding: '48px 0 36px', borderBottom: '1px solid rgba(220,182,94,0.15)' }}>
        <div className="container">
          <Link href="/dashboard" style={{ fontSize: 13, color: 'rgba(245,237,216,0.6)', textDecoration: 'none' }}>
            ← Dashboard
          </Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 500, color: 'var(--paper)', margin: '16px 0 4px' }}>
            Messages
          </h1>
          <div style={{ fontSize: 14, color: 'rgba(245,237,216,0.6)' }}>
            Your conversation with Sheikh Abdulhakim
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 48, paddingBottom: 80, maxWidth: 720 }}>

        {/* Conversation */}
        <div style={{ marginBottom: 32 }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--fg-3)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)' }}>
              <div className="arabic" style={{ fontSize: 28, marginBottom: 12 }}>السلام عليكم</div>
              <p style={{ fontStyle: 'italic', margin: 0 }}>
                No messages yet. Send a message to Sheikh Abdulhakim below.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {messages.map((msg) => {
                const isFromStudent = msg.fromUserId === userId
                return (
                  <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isFromStudent ? 'flex-end' : 'flex-start' }}>
                    <div style={{ marginBottom: 6, fontSize: 11, color: 'var(--fg-muted)', fontVariant: 'small-caps', letterSpacing: '0.1em' }}>
                      {isFromStudent ? 'You' : 'Sheikh Abdulhakim'}
                    </div>
                    <div style={{
                      maxWidth: '80%',
                      background: isFromStudent ? 'var(--forest)' : 'var(--paper)',
                      color: isFromStudent ? 'var(--paper)' : 'var(--ink)',
                      border: isFromStudent ? 'none' : '1px solid var(--border)',
                      borderRadius: isFromStudent ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                      padding: '12px 16px',
                      fontSize: 15,
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}>
                      {msg.body}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 5 }}>
                      {new Date(msg.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}{' '}
                      · {new Date(msg.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Reply form */}
        <div style={{ background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 24 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>
            {messages.length === 0 ? 'Start the conversation' : 'Reply'}
          </div>
          <ReplyForm />
        </div>

        <div style={{ marginTop: 16, fontSize: 13, color: 'var(--fg-3)', fontStyle: 'italic', textAlign: 'center' }}>
          Messages are private between you and the Sheikh. Expect a reply within 24–48 hours.
        </div>
      </div>

      <Footer />
    </>
  )
}

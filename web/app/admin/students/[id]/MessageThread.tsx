'use client'

import { useActionState, useEffect, useRef } from 'react'
import { sendMessageToStudent } from '@/lib/message-actions'

type Msg = {
  id: string
  body: string
  createdAt: Date
  fromUserId: string
}

interface Props {
  messages: Msg[]
  adminId: string
  studentId: string
  studentName: string
}

export function MessageThread({ messages, adminId, studentId, studentName }: Props) {
  const [error, action, pending] = useActionState(sendMessageToStudent, null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div>
      {/* Conversation */}
      <div style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--paper)',
        padding: 20,
        marginBottom: 20,
        maxHeight: 480,
        overflowY: 'auto',
      }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--fg-3)', fontStyle: 'italic', padding: '32px 0' }}>
            No messages yet. Send the first one below.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {messages.map((msg) => {
              const isFromAdmin = msg.fromUserId === adminId
              return (
                <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isFromAdmin ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '75%',
                    background: isFromAdmin ? 'var(--forest)' : 'var(--paper-2)',
                    color: isFromAdmin ? 'var(--paper)' : 'var(--ink)',
                    borderRadius: isFromAdmin ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    padding: '10px 14px',
                    fontSize: 14,
                    lineHeight: 1.55,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}>
                    {msg.body}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 4 }}>
                    {isFromAdmin ? 'You' : studentName} ·{' '}
                    {new Date(msg.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}{' '}
                    {new Date(msg.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              )
            })}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Compose */}
      <form ref={formRef} action={async (fd) => {
        await action(fd)
        formRef.current?.reset()
      }}>
        <input type="hidden" name="toUserId" value={studentId} />
        {error && (
          <div style={{ color: '#b91c1c', fontSize: 13, marginBottom: 8 }}>{error}</div>
        )}
        <textarea
          name="body"
          required
          rows={3}
          placeholder={`Write a message to ${studentName}…`}
          className="field"
          style={{ resize: 'vertical', marginBottom: 10 }}
        />
        <button type="submit" disabled={pending} className="btn btn--primary btn--md">
          {pending ? 'Sending…' : 'Send message'}
        </button>
      </form>
    </div>
  )
}

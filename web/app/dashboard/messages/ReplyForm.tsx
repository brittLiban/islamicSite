'use client'

import { useActionState, useRef } from 'react'
import { sendReplyToAdmin } from '@/lib/message-actions'

export function ReplyForm() {
  const [error, action, pending] = useActionState(sendReplyToAdmin, null)
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form ref={formRef} action={async (fd) => {
      await action(fd)
      formRef.current?.reset()
    }}>
      {error && (
        <div style={{ color: '#b91c1c', fontSize: 13, marginBottom: 8 }}>{error}</div>
      )}
      <textarea
        name="body"
        required
        rows={3}
        placeholder="Write your message to Sheikh Abdulhakim…"
        className="field"
        style={{ resize: 'vertical', marginBottom: 10 }}
      />
      <button type="submit" disabled={pending} className="btn btn--primary btn--md">
        {pending ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

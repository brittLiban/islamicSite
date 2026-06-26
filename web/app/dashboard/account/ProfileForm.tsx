'use client'

import { useActionState } from 'react'
import { updateProfile } from '@/lib/account-actions'

export function ProfileForm({ name }: { name: string }) {
  const [error, action, pending] = useActionState(updateProfile, null)

  return (
    <form action={action}>
      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginBottom: 16, color: '#b91c1c', fontSize: 14 }}>
          {error}
        </div>
      )}
      <div className="field-row" style={{ marginBottom: 20 }}>
        <label className="label" htmlFor="name">Display name</label>
        <input id="name" name="name" defaultValue={name} required className="field" />
      </div>
      <button type="submit" disabled={pending} className="btn btn--primary btn--md">
        {pending ? 'Saving…' : 'Save changes'}
      </button>
    </form>
  )
}

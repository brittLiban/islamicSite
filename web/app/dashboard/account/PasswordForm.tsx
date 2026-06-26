'use client'

import { useActionState } from 'react'
import { updatePassword } from '@/lib/account-actions'

export function PasswordForm() {
  const [error, action, pending] = useActionState(updatePassword, null)

  return (
    <form action={action}>
      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginBottom: 16, color: '#b91c1c', fontSize: 14 }}>
          {error}
        </div>
      )}
      <div className="field-row" style={{ marginBottom: 16 }}>
        <label className="label" htmlFor="currentPassword">Current password</label>
        <input id="currentPassword" name="currentPassword" type="password" required className="field" />
      </div>
      <div className="field-row" style={{ marginBottom: 16 }}>
        <label className="label" htmlFor="newPassword">New password</label>
        <input id="newPassword" name="newPassword" type="password" required minLength={8} className="field" />
      </div>
      <div className="field-row" style={{ marginBottom: 20 }}>
        <label className="label" htmlFor="confirmPassword">Confirm new password</label>
        <input id="confirmPassword" name="confirmPassword" type="password" required minLength={8} className="field" />
      </div>
      <button type="submit" disabled={pending} className="btn btn--primary btn--md">
        {pending ? 'Updating…' : 'Update password'}
      </button>
    </form>
  )
}

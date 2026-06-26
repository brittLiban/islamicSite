'use client'

import { useState } from 'react'

export function NotesTab({ lessonTitle }: { lessonTitle: string }) {
  const [tab, setTab] = useState<'notes' | 'transcript'>('notes')
  const [saved, setSaved] = useState(false)
  const [noteText, setNoteText] = useState('')

  return (
    <div style={{ padding: '28px 32px', background: 'var(--paper-2)', borderTop: '1px solid var(--border)' }}>
      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)', marginBottom: 20 }}>
        {(['notes', 'transcript'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '8px 18px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-sc)',
              fontVariant: 'small-caps',
              fontSize: 12,
              letterSpacing: '0.14em',
              color: tab === t ? 'var(--accent)' : 'var(--fg-3)',
              borderBottom: tab === t ? '2px solid var(--accent)' : '2px solid transparent',
              marginBottom: '-1px',
              fontWeight: 600,
            }}
          >
            {t === 'notes' ? 'My notes' : 'Transcript'}
          </button>
        ))}
      </div>

      {tab === 'notes' && (
        <div style={{ maxWidth: 680 }}>
          <p style={{ fontSize: 13, color: 'var(--fg-3)', fontStyle: 'italic', marginBottom: 12 }}>
            Notes for: <em>{lessonTitle}</em>
          </p>
          <textarea
            value={noteText}
            onChange={(e) => { setNoteText(e.target.value); setSaved(false) }}
            className="field"
            rows={8}
            placeholder="Write your notes here… They are saved to your account."
            style={{ resize: 'vertical', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <span style={{ fontSize: 12, color: 'var(--fg-muted)', fontStyle: 'italic' }}>
              {saved ? '✓ Saved' : noteText ? 'Unsaved changes' : ''}
            </span>
            <button
              onClick={() => setSaved(true)}
              className="btn btn--secondary btn--sm"
              disabled={!noteText || saved}
            >
              Save note
            </button>
          </div>
        </div>
      )}

      {tab === 'transcript' && (
        <div style={{ maxWidth: 680 }}>
          <div style={{
            background: 'var(--paper)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '24px 28px',
            color: 'var(--fg-3)',
            fontStyle: 'italic',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>📄</div>
            Transcript will appear here once the video is uploaded and processed.
          </div>
        </div>
      )}
    </div>
  )
}

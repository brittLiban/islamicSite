'use client'

import { useState } from 'react'
import type { ModuleMeta } from '@/lib/data'

export function CurriculumAccordion({ modules }: { modules: ModuleMeta[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const freeLessons = modules.flatMap((m) => m.lessons).filter((l) => l.free)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--fg-3)', fontStyle: 'italic' }}>
          {modules.length} sections · {totalLessons} lessons · {freeLessons.length} free previews
        </p>
      </div>
      <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        {modules.map((mod, i) => (
          <div key={i} style={{ borderBottom: i < modules.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 18px',
                background: open === i ? 'var(--paper-2)' : 'var(--paper)',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                gap: 12,
                transition: 'background 150ms',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 17,
                fontWeight: 500,
                color: 'var(--ink)',
              }}>
                {mod.title}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                <span style={{ fontSize: 12, color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>
                  {mod.lessons.length} lessons
                </span>
                <span style={{
                  fontSize: 16,
                  color: 'var(--fg-3)',
                  transform: open === i ? 'rotate(180deg)' : 'none',
                  transition: 'transform 220ms',
                  display: 'inline-block',
                }}>
                  ▾
                </span>
              </div>
            </button>
            {open === i && (
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {mod.lessons.map((lesson, j) => (
                  <li
                    key={j}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '11px 18px 11px 32px',
                      borderTop: '1px solid var(--border-soft)',
                      background: 'var(--paper)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>▶</span>
                      <span style={{ fontSize: 14, color: 'var(--fg-2)' }}>{lesson.title}</span>
                      {lesson.free && (
                        <span className="badge badge--gold" style={{ fontSize: 10 }}>Preview</span>
                      )}
                    </div>
                    <span style={{
                      fontSize: 12,
                      color: 'var(--fg-3)',
                      fontFamily: 'var(--font-mono)',
                      flexShrink: 0,
                    }}>
                      {lesson.duration}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

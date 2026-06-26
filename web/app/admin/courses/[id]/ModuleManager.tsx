'use client'

import { useActionState, useState } from 'react'
import { createModule, deleteModule, createLesson, deleteLesson } from '@/lib/admin-actions'

type Lesson = { id: string; title: string; titleArabic: string | null; durationSeconds: number; isFreePreview: boolean; sortOrder: number }
type Module = { id: string; title: string; sortOrder: number; lessons: Lesson[] }

function LessonRow({ lesson, courseId, moduleId }: { lesson: Lesson; courseId: string; moduleId: string }) {
  const mins = Math.floor(lesson.durationSeconds / 60)
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 16px 10px 32px',
      borderTop: '1px solid var(--border-soft)',
      background: 'var(--paper)',
      fontSize: 14,
    }}>
      <span style={{ color: 'var(--fg-muted)', fontSize: 12 }}>▶</span>
      <span style={{ flex: 1, color: 'var(--fg-2)' }}>{lesson.title}</span>
      {lesson.titleArabic && (
        <span style={{ fontFamily: 'var(--font-arabic)', fontSize: 13, color: 'var(--gold-3)', direction: 'rtl' }}>
          {lesson.titleArabic}
        </span>
      )}
      {lesson.isFreePreview && <span className="badge badge--gold" style={{ fontSize: 10 }}>Preview</span>}
      {mins > 0 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>{mins} min</span>}
      <button
        type="button"
        onClick={() => deleteLesson(lesson.id, courseId)}
        style={{ background: 'none', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer', fontSize: 14, padding: '2px 4px' }}
        title="Delete lesson"
      >
        ×
      </button>
    </div>
  )
}

function AddLessonForm({ moduleId, courseId }: { moduleId: string; courseId: string }) {
  const [open, setOpen] = useState(false)
  const [error, action, pending] = useActionState(createLesson, null)

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          display: 'block',
          width: '100%',
          padding: '8px 32px',
          background: 'none',
          border: 'none',
          borderTop: '1px solid var(--border-soft)',
          color: 'var(--accent)',
          cursor: 'pointer',
          textAlign: 'left',
          fontSize: 13,
        }}
      >
        + Add lesson
      </button>
    )
  }

  return (
    <form action={action} style={{ borderTop: '1px solid var(--border-soft)', padding: '14px 16px 14px 32px', background: 'var(--paper-2)' }}>
      <input type="hidden" name="moduleId" value={moduleId} />
      <input type="hidden" name="courseId" value={courseId} />
      {error && <div style={{ color: '#b91c1c', fontSize: 12, marginBottom: 8 }}>{error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 80px auto auto', gap: 8, alignItems: 'center' }}>
        <input name="title" required placeholder="Lesson title" className="field" style={{ fontSize: 13, padding: '6px 10px' }} />
        <input name="titleArabic" placeholder="Arabic (optional)" className="field" dir="rtl" style={{ fontSize: 13, padding: '6px 10px' }} />
        <input name="durationSeconds" type="number" min="0" placeholder="Secs" className="field" style={{ fontSize: 13, padding: '6px 10px' }} />
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, whiteSpace: 'nowrap' }}>
          <input type="hidden" name="isFreePreview" value="false" />
          <input type="checkbox" onChange={(e) => {
            const hidden = e.target.previousElementSibling as HTMLInputElement
            hidden.value = e.target.checked ? 'true' : 'false'
          }} />
          Free
        </label>
        <div style={{ display: 'flex', gap: 6 }}>
          <button type="submit" disabled={pending} className="btn btn--primary btn--sm">{pending ? '…' : 'Add'}</button>
          <button type="button" onClick={() => setOpen(false)} className="btn btn--ghost btn--sm">Cancel</button>
        </div>
      </div>
    </form>
  )
}

function ModuleSection({ mod, courseId }: { mod: Module; courseId: string }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 12 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        background: 'var(--paper-2)',
        borderBottom: collapsed ? 'none' : '1px solid var(--border-soft)',
        cursor: 'pointer',
      }} onClick={() => setCollapsed((v) => !v)}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 500, flex: 1 }}>{mod.title}</span>
        <span style={{ fontSize: 12, color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>{mod.lessons.length} lessons</span>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); deleteModule(mod.id, courseId) }}
          style={{ background: 'none', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer', padding: '2px 6px', fontSize: 14 }}
          title="Delete module"
        >
          ×
        </button>
        <span style={{ color: 'var(--fg-3)', fontSize: 14, transform: collapsed ? 'rotate(-90deg)' : 'none', transition: 'transform 200ms' }}>▾</span>
      </div>

      {!collapsed && (
        <>
          {mod.lessons.map((l) => (
            <LessonRow key={l.id} lesson={l} courseId={courseId} moduleId={mod.id} />
          ))}
          <AddLessonForm moduleId={mod.id} courseId={courseId} />
        </>
      )}
    </div>
  )
}

export function ModuleManager({ courseId, modules }: { courseId: string; modules: Module[] }) {
  const [error, action, pending] = useActionState(createModule, null)

  return (
    <div>
      {modules.length === 0 && (
        <div style={{ textAlign: 'center', padding: '32px', color: 'var(--fg-3)', fontStyle: 'italic', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', marginBottom: 16 }}>
          No modules yet. Add the first one below.
        </div>
      )}

      {modules.map((mod) => (
        <ModuleSection key={mod.id} mod={mod} courseId={courseId} />
      ))}

      {/* Add module form */}
      <form action={action} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 16 }}>
        <input type="hidden" name="courseId" value={courseId} />
        <div style={{ flex: 1 }}>
          {error && <div style={{ color: '#b91c1c', fontSize: 12, marginBottom: 6 }}>{error}</div>}
          <input
            name="title"
            required
            placeholder="New module title…"
            className="field"
          />
        </div>
        <button type="submit" disabled={pending} className="btn btn--secondary btn--md">
          {pending ? '…' : '+ Add module'}
        </button>
      </form>
    </div>
  )
}

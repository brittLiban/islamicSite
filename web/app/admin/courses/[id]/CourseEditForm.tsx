'use client'

import { useActionState } from 'react'
import { updateCourse, deleteCourse, togglePublished } from '@/lib/admin-actions'

const PALETTES = ['forest', 'clay', 'umber', 'gold', 'slate']
const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'All levels']

type Course = {
  id: string
  title: string
  titleArabic: string
  titleSomali: string | null
  blurb: string
  lede: string
  level: string
  durationLabel: string
  coverPalette: string
  priceCents: number
  isPublished: boolean
}

export function CourseEditForm({ course }: { course: Course }) {
  const [error, action, pending] = useActionState(updateCourse, null)

  return (
    <form action={action}>
      <input type="hidden" name="id" value={course.id} />

      <div className="card" style={{ padding: 28, marginBottom: 16 }}>
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginBottom: 20, color: '#b91c1c', fontSize: 14 }}>
            {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div className="field-row">
            <label className="label">Title (English)</label>
            <input name="title" defaultValue={course.title} required className="field" />
          </div>
          <div className="field-row">
            <label className="label">Title (Arabic)</label>
            <input name="titleArabic" defaultValue={course.titleArabic} required className="field" dir="rtl" />
          </div>
          <div className="field-row">
            <label className="label">Title (Somali)</label>
            <input name="titleSomali" defaultValue={course.titleSomali ?? ''} className="field" />
          </div>
          <div className="field-row">
            <label className="label">Level</label>
            <select name="level" defaultValue={course.level} className="field">
              {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="field-row">
            <label className="label">Price (USD)</label>
            <input name="price" type="number" min="0" step="1" defaultValue={course.priceCents / 100} required className="field" />
          </div>
          <div className="field-row">
            <label className="label">Duration</label>
            <input name="durationLabel" defaultValue={course.durationLabel} className="field" />
          </div>
          <div className="field-row">
            <label className="label">Cover colour</label>
            <select name="coverPalette" defaultValue={course.coverPalette} className="field">
              {PALETTES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="field-row" style={{ justifyContent: 'flex-end', paddingTop: 20 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
              <input type="hidden" name="isPublished" value={course.isPublished ? 'true' : 'false'} />
              Published: <strong>{course.isPublished ? 'Yes' : 'No'}</strong>
            </label>
          </div>
        </div>

        <div className="field-row" style={{ marginBottom: 16 }}>
          <label className="label">Blurb</label>
          <textarea name="blurb" defaultValue={course.blurb} required className="field" rows={2} style={{ resize: 'vertical' }} />
        </div>
        <div className="field-row">
          <label className="label">Lede</label>
          <textarea name="lede" defaultValue={course.lede} className="field" rows={3} style={{ resize: 'vertical' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button type="submit" disabled={pending} className="btn btn--primary btn--md">
          {pending ? 'Saving…' : 'Save changes'}
        </button>
        <button
          type="button"
          onClick={() => togglePublished(course.id, course.isPublished)}
          className="btn btn--secondary btn--md"
        >
          {course.isPublished ? 'Unpublish' : 'Publish'}
        </button>
        <button
          type="button"
          className="btn btn--ghost btn--md"
          style={{ marginLeft: 'auto', color: '#b91c1c' }}
          onClick={() => {
            if (confirm(`Delete "${course.title}"? This cannot be undone.`)) {
              deleteCourse(course.id)
            }
          }}
        >
          Delete course
        </button>
      </div>
    </form>
  )
}

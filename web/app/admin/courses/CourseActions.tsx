'use client'

import Link from 'next/link'
import { deleteCourse, togglePublished } from '@/lib/admin-actions'

interface Props {
  courseId: string
  courseTitle: string
  slug: string
  isPublished: boolean
}

export function CourseActions({ courseId, courseTitle, slug, isPublished }: Props) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Link
        href={`/admin/courses/${courseId}`}
        style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}
      >
        Edit
      </Link>
      <Link
        href={`/courses/${slug}`}
        target="_blank"
        style={{ fontSize: 12, color: 'var(--fg-3)', textDecoration: 'none' }}
      >
        View
      </Link>
      <form action={togglePublished.bind(null, courseId, isPublished)} style={{ display: 'inline' }}>
        <button
          type="submit"
          style={{
            background: 'none',
            border: `1px solid ${isPublished ? 'var(--forest)' : 'var(--border)'}`,
            color: isPublished ? 'var(--forest)' : 'var(--fg-3)',
            borderRadius: 4,
            padding: '3px 10px',
            fontSize: 11,
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          {isPublished ? 'Published' : 'Draft'}
        </button>
      </form>
      <button
        type="button"
        onClick={() => {
          if (confirm(`Delete "${courseTitle}"?\n\nThis removes all modules, lessons, and enrollment records. This cannot be undone.`)) {
            deleteCourse(courseId)
          }
        }}
        style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: 12, cursor: 'pointer', padding: 0 }}
      >
        Delete
      </button>
    </div>
  )
}

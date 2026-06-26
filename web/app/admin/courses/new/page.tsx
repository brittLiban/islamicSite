'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createCourse } from '@/lib/admin-actions'

const PALETTES = ['forest', 'clay', 'umber', 'gold', 'slate']
const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'All levels']
const CATEGORIES = [
  { slug: 'quran',   label: "Qur'an" },
  { slug: 'arabic',  label: 'Arabic' },
  { slug: 'fiqh',    label: 'Fiqh' },
  { slug: 'aqeedah', label: 'Aqeedah' },
  { slug: 'seerah',  label: 'Seerah' },
  { slug: 'hadith',  label: 'Hadith' },
]

export default function NewCoursePage() {
  const [error, action, pending] = useActionState(createCourse, null)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper-2)' }}>
      {/* Header */}
      <div style={{ background: 'var(--forest-2)', color: 'var(--paper)', padding: '20px 48px', borderBottom: '1px solid rgba(220,182,94,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/admin" style={{ color: 'rgba(245,237,216,0.5)', textDecoration: 'none', fontSize: 14 }}>
            ← Admin
          </Link>
          <span style={{ color: 'rgba(245,237,216,0.3)' }}>›</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--paper)' }}>New course</span>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
        <form action={action}>
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: 24, color: '#b91c1c', fontSize: 14 }}>
              {error}
            </div>
          )}

          <div className="card" style={{ padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, margin: '0 0 24px' }}>Basic information</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div className="field-row">
                <label className="label" htmlFor="title">Title (English) *</label>
                <input id="title" name="title" required className="field" placeholder="Foundations of Tajwīd" />
              </div>
              <div className="field-row">
                <label className="label" htmlFor="titleArabic">Title (Arabic) *</label>
                <input id="titleArabic" name="titleArabic" required className="field" dir="rtl" placeholder="أساسيات التجويد" />
              </div>
              <div className="field-row">
                <label className="label" htmlFor="slug">URL slug *</label>
                <input id="slug" name="slug" required className="field" placeholder="tajweed-foundations" pattern="[a-z0-9-]+" />
              </div>
              <div className="field-row">
                <label className="label" htmlFor="titleSomali">Title (Somali)</label>
                <input id="titleSomali" name="titleSomali" className="field" placeholder="Optional" />
              </div>
            </div>

            <div className="field-row" style={{ marginTop: 20 }}>
              <label className="label" htmlFor="blurb">Blurb (short description) *</label>
              <textarea id="blurb" name="blurb" required className="field" rows={2} placeholder="One or two sentences." style={{ resize: 'vertical' }} />
            </div>
            <div className="field-row" style={{ marginTop: 16 }}>
              <label className="label" htmlFor="lede">Lede (course detail page intro)</label>
              <textarea id="lede" name="lede" className="field" rows={3} placeholder="Longer intro shown on the course detail page." style={{ resize: 'vertical' }} />
            </div>
          </div>

          <div className="card" style={{ padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, margin: '0 0 24px' }}>Pricing & metadata</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              <div className="field-row">
                <label className="label" htmlFor="price">Price (USD) *</label>
                <input id="price" name="price" type="number" min="0" step="1" required className="field" placeholder="89" />
              </div>
              <div className="field-row">
                <label className="label" htmlFor="level">Level</label>
                <select id="level" name="level" className="field">
                  {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div className="field-row">
                <label className="label" htmlFor="durationLabel">Duration</label>
                <input id="durationLabel" name="durationLabel" className="field" placeholder="12 weeks" />
              </div>
              <div className="field-row">
                <label className="label" htmlFor="categorySlug">Category</label>
                <select id="categorySlug" name="categorySlug" className="field">
                  {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
                </select>
              </div>
              <div className="field-row">
                <label className="label" htmlFor="coverPalette">Cover colour</label>
                <select id="coverPalette" name="coverPalette" className="field">
                  {PALETTES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button type="submit" disabled={pending} className="btn btn--primary btn--lg">
              {pending ? 'Creating…' : 'Create course'}
            </button>
            <Link href="/admin" className="btn btn--secondary btn--lg" style={{ textDecoration: 'none' }}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

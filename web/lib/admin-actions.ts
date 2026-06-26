'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { auth } from '@/auth'

async function requireAdmin() {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if ((session.user as { role?: string }).role !== 'admin') redirect('/dashboard')
  return session
}

// ── Courses ──────────────────────────────────────────────────

export async function createCourse(_prev: string | null, formData: FormData): Promise<string | null> {
  await requireAdmin()

  const title = formData.get('title') as string
  const titleArabic = formData.get('titleArabic') as string
  const titleSomali = formData.get('titleSomali') as string
  const slug = formData.get('slug') as string
  const blurb = formData.get('blurb') as string
  const lede = formData.get('lede') as string
  const level = formData.get('level') as string
  const durationLabel = formData.get('durationLabel') as string
  const coverPalette = formData.get('coverPalette') as string
  const priceCents = Math.round(parseFloat(formData.get('price') as string) * 100)
  const categorySlug = formData.get('categorySlug') as string

  if (!title || !slug || !titleArabic || !blurb || !priceCents) return 'All required fields must be filled.'

  const existing = await db.course.findUnique({ where: { slug } })
  if (existing) return 'A course with this slug already exists.'

  let category = await db.category.findUnique({ where: { slug: categorySlug } })
  if (!category) {
    category = await db.category.create({
      data: { slug: categorySlug, label: categorySlug, labelArabic: categorySlug },
    })
  }

  let instructor = await db.instructor.findFirst()
  if (!instructor) {
    const user = await db.user.findFirst({ where: { role: 'admin' } })
    if (!user) return 'No instructor found. Create an admin user first.'
    instructor = await db.instructor.create({
      data: { userId: user.id, title: 'Sheikh', bio: '' },
    })
  }

  await db.course.create({
    data: {
      title,
      titleArabic,
      titleSomali: titleSomali || null,
      slug,
      blurb,
      lede: lede || blurb,
      level: level || 'All levels',
      durationLabel: durationLabel || '—',
      coverPalette: coverPalette || 'forest',
      priceCents,
      categoryId: category.id,
      instructorId: instructor.id,
    },
  })

  revalidatePath('/admin')
  redirect('/admin')
}

export async function updateCourse(_prev: string | null, formData: FormData): Promise<string | null> {
  await requireAdmin()

  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const titleArabic = formData.get('titleArabic') as string
  const titleSomali = formData.get('titleSomali') as string
  const blurb = formData.get('blurb') as string
  const lede = formData.get('lede') as string
  const level = formData.get('level') as string
  const durationLabel = formData.get('durationLabel') as string
  const coverPalette = formData.get('coverPalette') as string
  const priceCents = Math.round(parseFloat(formData.get('price') as string) * 100)
  const isPublished = formData.get('isPublished') === 'true'

  await db.course.update({
    where: { id },
    data: { title, titleArabic, titleSomali: titleSomali || null, blurb, lede: lede || blurb, level, durationLabel, coverPalette, priceCents, isPublished },
  })

  revalidatePath('/admin')
  revalidatePath(`/admin/courses/${id}`)
  redirect('/admin')
}

export async function deleteCourse(id: string) {
  await requireAdmin()
  await db.course.delete({ where: { id } })
  revalidatePath('/admin')
  redirect('/admin')
}

export async function togglePublished(id: string, current: boolean) {
  await requireAdmin()
  await db.course.update({ where: { id }, data: { isPublished: !current } })
  revalidatePath('/admin')
}

// ── Modules ──────────────────────────────────────────────────

export async function createModule(_prev: string | null, formData: FormData): Promise<string | null> {
  await requireAdmin()
  const courseId = formData.get('courseId') as string
  const title = formData.get('title') as string
  if (!courseId || !title) return 'Course and title are required.'

  const count = await db.module.count({ where: { courseId } })
  await db.module.create({ data: { courseId, title, sortOrder: count } })
  revalidatePath(`/admin/courses/${courseId}`)
  return null
}

export async function deleteModule(id: string, courseId: string) {
  await requireAdmin()
  await db.module.delete({ where: { id } })
  revalidatePath(`/admin/courses/${courseId}`)
}

// ── Lessons ──────────────────────────────────────────────────

export async function createLesson(_prev: string | null, formData: FormData): Promise<string | null> {
  await requireAdmin()
  const moduleId = formData.get('moduleId') as string
  const courseId = formData.get('courseId') as string
  const title = formData.get('title') as string
  const titleArabic = formData.get('titleArabic') as string
  const durationSeconds = parseInt(formData.get('durationSeconds') as string) || 0
  const isFreePreview = formData.get('isFreePreview') === 'true'

  if (!moduleId || !title) return 'Module and title are required.'

  const count = await db.lesson.count({ where: { moduleId } })
  await db.lesson.create({ data: { moduleId, title, titleArabic: titleArabic || null, durationSeconds, isFreePreview, sortOrder: count } })
  revalidatePath(`/admin/courses/${courseId}`)
  return null
}

export async function deleteLesson(id: string, courseId: string) {
  await requireAdmin()
  await db.lesson.delete({ where: { id } })
  revalidatePath(`/admin/courses/${courseId}`)
}

// ── Coupons ──────────────────────────────────────────────────

export async function createCoupon(_prev: string | null, formData: FormData): Promise<string | null> {
  await requireAdmin()

  const code = (formData.get('code') as string).trim().toUpperCase()
  const percentOff = parseInt(formData.get('percentOff') as string)
  const maxUses = parseInt(formData.get('maxUses') as string)
  const expiresAt = formData.get('expiresAt') as string

  if (!code || !percentOff || !maxUses) return 'Code, discount %, and max uses are required.'
  if (percentOff < 1 || percentOff > 100) return 'Discount must be 1–100%.'
  if (!/^[A-Z0-9_-]+$/.test(code)) return 'Code may only contain letters, numbers, hyphens, and underscores.'

  const existing = await db.coupon.findUnique({ where: { code } })
  if (existing) return 'A coupon with this code already exists.'

  await db.coupon.create({ data: { code, percentOff, maxUses, expiresAt: expiresAt ? new Date(expiresAt) : null } })
  revalidatePath('/admin/coupons')
  return null
}

export async function deleteCoupon(code: string) {
  await requireAdmin()
  await db.coupon.delete({ where: { code } })
  revalidatePath('/admin/coupons')
}

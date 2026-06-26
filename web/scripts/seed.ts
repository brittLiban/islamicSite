import { PrismaClient } from '@prisma/client'
import { courses, categories, curricula, instructor as instructorData } from '../lib/data'

const db = new PrismaClient()

async function main() {
  const existing = await db.course.count()
  if (existing > 0) {
    console.log(`Already have ${existing} courses — skipping seed.`)
    return
  }

  console.log('Seeding categories…')
  for (const cat of categories.filter((c) => c.id !== 'all')) {
    await db.category.upsert({
      where: { slug: cat.id },
      update: {},
      create: {
        slug: cat.id,
        label: cat.label,
        labelArabic: (cat as { arabic?: string }).arabic ?? cat.label,
      },
    })
  }

  console.log('Finding or creating admin user…')
  let adminUser = await db.user.findFirst({ where: { role: 'admin' } })
  if (!adminUser) {
    adminUser = await db.user.create({
      data: {
        name: instructorData.name,
        email: 'sheikh@qarawiyyin.local',
        role: 'admin',
      },
    })
    console.log(`  Created admin user: ${adminUser.email}`)
  }

  let instructor = await db.instructor.findUnique({ where: { userId: adminUser.id } })
  if (!instructor) {
    instructor = await db.instructor.create({
      data: {
        userId: adminUser.id,
        title: instructorData.title,
        bio: instructorData.bio,
      },
    })
    console.log('  Created instructor record')
  }

  console.log('Seeding courses + curriculum…')
  for (const course of courses) {
    const category = await db.category.findUnique({ where: { slug: course.cat } })
    if (!category) {
      console.warn(`  Category "${course.cat}" not found — skipping ${course.slug}`)
      continue
    }

    const dbCourse = await db.course.create({
      data: {
        slug: course.slug,
        title: course.title,
        titleArabic: course.arabic,
        titleSomali: course.somali ?? null,
        blurb: course.blurb,
        lede: course.lede ?? course.blurb,
        priceCents: Math.round(course.price * 100),
        level: course.level,
        durationLabel: course.duration,
        coverPalette: course.coverColor,
        isPublished: true,
        studentsCountDenorm: course.students,
        ratingDenorm: course.rating,
        instructorId: instructor.id,
        categoryId: category.id,
      },
    })

    const moduleDefs = curricula[course.slug] ?? []
    for (let mi = 0; mi < moduleDefs.length; mi++) {
      const modDef = moduleDefs[mi]
      const dbModule = await db.module.create({
        data: { courseId: dbCourse.id, title: modDef.title, sortOrder: mi },
      })

      for (let li = 0; li < modDef.lessons.length; li++) {
        const lessonDef = modDef.lessons[li]
        const mins = parseInt(lessonDef.duration) || 0
        await db.lesson.create({
          data: {
            moduleId: dbModule.id,
            title: lessonDef.title,
            durationSeconds: mins * 60,
            isFreePreview: lessonDef.free ?? false,
            sortOrder: li,
          },
        })
      }
    }

    console.log(`  ✓ ${course.slug} (${moduleDefs.length} modules)`)
  }

  console.log('Done!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => db.$disconnect())

/**
 * Usage: npx tsx scripts/make-admin.ts <email>
 *
 * Promotes a registered user to the admin role and creates
 * an Instructor record if one does not exist.
 */
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  const email = process.argv[2]
  if (!email) {
    console.error('Usage: npx tsx scripts/make-admin.ts <email>')
    process.exit(1)
  }

  const user = await db.user.findUnique({ where: { email } })
  if (!user) {
    console.error(`No user found with email: ${email}`)
    process.exit(1)
  }

  await db.user.update({ where: { email }, data: { role: 'admin' } })
  console.log(`✓ ${email} promoted to admin`)

  const existing = await db.instructor.findUnique({ where: { userId: user.id } })
  if (!existing) {
    await db.instructor.create({
      data: {
        userId: user.id,
        title: 'Sheikh · Imam · Mufassir',
        bio: 'Sheikh Abdulhakim is a graduate of the Islamic University of Madinah and holds an ijazah in the recitation of Ḥafṣ ʿan ʿĀṣim.',
      },
    })
    console.log(`✓ Instructor record created`)
  } else {
    console.log(`  Instructor record already exists`)
  }

  await db.$disconnect()
}

main().catch((e) => { console.error(e); process.exit(1) })

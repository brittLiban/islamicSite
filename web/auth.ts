import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { authConfig } from './auth.config'

const providers = [
  Credentials({
    credentials: { email: {}, password: {} },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null
      const email = credentials.email as string
      const password = credentials.password as string
      const user = await db.user.findUnique({ where: { email } })
      if (!user?.passwordHash) return null
      const ok = await bcrypt.compare(password, user.passwordHash)
      if (!ok) return null
      return { id: user.id, email: user.email, name: user.name, role: user.role }
    },
  }),
]

// Add Google provider only when keys are configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }) as never
  )
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers,
  events: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.email) {
        const existing = await db.user.findUnique({ where: { email: user.email } })
        if (!existing) {
          await db.user.create({
            data: {
              email: user.email,
              name: user.name ?? user.email.split('@')[0],
              googleId: account.providerAccountId,
            },
          })
        } else if (!existing.googleId) {
          await db.user.update({
            where: { email: user.email },
            data: { googleId: account.providerAccountId },
          })
        }
      }
    },
  },
})

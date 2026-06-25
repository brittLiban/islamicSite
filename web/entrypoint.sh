#!/bin/sh
set -e

echo "→ Generating Prisma client..."
npx prisma generate

echo "→ Pushing schema to database..."
npx prisma db push --accept-data-loss

echo "→ Starting Next.js dev server..."
exec npm run dev

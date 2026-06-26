FROM node:22-slim

RUN apt-get update && apt-get install -y ffmpeg curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY worker/package*.json ./
RUN npm install

# Copy Prisma schema from web/ and generate client
COPY web/prisma ./prisma/
RUN npx prisma generate

COPY worker/tsconfig.json ./
COPY worker/src ./src/

CMD ["npx", "tsx", "src/index.ts"]

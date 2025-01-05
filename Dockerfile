FROM node:22-alpine as base
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

FROM base as builder
WORKDIR /app
COPY . .
RUN corepack enable pnpm && pnpm libgen
RUN corepack enable pnpm && pnpm build


FROM base as production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD pnpm start
FROM node:22

WORKDIR /app

COPY . .

RUN npm install -g pnpm

RUN pnpm install
RUN pnpm libgen
RUN pnpm build

CMD ["pnpm", "start"]
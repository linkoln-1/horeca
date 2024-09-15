FROM node:22

ARG BUILD

WORKDIR /app
COPY . .

RUN npm install -g pnpm
RUN pnpm install 

RUN pnpm libgen
RUN pnpm build

CMD ["pnpm", "start"]

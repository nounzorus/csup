# ---------- 1) BUILD VITE ----------
FROM node:20-alpine AS build
WORKDIR /app

# accélère les installs et réduit la taille de l'image
ENV CI=true
RUN corepack enable

# installe d'abord les deps pour profiter du cache Docker
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN \
  if [ -f pnpm-lock.yaml ]; then corepack pnpm i --frozen-lockfile; \
  elif [ -f yarn.lock ]; then corepack yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else npm i; fi

# copie le reste et build
COPY . .
# (optionnel) si tu utilises un base path Vite personnalisé : ARG BASE="/" et set vite.config
RUN \
  if [ -f pnpm-lock.yaml ]; then corepack pnpm build; \
  elif [ -f yarn.lock ]; then corepack yarn build; \
  else npm run build; fi


# ---------- 2) SERVE NGX ----------
FROM nginx:1.27-alpine

# conf nginx optimisée SPA + cache long sur assets
COPY /app/default.conf /etc/nginx/conf.d/default.conf

# copie le build
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80

# healthcheck très simple
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1
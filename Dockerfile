# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Installe uniquement les deps (cache efficace)
COPY package.json ./
# Choisis ton gestionnaire :

RUN npm install

# Copie le reste du code (y compris .env* pour Vite au build)
# ⚠️ Assure-toi que .dockerignore N'EXCLUT PAS .env si tu en as besoin au build.
COPY . .
ENV VITE_STRAPI_URL=${VITE_STRAPI_URL}

# Build Vite (les variables VITE_* du .env sont injectées ici)
RUN npm run build

# ---- Run stage ----
FROM nginx:1.27-alpine AS runner
# Supprime la conf par défaut et ajoute la nôtre (SPA + cache)
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copie les fichiers statiques
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 1338

# Healthcheck simple
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:1338/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
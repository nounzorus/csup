# Cowboy Supper - Docker Setup

Ce projet est configuré avec Docker et Docker Compose pour faciliter le développement avec Strapi backend et React frontend.

## Prérequis

- Docker
- Docker Compose

## Structure du projet

```
.
├── backend/              # Backend Strapi
│   ├── src/
│   │   ├── api/         # API endpoints
│   │   └── components/  # Composants réutilisables
│   ├── config/          # Configuration Strapi
│   └── Dockerfile
├── src/                 # Frontend React
├── docker-compose.yml   # Configuration Docker Compose
└── Dockerfile          # Dockerfile frontend
```

## Démarrage rapide

### 1. Configuration de l'environnement backend

Créez un fichier `.env` dans le dossier `backend/`:

```bash
cd backend
cp .env.example .env
```

Modifiez les valeurs dans `.env` avec des clés sécurisées. Vous pouvez générer des clés aléatoires avec:

```bash
# Générer une clé aléatoire
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 2. Configuration de l'environnement frontend

Créez un fichier `.env` à la racine du projet:

```bash
cp .env.example .env
```

Le fichier `.env` devrait contenir:

```
VITE_STRAPI_URL=http://localhost:1337
```

### 3. Lancer les services

Depuis la racine du projet, exécutez:

```bash
docker-compose up -d
```

Cela va:
- Construire les images Docker pour le frontend et le backend
- Démarrer le backend Strapi sur `http://localhost:1337`
- Démarrer le frontend React sur `http://localhost:5173`

### 4. Créer un compte admin Strapi

Lors du premier démarrage, accédez à:

```
http://localhost:1337/admin
```

Créez votre compte administrateur.

### 5. Configurer les permissions

Dans l'interface admin de Strapi:

1. Allez dans **Settings** > **Users & Permissions** > **Roles** > **Public**
2. Pour chaque content type (Artist, Event, Product, Release):
   - Cochez `find` et `findOne`
3. Cliquez sur **Save**

### 6. Ajouter du contenu

Utilisez l'interface admin de Strapi pour ajouter:
- Des artistes
- Des événements
- Des produits
- Des releases

## Commandes utiles

### Voir les logs

```bash
# Tous les services
docker-compose logs -f

# Backend seulement
docker-compose logs -f backend

# Frontend seulement
docker-compose logs -f frontend
```

### Arrêter les services

```bash
docker-compose down
```

### Arrêter et supprimer les volumes (⚠️ supprime les données)

```bash
docker-compose down -v
```

### Reconstruire les images

```bash
docker-compose up -d --build
```

### Accéder au shell d'un container

```bash
# Backend
docker-compose exec backend sh

# Frontend
docker-compose exec frontend sh
```

## URLs des services

- **Frontend**: http://localhost:5173
- **Backend Strapi**: http://localhost:1337
- **Admin Strapi**: http://localhost:1337/admin

## Développement

Les fichiers sont montés en volumes, donc:
- Les modifications du code frontend sont automatiquement rechargées (HMR)
- Les modifications du code backend Strapi déclenchent un redémarrage automatique

## Données persistantes

Les données de Strapi sont stockées dans un volume Docker nommé `strapi-data`, ce qui permet de conserver vos données même après l'arrêt des containers.

## Production

Pour un déploiement en production:

1. Modifiez les `Dockerfile` pour utiliser des builds optimisés
2. Utilisez une vraie base de données (PostgreSQL, MySQL) au lieu de SQLite
3. Configurez des variables d'environnement sécurisées
4. Utilisez un reverse proxy (Nginx, Traefik)
5. Mettez en place HTTPS avec des certificats SSL

## Dépannage

### Le backend ne démarre pas

Vérifiez que les variables d'environnement sont correctement définies dans `backend/.env`.

### Erreurs CORS

Vérifiez que le middleware CORS dans `backend/config/middlewares.js` inclut l'URL de votre frontend.

### Les images ne s'affichent pas

Assurez-vous que `VITE_STRAPI_URL` pointe vers la bonne URL du backend.

## Support

Pour plus d'informations:
- Documentation Strapi: https://docs.strapi.io
- Documentation Docker: https://docs.docker.com

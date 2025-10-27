# Strapi CMS Configuration - Cowboy Supper

Ce dossier contient les configurations de schémas Strapi pour le site Cowboy Supper.

## Structure des Content Types

### Collection Types

#### 1. Artist (`artist.json`)
Gestion des artistes du label
- **Champs principaux:**
  - `name`: Nom de l'artiste
  - `genre`: Genre musical
  - `image`: Photo de l'artiste
  - `bio`: Biographie
  - `social`: Liens réseaux sociaux (component)
  - `releases`: Relations vers les releases

#### 2. Event (`event.json`)
Gestion des événements et concerts
- **Champs principaux:**
  - `title`: Titre de l'événement
  - `date`: Date et heure
  - `venue`: Nom du lieu
  - `location`: Ville/Pays
  - `image`: Image de l'événement
  - `description`: Description
  - `price`: Prix (optionnel)
  - `ticketUrl`: Lien billetterie (optionnel)
  - `lineup`: Artistes participant (relation)

#### 3. Product (`product.json`)
Gestion des produits de la boutique
- **Champs principaux:**
  - `name`: Nom du produit
  - `category`: Type (vinyl, cd, merch)
  - `price`: Prix
  - `image`: Image du produit
  - `description`: Description
  - `artist`: Artiste associé (relation)
  - `stock`: Quantité en stock
  - `inStock`: Disponibilité

#### 4. Release (`release.json`)
Gestion des sorties musicales
- **Champs principaux:**
  - `title`: Titre de la release
  - `artist`: Artiste (relation)
  - `releaseDate`: Date de sortie
  - `coverArt`: Pochette
  - `type`: Type (album, ep, single)
  - `tracks`: Liste des morceaux (component)
  - `streamingLinks`: Liens streaming (component)

### Components

#### Social Links (`components/social-links.json`)
Liens vers les réseaux sociaux
- Instagram, Facebook, Twitter, Soundcloud, Spotify

#### Music Track (`components/music-track.json`)
Informations sur un morceau
- Titre, durée, numéro, fichier audio, lien preview

#### Streaming Links (`components/music-streaming-links.json`)
Liens vers les plateformes de streaming
- Spotify, Apple Music, Soundcloud, Bandcamp, YouTube

## Installation dans Strapi

### Méthode 1: Import manuel via l'interface admin

1. Créez un nouveau projet Strapi ou utilisez un existant
2. Accédez au Content-Type Builder
3. Pour chaque collection type:
   - Cliquez sur "Create new collection type"
   - Ajoutez les champs manuellement en suivant les fichiers JSON
4. Pour les components:
   - Créez d'abord les components requis
   - Puis ajoutez-les aux collection types

### Méthode 2: Import via le système de fichiers

1. Créez votre projet Strapi:
```bash
npx create-strapi-app@latest my-strapi-backend
cd my-strapi-backend
```

2. Copiez les fichiers de configuration:
```bash
# Pour les content types
cp strapi-config/artist.json src/api/artist/content-types/artist/schema.json
cp strapi-config/event.json src/api/event/content-types/event/schema.json
cp strapi-config/product.json src/api/product/content-types/product/schema.json
cp strapi-config/release.json src/api/release/content-types/release/schema.json

# Pour les components
cp strapi-config/components/social-links.json src/components/social/links.json
cp strapi-config/components/music-track.json src/components/music/track.json
cp strapi-config/components/music-streaming-links.json src/components/music/streaming-links.json
```

3. Créez les dossiers nécessaires si ils n'existent pas:
```bash
mkdir -p src/api/artist/content-types/artist
mkdir -p src/api/event/content-types/event
mkdir -p src/api/product/content-types/product
mkdir -p src/api/release/content-types/release
mkdir -p src/components/social
mkdir -p src/components/music
```

4. Redémarrez Strapi:
```bash
npm run develop
```

## Configuration API

Après avoir créé les content types:

1. **Permissions:**
   - Allez dans Settings > Users & Permissions plugin > Roles > Public
   - Activez les permissions `find` et `findOne` pour tous les content types
   - Si besoin d'authentification, configurez les rôles appropriés

2. **API Endpoints:**
   - Artists: `/api/artists`
   - Events: `/api/events`
   - Products: `/api/products`
   - Releases: `/api/releases`

3. **Populate relations:**
   Pour inclure les relations dans les requêtes API, utilisez le paramètre `populate`:
```
/api/artists?populate=*
/api/events?populate=lineup
/api/products?populate=artist
/api/releases?populate[0]=artist&populate[1]=tracks
```

## Notes importantes

- Assurez-vous d'activer le plugin Media Library pour gérer les images et fichiers audio
- Configurez les permissions API appropriées selon vos besoins de sécurité
- Les fichiers JSON fournis suivent la structure Strapi v4
- Pensez à configurer les slugs automatiques si nécessaire
- Ajoutez des validations personnalisées selon vos besoins

## Intégration avec le frontend

Pour connecter votre frontend React au backend Strapi:

```typescript
// Example fetch
const response = await fetch('http://localhost:1337/api/artists?populate=*');
const data = await response.json();
```

Ou utilisez le SDK Strapi officiel pour une meilleure expérience développeur.

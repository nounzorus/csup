const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'https://front.guilbaud-gym.fr/api';

export interface StrapiImage {
  id: number;
  url: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface Artist {
  id: number;
  name: string;
  genre: string;
  bio: string;
  image: StrapiImage;
  social?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    soundcloud?: string;
    spotify?: string;
  };
}

export interface Event {
  id: number;
  title: string;
  date: string;
  venue: string;
  location: string;
  description: string;
  image: StrapiImage;
  price?: number;
  ticketUrl?: string;
  lineup?: Artist[];
}

export interface Product {
  id: number;
  name: string;
  category: 'vinyl' | 'cd' | 'merch';
  price: number;
  image: StrapiImage;
  description?: string;
  stock: number;
  inStock: boolean;
  artist?: Artist;
}

export interface Track {
  title: string;
  duration: string;
  trackNumber: number;
  previewUrl?: string;
}

export interface Release {
  id: number;
  title: string;
  releaseDate: string;
  type: 'album' | 'ep' | 'single';
  coverArt: StrapiImage;
  artist?: Artist;
  tracks?: Track[];
  streamingLinks?: {
    spotify?: string;
    appleMusic?: string;
    soundcloud?: string;
    bandcamp?: string;
    youtube?: string;
  };
}

interface StrapiResponse<T> {
  data: Array<{
    id: number;
    attributes: T;
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

function getImageUrl(image: any): StrapiImage | null {
  if (!image?.data) return null;

  const imageData = image.data;
  return {
    id: imageData.id,
    url: `${STRAPI_URL}${imageData.attributes.url}`,
    formats: imageData.attributes.formats ? {
      thumbnail: imageData.attributes.formats.thumbnail ? { url: `${STRAPI_URL}${imageData.attributes.formats.thumbnail.url}` } : undefined,
      small: imageData.attributes.formats.small ? { url: `${STRAPI_URL}${imageData.attributes.formats.small.url}` } : undefined,
      medium: imageData.attributes.formats.medium ? { url: `${STRAPI_URL}${imageData.attributes.formats.medium.url}` } : undefined,
      large: imageData.attributes.formats.large ? { url: `${STRAPI_URL}${imageData.attributes.formats.large.url}` } : undefined,
    } : undefined,
  };
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${STRAPI_URL}/api${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
  }

  return response.json();
}

export async function getArtists(): Promise<Artist[]> {
  try {
    const response = await fetchAPI<StrapiResponse<any>>('/artists?populate=*');

    return response.data.map((item) => ({
      id: item.id,
      name: item.attributes.name,
      genre: item.attributes.genre,
      bio: item.attributes.bio,
      image: getImageUrl(item.attributes.image)!,
      social: item.attributes.social,
    }));
  } catch (error) {
    console.error('Error fetching artists:', error);
    return [];
  }
}

export async function getEvents(): Promise<Event[]> {
  try {
    const response = await fetchAPI<StrapiResponse<any>>('/events?populate=*');

    return response.data.map((item) => ({
      id: item.id,
      title: item.attributes.title,
      date: item.attributes.date,
      venue: item.attributes.venue,
      location: item.attributes.location,
      description: item.attributes.description,
      image: getImageUrl(item.attributes.image)!,
      price: item.attributes.price,
      ticketUrl: item.attributes.ticketUrl,
      lineup: item.attributes.lineup?.data?.map((artist: any) => ({
        id: artist.id,
        name: artist.attributes.name,
        genre: artist.attributes.genre,
        bio: artist.attributes.bio,
        image: getImageUrl(artist.attributes.image)!,
      })),
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetchAPI<StrapiResponse<any>>('/products?populate=*');

    return response.data.map((item) => ({
      id: item.id,
      name: item.attributes.name,
      category: item.attributes.category,
      price: item.attributes.price,
      image: getImageUrl(item.attributes.image)!,
      description: item.attributes.description,
      stock: item.attributes.stock,
      inStock: item.attributes.inStock,
      artist: item.attributes.artist?.data ? {
        id: item.attributes.artist.data.id,
        name: item.attributes.artist.data.attributes.name,
        genre: item.attributes.artist.data.attributes.genre,
        bio: item.attributes.artist.data.attributes.bio,
        image: getImageUrl(item.attributes.artist.data.attributes.image)!,
      } : undefined,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getReleases(): Promise<Release[]> {
  try {
    const response = await fetchAPI<StrapiResponse<any>>('/releases?populate=*');

    return response.data.map((item) => ({
      id: item.id,
      title: item.attributes.title,
      releaseDate: item.attributes.releaseDate,
      type: item.attributes.type,
      coverArt: getImageUrl(item.attributes.coverArt)!,
      artist: item.attributes.artist?.data ? {
        id: item.attributes.artist.data.id,
        name: item.attributes.artist.data.attributes.name,
        genre: item.attributes.artist.data.attributes.genre,
        bio: item.attributes.artist.data.attributes.bio,
        image: getImageUrl(item.attributes.artist.data.attributes.image)!,
      } : undefined,
      tracks: item.attributes.tracks,
      streamingLinks: item.attributes.streamingLinks,
    }));
  } catch (error) {
    console.error('Error fetching releases:', error);
    return [];
  }
}

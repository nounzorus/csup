import type { Schema, Attribute } from '@strapi/strapi';

export interface SocialLinks extends Schema.Component {
  collectionName: 'components_social_links';
  info: {
    displayName: 'Social Links';
    description: 'Social media links';
  };
  attributes: {
    instagram: Attribute.String;
    facebook: Attribute.String;
    twitter: Attribute.String;
    soundcloud: Attribute.String;
    spotify: Attribute.String;
  };
}

export interface MusicTrack extends Schema.Component {
  collectionName: 'components_music_tracks';
  info: {
    displayName: 'Track';
    description: 'Music track information';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    duration: Attribute.String & Attribute.Required;
    trackNumber: Attribute.Integer & Attribute.Required;
    audioFile: Attribute.Media<'audios'>;
    previewUrl: Attribute.String;
  };
}

export interface MusicStreamingLinks extends Schema.Component {
  collectionName: 'components_music_streaming_links';
  info: {
    displayName: 'Streaming Links';
    description: 'Music streaming platform links';
  };
  attributes: {
    spotify: Attribute.String;
    appleMusic: Attribute.String;
    soundcloud: Attribute.String;
    bandcamp: Attribute.String;
    youtube: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'social.links': SocialLinks;
      'music.track': MusicTrack;
      'music.streaming-links': MusicStreamingLinks;
    }
  }
}

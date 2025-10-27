import { useState } from 'react';
import ArtistModal from './ArtistModal';
import { Artist } from '../services/strapiApi';

interface ArtistsProps {
  artists: Artist[];
  isLoading: boolean;
}

const Artists = ({ artists: strapiArtists, isLoading }: ArtistsProps) => {
  const mockArtists: any[] = [
    {
      name: 'NOVA ECLIPSE',
      genre: 'Deep Techno',
      image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=1200',
      bio: 'Nova Eclipse has been shaping the deep techno landscape since 2018. Known for hypnotic basslines and atmospheric soundscapes, their productions have graced labels worldwide. With a unique ability to blend dark, driving rhythms with ethereal melodies, Nova Eclipse creates immersive sonic journeys that captivate dance floors and headphones alike.',
      location: 'Berlin, Germany',
      joinedYear: '2020',
      releases: ['Dark Frequencies EP', 'Midnight Pulse', 'Underground Sessions Vol. 2'],
      upcomingShows: ['Warehouse District, Berlin - Dec 15', 'Fabric, London - Jan 8'],
      social: {
        instagram: '#',
        soundcloud: '#',
      },
    },
    {
      name: 'CIPHER BEATS',
      genre: 'Minimal Tech',
      image: 'https://images.pexels.com/photos/2102568/pexels-photo-2102568.jpeg?auto=compress&cs=tinysrgb&w=1200',
      bio: 'Master of minimalism, Cipher Beats strips techno down to its essential elements. Each track is a carefully constructed puzzle of sound, where every element serves a purpose. Drawing inspiration from Detroit techno and Berlin minimalism, Cipher Beats creates hypnotic grooves that evolve slowly, revealing hidden layers with each listen.',
      location: 'Amsterdam, Netherlands',
      joinedYear: '2019',
      releases: ['Minimal Tech Sessions', 'Code Sequence', 'Binary Patterns'],
      upcomingShows: ['The Bunker, Amsterdam - Dec 22'],
      social: {
        instagram: '#',
        soundcloud: '#',
      },
    },
    {
      name: 'VOID ARCHITECT',
      genre: 'Dark Ambient',
      image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=1200',
      bio: 'Void Architect constructs sonic architectures from darkness and space. Specializing in dark ambient and experimental electronica, their work explores the intersection of noise, drone, and rhythm. Each release is a journey into the void, where sound becomes texture and atmosphere becomes emotion.',
      location: 'London, UK',
      joinedYear: '2021',
      releases: ['Echoes in the Void', 'Dark Architectures', 'Nocturnal Landscapes'],
      upcomingShows: ['Industrial Complex, London - Dec 31'],
      social: {
        instagram: '#',
      },
    },
    {
      name: 'PULSE THEORY',
      genre: 'Progressive House',
      image: 'https://images.pexels.com/photos/1749303/pexels-photo-1749303.jpeg?auto=compress&cs=tinysrgb&w=1200',
      bio: 'Pulse Theory brings emotional depth to progressive house music. With melodic journeys that build and evolve over extended sets, their sound combines classic progressive elements with modern production techniques. Known for euphoric breakdowns and driving basslines, Pulse Theory creates moments of pure musical transcendence.',
      location: 'Barcelona, Spain',
      joinedYear: '2020',
      releases: ['Progressive Waves', 'Melodic Journeys', 'Euphoria EP'],
      upcomingShows: [],
      social: {
        instagram: '#',
        soundcloud: '#',
      },
    },
    {
      name: 'SONIC DRIFT',
      genre: 'Techno',
      image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1200',
      bio: 'Raw, uncompromising techno from the heart of the underground. Sonic Drift delivers high-energy productions that merge industrial sounds with pounding rhythms. Their tracks are designed for peak-time moments, combining relentless drive with unexpected sonic twists that keep crowds moving until dawn.',
      location: 'Detroit, USA',
      joinedYear: '2018',
      releases: ['Industrial EP', 'Sonic Patterns', 'Underground Movement'],
      upcomingShows: ['Movement Festival, Detroit - May 2026'],
      social: {
        soundcloud: '#',
      },
    },
    {
      name: 'ECHO CHAMBER',
      genre: 'Dub Techno',
      image: 'https://images.pexels.com/photos/1144700/pexels-photo-1144700.jpeg?auto=compress&cs=tinysrgb&w=1200',
      bio: 'Echo Chamber explores the deep, dubby side of techno. Influenced by the legendary Basic Channel sound, their productions feature lush pads, deep sub-bass, and intricate delay patterns. Each track is a meditation on space and repetition, creating hypnotic soundscapes perfect for late-night sessions.',
      location: 'Berlin, Germany',
      joinedYear: '2019',
      releases: ['Deep Echoes', 'Dub Architectures', 'Reverb Sessions'],
      upcomingShows: [],
      social: {
        instagram: '#',
      },
    },
    {
      name: 'RHYTHM FLUX',
      genre: 'Electro',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1200',
      bio: 'Rhythm Flux brings classic electro vibes to the modern age. With crunchy drum machines, funky basslines, and futuristic synths, their sound pays homage to electro pioneers while pushing the genre forward. Perfect for both peak-time dance floor moments and late-night cruising.',
      location: 'Paris, France',
      joinedYear: '2021',
      releases: ['Electro Funk EP', 'Rhythm Patterns', 'Future Beats'],
      upcomingShows: ['Club Subterrain, Paris - Jan 12'],
      social: {
        instagram: '#',
        soundcloud: '#',
      },
    },
    {
      name: 'PHASE MATTER',
      genre: 'Industrial Techno',
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1200',
      bio: 'Phase Matter delivers brutal, uncompromising industrial techno. Their sound is characterized by distorted kicks, metallic percussion, and dystopian atmospheres. Drawing inspiration from the darker side of electronic music, Phase Matter creates intense sonic experiences that push boundaries and challenge conventions.',
      location: 'Brussels, Belgium',
      joinedYear: '2020',
      releases: ['Industrial Complex', 'Metal Rhythms', 'Dystopian Dreams'],
      upcomingShows: ['Concrete, Barcelona - Jan 20'],
      social: {
        instagram: '#',
      },
    },
    {
      name: 'GHOST SIGNAL',
      genre: 'Ambient',
      image: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1200',
      bio: 'Ghost Signal creates ethereal ambient soundscapes that transport listeners to otherworldly realms. Their music is characterized by lush textures, subtle melodies, and immersive atmospheres. Perfect for introspection and meditation, Ghost Signal\'s productions offer refuge from the intensity of club music.',
      location: 'Reykjavik, Iceland',
      joinedYear: '2021',
      releases: ['Ethereal Spaces', 'Ambient Transmissions', 'Ghost Frequencies'],
      upcomingShows: [],
      social: {
        instagram: '#',
      },
    },
    {
      name: 'NEON SYNTAX',
      genre: 'Synthwave',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1200',
      bio: 'Neon Syntax captures the retro-futuristic essence of the 80s while maintaining a modern edge. With lush synthesizers, driving basslines, and nostalgic melodies, their sound is perfect for late-night drives through neon-lit cities. Each track is a cinematic journey through time and space.',
      location: 'Los Angeles, USA',
      joinedYear: '2022',
      releases: ['Neon Dreams', 'Retro Future', 'Synthwave Memories'],
      upcomingShows: [],
      social: {
        instagram: '#',
        soundcloud: '#',
      },
    },
    {
      name: 'BINARY WAVES',
      genre: 'IDM',
      image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=1200',
      bio: 'Binary Waves explores the experimental side of electronic music. Their IDM productions feature complex rhythms, glitchy textures, and intricate sound design. Influenced by artists like Autechre and Aphex Twin, Binary Waves pushes the boundaries of what electronic music can be.',
      location: 'Tokyo, Japan',
      joinedYear: '2019',
      releases: ['Digital Patterns', 'Glitch Theory', 'Binary Sequences'],
      upcomingShows: [],
      social: {
        soundcloud: '#',
      },
    },
    {
      name: 'DARK MATTER',
      genre: 'Deep House',
      image: 'https://images.pexels.com/photos/1157255/pexels-photo-1157255.jpeg?auto=compress&cs=tinysrgb&w=1200',
      bio: 'Dark Matter brings soulful grooves to the deep house scene. With warm basslines, jazzy chords, and infectious rhythms, their sound is perfect for both intimate club settings and sunrise sets. Drawing from Chicago house roots while embracing modern production, Dark Matter creates timeless dance music.',
      location: 'Chicago, USA',
      joinedYear: '2018',
      releases: ['Deep Grooves', 'Soulful Sessions', 'House Music Heritage'],
      upcomingShows: [],
      social: {
        instagram: '#',
        soundcloud: '#',
      },
    },
  ];

  const artists = strapiArtists.length > 0 ? strapiArtists.map(artist => ({
    name: artist.name,
    genre: artist.genre,
    image: artist.image.url,
    bio: artist.bio,
    location: '',
    joinedYear: '',
    releases: [],
    upcomingShows: [],
    social: artist.social || {},
  })) : mockArtists;

  const [hoveredArtist, setHoveredArtist] = useState<number | null>(0);
  const [selectedArtist, setSelectedArtist] = useState<any | null>(null);

  return (
    <section id="artists" className="bg-black text-white glitch-container">
      <div className="min-h-screen relative">
        <div className="container mx-auto px-6 py-24 lg:py-32">
          {isLoading && (
            <div className="flex items-center justify-center py-32">
              <div className="text-2xl tracking-[0.3em] uppercase opacity-40 animate-pulse">
                Loading Artists...
              </div>
            </div>
          )}
          {!isLoading && (
            <>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5 relative h-[500px] lg:h-[700px] lg:sticky lg:top-32">
              <div className="relative w-full h-full overflow-hidden rounded-3xl">
                {artists.map((artist, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      hoveredArtist === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-white opacity-10" />
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2">
                <div className="text-xs tracking-[0.3em] uppercase opacity-40">
                  Our Roster
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.1em] uppercase">
                  Artists
                </h2>
              </div>

              <div className="space-y-1 pt-8">
                {artists.map((artist, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredArtist(index)}
                    onClick={() => setSelectedArtist(artist)}
                    className="group cursor-pointer py-6 relative"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.15em] uppercase transition-all duration-300 group-hover:translate-x-2">
                          {artist.name}
                        </h3>
                        <p className="text-sm tracking-[0.2em] uppercase opacity-40 mt-2 transition-all duration-300 group-hover:opacity-70">
                          {artist.genre}
                        </p>
                      </div>
                      <div className="text-6xl font-light opacity-0 transition-all duration-300 group-hover:opacity-20">
                        →
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10">
                      <div className="h-full bg-red-600 w-0 group-hover:w-full transition-all duration-500 ease-out" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </>
          )}
        </div>
      </div>

      <ArtistModal artist={selectedArtist} onClose={() => setSelectedArtist(null)} />
    </section>
  );
};

export default Artists;

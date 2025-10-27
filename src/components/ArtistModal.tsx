import { useEffect } from 'react';
import { X, Instagram, Music, Calendar } from 'lucide-react';

interface Artist {
  name: string;
  genre: string;
  image: string;
  bio: string;
  location: string;
  joinedYear: string;
  releases: string[];
  upcomingShows: string[];
  social: {
    instagram?: string;
    soundcloud?: string;
  };
}

interface ArtistModalProps {
  artist: Artist | null;
  onClose: () => void;
}

const ArtistModal = ({ artist, onClose }: ArtistModalProps) => {
  useEffect(() => {
    if (artist) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [artist]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!artist) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-black border border-white/10 rounded-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white hover:border-red-600 hover:bg-red-600 transition-all duration-300"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-5 relative h-[400px] lg:h-auto">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex gap-3">
                {artist.social.instagram && (
                  <a
                    href={artist.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-red-600 hover:bg-red-600 transition-all duration-300"
                  >
                    <Instagram size={18} />
                  </a>
                )}
                {artist.social.soundcloud && (
                  <a
                    href={artist.social.soundcloud}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-red-600 hover:bg-red-600 transition-all duration-300"
                  >
                    <Music size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 lg:p-12 text-white">
            <div className="space-y-8">
              <div>
                <div className="text-xs tracking-[0.3em] uppercase opacity-40 mb-3">
                  Artist Profile
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.15em] uppercase mb-4">
                  {artist.name}
                </h2>
                <div className="flex flex-wrap gap-4 text-sm tracking-[0.2em] uppercase opacity-60">
                  <span>{artist.genre}</span>
                  <span className="opacity-40">•</span>
                  <span>{artist.location}</span>
                  <span className="opacity-40">•</span>
                  <span>Since {artist.joinedYear}</span>
                </div>
              </div>

              <div className="h-[1px] bg-white/10" />

              <div className="space-y-4">
                <div className="text-xs tracking-[0.3em] uppercase opacity-40">
                  Biography
                </div>
                <p className="text-base leading-relaxed opacity-80 font-light">
                  {artist.bio}
                </p>
              </div>

              <div className="h-[1px] bg-white/10" />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Music size={16} className="opacity-40" />
                  <div className="text-xs tracking-[0.3em] uppercase opacity-40">
                    Recent Releases
                  </div>
                </div>
                <div className="space-y-2">
                  {artist.releases.map((release, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0"
                    >
                      <div className="w-1 h-1 bg-red-600 rounded-full" />
                      <span className="text-sm tracking-[0.1em] uppercase font-light">
                        {release}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {artist.upcomingShows.length > 0 && (
                <>
                  <div className="h-[1px] bg-white/10" />

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="opacity-40" />
                      <div className="text-xs tracking-[0.3em] uppercase opacity-40">
                        Upcoming Shows
                      </div>
                    </div>
                    <div className="space-y-2">
                      {artist.upcomingShows.map((show, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0"
                        >
                          <div className="w-1 h-1 bg-red-600 rounded-full" />
                          <span className="text-sm tracking-[0.1em] uppercase font-light">
                            {show}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistModal;

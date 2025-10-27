import { useEffect } from 'react';
import { X, MapPin, Clock, Calendar, Users, Music, Ticket } from 'lucide-react';

interface Event {
  date: string;
  time: string;
  venue: string;
  location: string;
  image: string;
  description: string;
  lineup: string[];
  capacity: string;
  ticketPrice: string;
  ticketLink: string;
  genre: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface EventModalProps {
  event: Event | null;
  onClose: () => void;
}

const EventModal = ({ event, onClose }: EventModalProps) => {
  useEffect(() => {
    if (event) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [event]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!event) return null;

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
              src={event.image}
              alt={event.venue}
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

            <div className="absolute top-8 left-8">
              <div className="bg-red-600 px-4 py-2 rounded-lg">
                <div className="text-white text-xs tracking-[0.2em] uppercase font-light">
                  {event.genre}
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white">
                  <Calendar size={16} className="opacity-60" />
                  <span className="text-sm tracking-[0.15em] uppercase font-light">
                    {event.date}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Clock size={16} className="opacity-60" />
                  <span className="text-sm tracking-[0.15em] uppercase font-light">
                    {event.time}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 lg:p-12 text-white">
            <div className="space-y-8">
              <div>
                <div className="text-xs tracking-[0.3em] uppercase opacity-40 mb-3">
                  Event Details
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.15em] uppercase mb-4">
                  {event.venue}
                </h2>
                <div className="flex items-center gap-2 text-base tracking-[0.15em] uppercase opacity-60">
                  <MapPin size={18} />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="h-[1px] bg-white/10" />

              <div className="space-y-4">
                <div className="text-xs tracking-[0.3em] uppercase opacity-40">
                  About This Event
                </div>
                <p className="text-base leading-relaxed opacity-80 font-light">
                  {event.description}
                </p>
              </div>

              <div className="h-[1px] bg-white/10" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="opacity-40" />
                    <div className="text-xs tracking-[0.3em] uppercase opacity-40">
                      Capacity
                    </div>
                  </div>
                  <div className="text-2xl font-light tracking-[0.1em] uppercase">
                    {event.capacity}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Ticket size={16} className="opacity-40" />
                    <div className="text-xs tracking-[0.3em] uppercase opacity-40">
                      Ticket Price
                    </div>
                  </div>
                  <div className="text-2xl font-light tracking-[0.1em] uppercase">
                    {event.ticketPrice}
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-white/10" />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Music size={16} className="opacity-40" />
                  <div className="text-xs tracking-[0.3em] uppercase opacity-40">
                    Lineup
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {event.lineup.map((artist, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 py-3 px-4 border border-white/10 rounded-lg hover:border-red-600/50 transition-colors duration-300"
                    >
                      <div className="w-2 h-2 bg-red-600 rounded-full" />
                      <span className="text-sm tracking-[0.15em] uppercase font-light">
                        {artist}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-[1px] bg-white/10" />

              {event.coordinates && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="opacity-40" />
                    <div className="text-xs tracking-[0.3em] uppercase opacity-40">
                      Location
                    </div>
                  </div>
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-red-600/20 blur-2xl" />
                        <MapPin size={48} className="text-red-600 relative animate-pulse" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                        <div className="text-white text-xs tracking-[0.15em] uppercase font-light">
                          {event.venue}
                        </div>
                        <div className="text-white/60 text-xs tracking-[0.1em] mt-1">
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="h-[1px] bg-white/10" />

              <div className="pt-4">
                <a
                  href={event.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full md:w-auto px-12 py-4 bg-red-600 text-white text-sm tracking-[0.3em] uppercase font-light rounded-full hover:bg-red-700 transition-all duration-300 text-center border border-red-600 hover:border-red-700"
                >
                  Get Tickets
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;

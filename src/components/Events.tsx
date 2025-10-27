import { useState } from 'react';
import EventModal from './EventModal';
import { Event } from '../services/strapiApi';

interface EventType {
  date: string;
  month: string;
  year: string;
  time: string;
  venue: string;
  city: string;
  location: string;
  artists: string[];
  status: string;
  image: string;
  description: string;
  capacity: string;
  ticketPrice: string;
  ticketLink: string;
  genre: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface EventsProps {
  events: Event[];
  isLoading: boolean;
}

const Events = ({ events: strapiEvents, isLoading }: EventsProps) => {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const mockEvents: EventType[] = [
    {
      date: '15',
      month: 'DEC',
      year: '2025',
      time: '23:00 - 06:00',
      venue: 'Warehouse District',
      city: 'Berlin',
      location: 'Berlin, Germany',
      artists: ['Nova Eclipse', 'Cipher Beats', 'Void Architect'],
      status: 'Tickets Available',
      image: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Experience an unforgettable night of deep techno and minimal beats in Berlin\'s legendary warehouse district. This intimate underground event brings together three pioneering artists for a journey through the darker realms of electronic music. Prepare for powerful sound system, immersive lighting, and an atmosphere that defines true underground culture.',
      capacity: '500',
      ticketPrice: '€25',
      ticketLink: '#',
      genre: 'Deep Techno',
      coordinates: { lat: 52.52, lng: 13.405 },
    },
    {
      date: '22',
      month: 'DEC',
      year: '2025',
      time: '22:00 - 05:00',
      venue: 'The Bunker',
      city: 'Amsterdam',
      location: 'Amsterdam, Netherlands',
      artists: ['Pulse Theory', 'Sonic Drift'],
      status: 'Sold Out',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'The Bunker presents an exclusive night of progressive house and techno. This sold-out event features two exceptional artists pushing the boundaries of electronic music. Known for its pristine sound system and intimate atmosphere, The Bunker has become Amsterdam\'s premier destination for quality underground music.',
      capacity: '350',
      ticketPrice: '€30',
      ticketLink: '#',
      genre: 'Progressive House',
      coordinates: { lat: 52.3676, lng: 4.9041 },
    },
    {
      date: '31',
      month: 'DEC',
      year: '2025',
      time: '23:00 - 08:00',
      venue: 'Industrial Complex',
      city: 'London',
      location: 'London, UK',
      artists: ['Echo Chamber', 'Rhythm Flux', 'Phase Matter'],
      status: 'Tickets Available',
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Ring in the new year with a massive celebration at London\'s Industrial Complex. This special extended event features three of the scene\'s most exciting acts delivering a sonic journey from dub techno through electro to industrial. Multiple rooms, world-class production, and an atmosphere that will make this New Year\'s Eve truly unforgettable.',
      capacity: '1200',
      ticketPrice: '£45',
      ticketLink: '#',
      genre: 'Industrial Techno',
      coordinates: { lat: 51.5074, lng: -0.1278 },
    },
    {
      date: '12',
      month: 'JAN',
      year: '2026',
      time: '23:30 - 06:00',
      venue: 'Club Subterrain',
      city: 'Paris',
      location: 'Paris, France',
      artists: ['Ghost Signal', 'Neon Syntax'],
      status: 'Presale',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Club Subterrain presents Sonic Explorations, an evening dedicated to the more experimental side of electronic music. Journey from ambient soundscapes to retro-futuristic synthwave in Paris\' most intimate underground venue. Limited capacity ensures an immersive experience for true music lovers.',
      capacity: '250',
      ticketPrice: '€20',
      ticketLink: '#',
      genre: 'Synthwave',
      coordinates: { lat: 48.8566, lng: 2.3522 },
    },
    {
      date: '20',
      month: 'JAN',
      year: '2026',
      time: '00:00 - 07:00',
      venue: 'Concrete',
      city: 'Barcelona',
      location: 'Barcelona, Spain',
      artists: ['Binary Waves', 'Dark Matter'],
      status: 'Tickets Available',
      image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Dark Frequencies returns to Barcelona\'s iconic Concrete venue. This carefully curated night brings together IDM pioneer Binary Waves and deep house maestro Dark Matter for a genre-spanning journey. Experience cutting-edge electronic music in one of Europe\'s most revered club spaces, complete with terrace views and sunrise sessions.',
      capacity: '800',
      ticketPrice: '€28',
      ticketLink: '#',
      genre: 'Deep House',
      coordinates: { lat: 41.3851, lng: 2.1734 },
    },
  ];

  const events = strapiEvents.length > 0 ? strapiEvents.map(event => {
    const eventDate = new Date(event.date);
    return {
      date: eventDate.getDate().toString(),
      month: eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
      year: eventDate.getFullYear().toString(),
      time: '',
      venue: event.venue,
      city: event.location,
      location: event.location,
      artists: event.lineup?.map(artist => artist.name) || [],
      status: 'Tickets Available',
      image: event.image.url,
      description: event.description,
      capacity: '',
      ticketPrice: event.price ? `€${event.price}` : '',
      ticketLink: event.ticketUrl || '#',
      genre: '',
      title: event.title,
    };
  }) : mockEvents.map(e => ({ ...e, title: `${e.venue} - ${e.city}` }));

  return (
    <section id="events" className="min-h-screen bg-white text-black relative">
      <div className="container mx-auto px-6 py-24 lg:py-32">
        <div className="space-y-2 mb-16">
          <div className="text-xs tracking-[0.3em] uppercase opacity-40">
            Upcoming
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.1em] uppercase">
            Events
          </h2>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-32">
            <div className="text-2xl tracking-[0.3em] uppercase opacity-40 animate-pulse">
              Loading Events...
            </div>
          </div>
        )}

        {!isLoading && (
          <div className="space-y-8">
          {events.map((event, index) => (
            <div
              key={index}
              onClick={() => event.status !== 'Sold Out' && setSelectedEvent(event)}
              className="group relative cursor-pointer"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-8">
                <div className="md:col-span-2">
                  <div className="flex flex-col items-start">
                    <div className="text-6xl md:text-7xl font-light tracking-tight leading-none">
                      {event.date}
                    </div>
                    <div className="text-sm tracking-[0.3em] uppercase opacity-40 mt-1">
                      {event.month}
                    </div>
                    <div className="text-xs tracking-[0.2em] uppercase opacity-20 mt-1">
                      {event.year}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.15em] uppercase transition-all duration-300 group-hover:translate-x-2">
                    {event.title}
                  </h3>

                  <div className="space-y-2 opacity-60">
                    <div className="flex items-center gap-2 text-sm tracking-[0.2em] uppercase">
                      <span>{event.venue}</span>
                      <span className="opacity-40">•</span>
                      <span>{event.city}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {event.artists.map((artist, idx) => (
                        <span
                          key={idx}
                          className="text-xs tracking-[0.2em] uppercase px-3 py-1 border border-black/20 rounded-full transition-colors duration-300 group-hover:border-black/40"
                        >
                          {artist}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3 flex items-start md:items-center md:justify-end">
                  <div className="flex flex-col items-start md:items-end gap-4">
                    <div
                      className={`text-xs tracking-[0.3em] uppercase px-4 py-2 rounded-full ${
                        event.status === 'Sold Out'
                          ? 'bg-black text-white'
                          : event.status === 'Presale'
                          ? 'border border-black/20 text-black/60'
                          : 'border border-black text-black'
                      }`}
                    >
                      {event.status}
                    </div>

                    {event.status !== 'Sold Out' && (
                      <div className="text-sm tracking-[0.2em] uppercase font-light opacity-0 transition-all duration-300 group-hover:opacity-100">
                        View Details →
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/10">
                <div className="h-full bg-red-600 w-0 group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </div>
          ))}

          <div className="mt-16 text-center">
            <div className="inline-block group cursor-pointer">
              <div className="text-sm tracking-[0.2em] uppercase font-light pb-1 relative">
                View All Events
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/20">
                  <div className="h-full bg-red-600 w-0 group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>

      <EventModal
        event={selectedEvent ? {
          date: `${selectedEvent.month} ${selectedEvent.date}, ${selectedEvent.year}`,
          time: selectedEvent.time,
          venue: selectedEvent.venue,
          location: selectedEvent.location,
          image: selectedEvent.image,
          description: selectedEvent.description,
          lineup: selectedEvent.artists,
          capacity: selectedEvent.capacity,
          ticketPrice: selectedEvent.ticketPrice,
          ticketLink: selectedEvent.ticketLink,
          genre: selectedEvent.genre,
          coordinates: selectedEvent.coordinates,
        } : null}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
};

export default Events;

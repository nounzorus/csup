import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Artists from './components/Artists';
import Events from './components/Events';
import Shop from './components/Shop';
import CartModal from './components/CartModal';
import Contact from './components/Contact';
import AudioPlayer from './components/AudioPlayer';
import { getArtists, getEvents, getProducts, Artist, Event, Product } from './services/strapiApi';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    setIsLoaded(true);

    const loadData = async () => {
      try {
        const [artistsData, eventsData, productsData] = await Promise.all([
          getArtists(),
          getEvents(),
          getProducts(),
        ]);
        setArtists(artistsData);
        setEvents(eventsData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    loadData();

    const handleScroll = () => {
      const sections = ['hero', 'about', 'artists', 'events', 'shop', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkSection = currentSection === 'hero' || currentSection === 'artists' || currentSection === 'shop';

  return (
    <div className="bg-black text-white pb-24">
      <Header isLoaded={isLoaded} isDarkSection={isDarkSection} onCartClick={() => setIsCartOpen(true)} />
      <Hero isLoaded={isLoaded} />
      <About />
      <Artists artists={artists} isLoading={isLoadingData} />
      <Events events={events} isLoading={isLoadingData} />
      <Shop products={products} isLoading={isLoadingData} />
      <Contact />
      <AudioPlayer />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default App;

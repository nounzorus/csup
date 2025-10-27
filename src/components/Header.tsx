import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  isLoaded: boolean;
  isDarkSection: boolean;
  onCartClick: () => void;
}

const Header = ({ isLoaded, isDarkSection, onCartClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);
  const { totalItems } = useCart();

  const menuItems = ['About Us', 'Artists', 'Events', 'Shop', 'Contact'];

  useEffect(() => {
    if (totalItems > 0) {
      setCartAnimation(true);
      const timer = setTimeout(() => setCartAnimation(false), 600);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isDarkSection ? 'bg-black/80' : 'bg-white/80'
    } backdrop-blur-md`}>
      <div className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div
          className={`logo transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className={`font-light text-2xl tracking-[0.3em] uppercase transition-colors duration-500 ${
            isDarkSection ? 'text-white' : 'text-black'
          }`}>
            Cowboy Supper
          </div>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          } ${
            isDarkSection ? 'text-white' : 'text-black'
          }`}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav
          className={`hidden md:flex items-center gap-12 transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          {menuItems.map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className={`group relative font-light text-sm tracking-[0.2em] uppercase transition-all duration-300 ${
                isDarkSection ? 'text-white' : 'text-black'
              }`}
              style={{
                transitionDelay: isLoaded ? `${700 + index * 100}ms` : '0ms',
              }}
            >
              <span className="relative inline-block transition-transform duration-300 group-hover:-translate-y-1">{item}</span>
              <span className={`absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full`} />
            </a>
          ))}

          <button
            onClick={onCartClick}
            className={`relative group font-light text-sm tracking-[0.2em] uppercase transition-all duration-300 ${
              isDarkSection ? 'text-white' : 'text-black'
            }`}
            style={{
              transitionDelay: isLoaded ? `${700 + menuItems.length * 100}ms` : '0ms',
            }}
            aria-label="Shopping cart"
          >
            <span className="relative inline-block transition-transform duration-300 group-hover:-translate-y-1 flex items-center gap-2">
              <ShoppingCart size={20} className={`transition-transform duration-300 ${
                cartAnimation ? 'scale-125' : 'scale-100'
              }`} />
              Cart
              {totalItems > 0 && (
                <span
                  className={`w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-light transition-all duration-300 ${
                    cartAnimation ? 'scale-125 rotate-12' : 'scale-100 rotate-0'
                  }`}
                >
                  {totalItems}
                </span>
              )}
            </span>
            <span className={`absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full`} />
          </button>
        </nav>
      </div>

      <div
        className={`md:hidden fixed inset-0 h-screen bg-black z-[100] transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-between h-full py-24 px-6">
          <div className="w-full max-w-md mx-auto relative">
            <div
              className={`text-white font-light text-3xl tracking-[0.3em] uppercase text-center transition-all duration-700 delay-100 ${
                isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
            >
              Cowboy Supper
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className={`absolute right-0 top-1/2 -translate-y-1/2 text-white transition-all duration-700 delay-100 hover:text-red-600 ${
                isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
              aria-label="Close menu"
            >
              <X size={32} />
            </button>
          </div>

          <div className="flex flex-col items-center gap-8">
            {menuItems.map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setIsMenuOpen(false)}
                className={`text-white font-light text-2xl tracking-[0.2em] uppercase hover:text-red-600 transition-all duration-700 ${
                  isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${200 + index * 100}ms` : '0ms',
                }}
              >
                {item}
              </a>
            ))}

            <button
              onClick={() => {
                setIsMenuOpen(false);
                onCartClick();
              }}
              className={`text-white font-light text-2xl tracking-[0.2em] uppercase hover:text-red-600 transition-all duration-700 flex items-center gap-3 ${
                isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isMenuOpen ? `${200 + menuItems.length * 100}ms` : '0ms',
              }}
            >
              <ShoppingCart size={24} />
              Cart
              {totalItems > 0 && (
                <span className="w-6 h-6 bg-red-600 text-white text-sm rounded-full flex items-center justify-center font-light">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          <div
            className={`text-white/40 text-xs tracking-[0.3em] uppercase transition-all duration-700 delay-700 ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            By the people, for the people
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

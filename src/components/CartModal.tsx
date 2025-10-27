import { useEffect } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  if (items.length === 0) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-md bg-white text-black rounded-2xl p-8 md:p-12 animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center rounded-full border border-black/20 text-black hover:border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="text-center space-y-4 md:space-y-6">
            <ShoppingBag size={60} className="mx-auto opacity-20 md:w-20 md:h-20" />
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.15em] uppercase">
              Your Cart is Empty
            </h2>
            <p className="text-sm tracking-[0.2em] uppercase opacity-60">
              Add some products to get started
            </p>
            <button
              onClick={onClose}
              className="inline-block px-12 py-4 bg-black text-white text-sm tracking-[0.3em] uppercase font-light rounded-full hover:bg-black/80 transition-all duration-300 border border-black"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white text-black rounded-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 border-b border-black/10 px-4 md:px-8 py-4 md:py-6 flex justify-between items-center">
          <div>
            <div className="text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-40">
              Shopping
            </div>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-light tracking-[0.15em] uppercase">
              Cart ({items.length})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-black/20 text-black hover:border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 p-4 md:p-8">
          <div className="lg:col-span-8 space-y-4 md:space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative border border-black/10 rounded-2xl p-4 md:p-6 hover:border-black/30 transition-all duration-300"
              >
                <div className="grid grid-cols-12 gap-3 md:gap-6">
                  <div className="col-span-4 md:col-span-3">
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  </div>

                  <div className="col-span-8 md:col-span-9 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-40 mb-1 md:mb-2">
                            {item.category}
                          </div>
                          <h3 className="text-sm md:text-xl lg:text-2xl font-light tracking-[0.15em] uppercase mb-2 md:mb-3 truncate">
                            {item.name}
                          </h3>
                          <div className="flex flex-wrap gap-2 md:gap-3 text-[10px] md:text-xs tracking-[0.2em] uppercase opacity-60">
                            {item.size && (
                              <span className="px-2 md:px-3 py-1 border border-black/20 rounded-full">
                                Size: {item.size}
                              </span>
                            )}
                            {item.color && (
                              <span className="px-2 md:px-3 py-1 border border-black/20 rounded-full">
                                Color: {item.color}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-black/20 hover:border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} className="md:w-4 md:h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3 md:mt-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full border border-black/20 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} className="md:w-3.5 md:h-3.5" />
                        </button>

                        <span className="text-sm md:text-lg font-light tracking-[0.1em] w-8 md:w-12 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full border border-black/20 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} className="md:w-3.5 md:h-3.5" />
                        </button>
                      </div>

                      <div className="text-base md:text-xl lg:text-2xl font-light tracking-[0.1em]">
                        {item.price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-4 md:space-y-6">
              <div className="border border-black/10 rounded-2xl p-6 md:p-8 space-y-4 md:space-y-6">
                <h3 className="text-xl md:text-2xl font-light tracking-[0.15em] uppercase">
                  Order Summary
                </h3>

                <div className="h-[1px] bg-black/10" />

                <div className="space-y-4">
                  <div className="flex justify-between text-sm tracking-[0.1em] uppercase">
                    <span className="opacity-60">Subtotal</span>
                    <span>€{totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm tracking-[0.1em] uppercase">
                    <span className="opacity-60">Shipping</span>
                    <span>Free</span>
                  </div>
                </div>

                <div className="h-[1px] bg-black/10" />

                <div className="flex justify-between text-xl font-light tracking-[0.1em] uppercase">
                  <span>Total</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>

                <button className="w-full px-8 md:px-12 py-3 md:py-4 bg-red-600 text-white text-xs md:text-sm tracking-[0.3em] uppercase font-light rounded-full hover:bg-red-700 transition-all duration-300 border border-red-600 hover:border-red-700">
                  Proceed to Checkout
                </button>

                <button
                  onClick={clearCart}
                  className="w-full px-8 md:px-12 py-3 md:py-4 bg-transparent text-black text-xs md:text-sm tracking-[0.3em] uppercase font-light rounded-full hover:bg-black/5 transition-all duration-300 border border-black/20"
                >
                  Clear Cart
                </button>
              </div>

              <div className="border border-black/10 rounded-2xl p-4 md:p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                    <span className="text-lg">🚚</span>
                  </div>
                  <div>
                    <div className="text-sm tracking-[0.1em] uppercase font-light">
                      Free Shipping
                    </div>
                    <div className="text-xs tracking-[0.1em] opacity-60">
                      On all orders
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-black/10" />

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                    <span className="text-lg">🔒</span>
                  </div>
                  <div>
                    <div className="text-sm tracking-[0.1em] uppercase font-light">
                      Secure Payment
                    </div>
                    <div className="text-xs tracking-[0.1em] opacity-60">
                      SSL encrypted
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-black/10" />

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                    <span className="text-lg">↩️</span>
                  </div>
                  <div>
                    <div className="text-sm tracking-[0.1em] uppercase font-light">
                      Easy Returns
                    </div>
                    <div className="text-xs tracking-[0.1em] opacity-60">
                      30 day guarantee
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;

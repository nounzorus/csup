import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <section id="cart" className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center space-y-6 px-6">
          <ShoppingBag size={80} className="mx-auto opacity-20" />
          <h2 className="text-4xl md:text-5xl font-light tracking-[0.15em] uppercase">
            Your Cart is Empty
          </h2>
          <p className="text-sm tracking-[0.2em] uppercase opacity-60">
            Add some products to get started
          </p>
          <a
            href="#shop"
            className="inline-block px-12 py-4 bg-black text-white text-sm tracking-[0.3em] uppercase font-light rounded-full hover:bg-black/80 transition-all duration-300 border border-black"
          >
            Browse Shop
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="cart" className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-6 py-24 lg:py-32">
        <div className="space-y-2 mb-16">
          <div className="text-xs tracking-[0.3em] uppercase opacity-40">
            Shopping
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.1em] uppercase">
            Cart
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative border border-black/10 rounded-2xl p-6 hover:border-black/30 transition-all duration-300"
              >
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-3">
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  </div>

                  <div className="col-span-9 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-xs tracking-[0.3em] uppercase opacity-40 mb-2">
                            {item.category}
                          </div>
                          <h3 className="text-2xl font-light tracking-[0.15em] uppercase mb-3">
                            {item.name}
                          </h3>
                          <div className="flex flex-wrap gap-3 text-xs tracking-[0.2em] uppercase opacity-60">
                            {item.size && (
                              <span className="px-3 py-1 border border-black/20 rounded-full">
                                Size: {item.size}
                              </span>
                            )}
                            {item.color && (
                              <span className="px-3 py-1 border border-black/20 rounded-full">
                                Color: {item.color}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-10 h-10 flex items-center justify-center rounded-full border border-black/20 hover:border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="text-lg font-light tracking-[0.1em] w-12 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-black/20 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-2xl font-light tracking-[0.1em]">
                        {item.price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <div className="border border-black/10 rounded-2xl p-8 space-y-6">
                <h3 className="text-2xl font-light tracking-[0.15em] uppercase">
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

                <button className="w-full px-12 py-4 bg-red-600 text-white text-sm tracking-[0.3em] uppercase font-light rounded-full hover:bg-red-700 transition-all duration-300 border border-red-600 hover:border-red-700">
                  Proceed to Checkout
                </button>

                <button
                  onClick={clearCart}
                  className="w-full px-12 py-4 bg-transparent text-black text-sm tracking-[0.3em] uppercase font-light rounded-full hover:bg-black/5 transition-all duration-300 border border-black/20"
                >
                  Clear Cart
                </button>
              </div>

              <div className="border border-black/10 rounded-2xl p-6 space-y-3">
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
    </section>
  );
};

export default Cart;

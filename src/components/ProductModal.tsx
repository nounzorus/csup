import { useEffect, useState } from 'react';
import { X, ShoppingCart, Truck, Shield, Info, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface Product {
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  details: string[];
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  material?: string;
  shipping: string;
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!product) return null;

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
          <div className="lg:col-span-6 relative h-[500px] lg:h-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40" />

            {!product.inStock && (
              <div className="absolute top-8 left-8">
                <div className="bg-red-600 px-4 py-2 rounded-lg">
                  <div className="text-white text-xs tracking-[0.2em] uppercase font-light">
                    Out of Stock
                  </div>
                </div>
              </div>
            )}

            <div className="absolute bottom-8 left-8">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <div className="text-white text-xs tracking-[0.2em] uppercase font-light">
                  {product.category}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 lg:p-12 text-white">
            <div className="space-y-8">
              <div>
                <div className="text-xs tracking-[0.3em] uppercase opacity-40 mb-3">
                  Product Details
                </div>
                <h2 className="text-4xl md:text-5xl font-light tracking-[0.15em] uppercase mb-4">
                  {product.name}
                </h2>
                <div className="text-3xl font-light tracking-[0.1em]">
                  {product.price}
                </div>
              </div>

              <div className="h-[1px] bg-white/10" />

              <div className="space-y-4">
                <div className="text-xs tracking-[0.3em] uppercase opacity-40">
                  Description
                </div>
                <p className="text-base leading-relaxed opacity-80 font-light">
                  {product.description}
                </p>
              </div>

              {product.sizes && product.sizes.length > 0 && (
                <>
                  <div className="h-[1px] bg-white/10" />
                  <div className="space-y-4">
                    <div className="text-xs tracking-[0.3em] uppercase opacity-40">
                      Select Size
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-6 py-3 border rounded-lg text-sm tracking-[0.2em] uppercase font-light transition-all duration-300 ${
                            selectedSize === size
                              ? 'border-red-600 bg-red-600 text-white'
                              : 'border-white/20 text-white hover:border-white/40'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {product.colors && product.colors.length > 0 && (
                <>
                  <div className="h-[1px] bg-white/10" />
                  <div className="space-y-4">
                    <div className="text-xs tracking-[0.3em] uppercase opacity-40">
                      Select Color
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-6 py-3 border rounded-lg text-sm tracking-[0.2em] uppercase font-light transition-all duration-300 ${
                            selectedColor === color
                              ? 'border-red-600 bg-red-600 text-white'
                              : 'border-white/20 text-white hover:border-white/40'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="h-[1px] bg-white/10" />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Info size={16} className="opacity-40" />
                  <div className="text-xs tracking-[0.3em] uppercase opacity-40">
                    Product Information
                  </div>
                </div>
                <div className="space-y-2">
                  {product.details.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0"
                    >
                      <div className="w-1 h-1 bg-red-600 rounded-full mt-2" />
                      <span className="text-sm tracking-[0.1em] font-light opacity-80">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-[1px] bg-white/10" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 border border-white/10 rounded-lg">
                  <Truck size={20} className="opacity-40" />
                  <div>
                    <div className="text-xs tracking-[0.2em] uppercase opacity-40">
                      Shipping
                    </div>
                    <div className="text-sm tracking-[0.1em] font-light mt-1">
                      {product.shipping}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 border border-white/10 rounded-lg">
                  <Shield size={20} className="opacity-40" />
                  <div>
                    <div className="text-xs tracking-[0.2em] uppercase opacity-40">
                      Guarantee
                    </div>
                    <div className="text-sm tracking-[0.1em] font-light mt-1">
                      30 Days Return
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  disabled={!product.inStock}
                  onClick={() => {
                    if (product.inStock) {
                      addItem({
                        id: `${product.name}-${selectedSize}-${selectedColor}`,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        category: product.category,
                        size: selectedSize,
                        color: selectedColor,
                      });
                      setAddedToCart(true);
                      setTimeout(() => setAddedToCart(false), 2000);
                    }
                  }}
                  className={`w-full flex items-center justify-center gap-3 px-12 py-4 text-sm tracking-[0.3em] uppercase font-light rounded-full transition-all duration-300 ${
                    product.inStock
                      ? addedToCart
                        ? 'bg-green-600 text-white border border-green-600'
                        : 'bg-red-600 text-white hover:bg-red-700 border border-red-600 hover:border-red-700'
                      : 'bg-white/10 text-white/40 border border-white/10 cursor-not-allowed'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check size={18} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

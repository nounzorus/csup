import { useState } from 'react';
import ProductModal from './ProductModal';
import { Product as StrapiProduct } from '../services/strapiApi';

interface Product {
  category: string;
  name: string;
  artist: string;
  price: string;
  image: string;
  status: string;
  description: string;
  details: string[];
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  material?: string;
  shipping: string;
}

interface ShopProps {
  products: StrapiProduct[];
  isLoading: boolean;
}

const Shop = ({ products: strapiProducts, isLoading }: ShopProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const mockProducts: Product[] = [
    {
      category: 'Vinyl',
      name: 'ECLIPSE SESSIONS VOL.1',
      artist: 'Various Artists',
      price: '€28.00',
      image: 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'In Stock',
      description: 'A carefully curated compilation featuring the finest deep techno and minimal cuts from our roster. Eclipse Sessions Vol.1 captures the essence of underground electronic music with tracks that have been tested on dance floors worldwide. Pressed on high-quality 180g vinyl for optimal sound quality.',
      details: [
        'Double vinyl LP pressed on 180g heavyweight black vinyl',
        'Features 12 exclusive tracks from label artists',
        'Includes download code for digital version',
        'Limited edition of 500 copies worldwide',
        'Mastered for vinyl by renowned engineer Mark Ernestus',
      ],
      inStock: true,
      shipping: 'Ships in 2-3 days',
    },
    {
      category: 'Vinyl',
      name: 'DARK FREQUENCIES EP',
      artist: 'Nova Eclipse',
      price: '€22.00',
      image: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'Limited',
      description: 'Nova Eclipse delivers four tracks of pure deep techno energy. Dark Frequencies EP is a journey through hypnotic basslines and atmospheric soundscapes. Each track builds slowly, revealing hidden layers with every listen. Limited pressing of only 300 copies on premium vinyl.',
      details: [
        'Limited edition 12" vinyl - only 300 copies',
        '4 original tracks plus 1 bonus dub mix',
        'Includes digital download card',
        'Hand-numbered sleeve',
        'Premium 180g vinyl for superior sound',
      ],
      inStock: true,
      shipping: 'Ships in 1-2 days',
    },
    {
      category: 'Apparel',
      name: 'LABEL TEE BLACK',
      artist: 'Essentials',
      price: '€35.00',
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'In Stock',
      description: 'Essential wardrobe staple featuring our minimal logo design. Made from premium organic cotton for ultimate comfort and durability. The perfect blend of street style and underground culture. Unisex fit suitable for all body types.',
      details: [
        '100% organic cotton, 220gsm heavyweight fabric',
        'Screen-printed logo with water-based eco-friendly ink',
        'Pre-shrunk for perfect fit',
        'Reinforced neck and shoulder seams',
        'Unisex sizing',
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'White', 'Grey'],
      inStock: true,
      material: '100% Organic Cotton',
      shipping: 'Ships in 1-2 days',
    },
    {
      category: 'Vinyl',
      name: 'UNDERGROUND TAPE',
      artist: 'Cipher Beats',
      price: '€18.00',
      image: 'https://images.pexels.com/photos/1238979/pexels-photo-1238979.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'In Stock',
      description: 'Return to the golden age of underground music with this limited cassette release. Cipher Beats strips techno down to its essential elements on this 60-minute journey through minimalism. Recorded live in one take, capturing the raw energy of authentic electronic music.',
      details: [
        'Chrome cassette tape for superior sound quality',
        '60 minutes of continuous mix',
        'Limited run of 200 copies',
        'Includes 4-panel J-card with artwork',
        'Comes with digital download code',
      ],
      inStock: true,
      shipping: 'Ships in 1-2 days',
    },
    {
      category: 'Apparel',
      name: 'LOGO HOODIE',
      artist: 'Essentials',
      price: '€65.00',
      image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'In Stock',
      description: 'Premium heavyweight hoodie with embroidered logo. Crafted from a soft cotton-polyester blend for warmth and comfort. Features kangaroo pocket and adjustable drawstring hood. Perfect for cold warehouse nights and festival camping.',
      details: [
        '80% cotton, 20% polyester heavyweight fleece (400gsm)',
        'Embroidered logo on chest',
        'Kangaroo pouch pocket',
        'Lined hood with flat drawcords',
        'Ribbed cuffs and waistband',
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Grey'],
      inStock: true,
      material: '80% Cotton, 20% Polyester',
      shipping: 'Ships in 2-3 days',
    },
    {
      category: 'Accessories',
      name: 'TOTE BAG',
      artist: 'Essentials',
      price: '€25.00',
      image: 'https://images.pexels.com/photos/7679454/pexels-photo-7679454.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'In Stock',
      description: 'Spacious and durable tote bag perfect for carrying your vinyl collection or daily essentials. Made from heavyweight organic cotton canvas with reinforced handles. Features minimal screen-printed logo. Eco-friendly and built to last.',
      details: [
        'Heavy-duty organic cotton canvas (340gsm)',
        'Large capacity - fits up to 8 vinyl records',
        'Screen-printed logo',
        'Reinforced carrying handles',
        'Internal pocket for small items',
      ],
      inStock: true,
      material: '100% Organic Cotton Canvas',
      shipping: 'Ships in 1-2 days',
    },
    {
      category: 'Vinyl',
      name: 'NOCTURNAL SERIES',
      artist: 'Various Artists',
      price: '€32.00',
      image: 'https://images.pexels.com/photos/164853/pexels-photo-164853.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'Pre-Order',
      description: 'The highly anticipated follow-up compilation showcasing the darker side of our label. Nocturnal Series brings together exclusive tracks from established artists and promising newcomers. A sonic exploration of late-night techno culture. Pre-order now for early 2026 delivery.',
      details: [
        'Triple vinyl LP on 180g black vinyl',
        '16 exclusive and unreleased tracks',
        'Gatefold sleeve with artist interviews',
        'Digital download included',
        'Expected shipping: February 2026',
      ],
      inStock: false,
      shipping: 'Pre-Order - Ships Feb 2026',
    },
    {
      category: 'Accessories',
      name: 'ENAMEL PIN SET',
      artist: 'Collectibles',
      price: '€15.00',
      image: 'https://images.pexels.com/photos/6069868/pexels-photo-6069868.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'Limited',
      description: 'Collectible set of three enamel pins featuring our label logo and exclusive designs. Limited edition release with only 250 sets produced. Perfect for jackets, bags, or display. Each pin crafted with attention to detail and premium materials.',
      details: [
        'Set of 3 hard enamel pins',
        'Limited edition - only 250 sets made',
        'Premium metal finish with rubber clutch backs',
        'Sizes range from 20mm to 30mm',
        'Comes in custom presentation card',
      ],
      inStock: true,
      shipping: 'Ships in 1-2 days',
    },
    {
      category: 'Apparel',
      name: 'CAP BLACK',
      artist: 'Essentials',
      price: '€30.00',
      image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'In Stock',
      description: 'Classic six-panel cap with embroidered logo. Adjustable strap ensures perfect fit. Made from premium cotton twill with curved brim. Minimal design perfect for any occasion. Your go-to headwear for festivals and daily wear.',
      details: [
        'Premium cotton twill construction',
        'Embroidered logo on front',
        'Adjustable strap with metal buckle',
        'Curved brim',
        'One size fits most',
      ],
      inStock: true,
      material: '100% Cotton Twill',
      shipping: 'Ships in 1-2 days',
    },
  ];

  const products = strapiProducts.length > 0 ? strapiProducts.map(product => ({
    category: product.category.charAt(0).toUpperCase() + product.category.slice(1),
    name: product.name.toUpperCase(),
    artist: product.artist?.name || 'Label',
    price: `€${product.price.toFixed(2)}`,
    image: product.image.url,
    status: product.inStock ? 'In Stock' : 'Out of Stock',
    description: product.description || '',
    details: [],
    inStock: product.inStock,
    shipping: product.inStock ? 'Ships in 2-3 days' : 'Pre-order',
  })) : mockProducts;

  return (
    <section id="shop" className="min-h-screen bg-black text-white relative">
      <div className="container mx-auto px-6 py-24 lg:py-32">
        <div className="space-y-2 mb-16">
          <div className="text-xs tracking-[0.3em] uppercase opacity-40">
            Merchandise
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.1em] uppercase">
            Shop
          </h2>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-32">
            <div className="text-2xl tracking-[0.3em] uppercase opacity-40 animate-pulse">
              Loading Products...
            </div>
          </div>
        )}

        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {products.map((product, index) => (
            <div
              key={index}
              onClick={() => setSelectedProduct(product)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                <div className="absolute top-4 right-4">
                  <div
                    className={`text-[10px] tracking-[0.3em] uppercase px-3 py-1 rounded-full backdrop-blur-sm ${
                      product.status === 'Limited'
                        ? 'bg-red-600/80 text-white'
                        : product.status === 'Pre-Order'
                        ? 'bg-white/20 text-white border border-white/40'
                        : 'bg-white/10 text-white/80'
                    }`}
                  >
                    {product.status}
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="text-sm tracking-[0.2em] uppercase font-light text-white bg-black/60 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                    View Product
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs tracking-[0.3em] uppercase opacity-40">
                  {product.category}
                </div>
                <h3 className="text-xl md:text-2xl font-light tracking-[0.15em] uppercase transition-all duration-300 group-hover:translate-x-1">
                  {product.name}
                </h3>
                <p className="text-sm tracking-[0.2em] uppercase opacity-60">
                  {product.artist}
                </p>
                <div className="text-lg font-light pt-2">
                  €{product.price}
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
};

export default Shop;

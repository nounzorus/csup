import { useState, useEffect } from 'react';

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="about" className="min-h-screen bg-white text-black relative">
      <div className="container mx-auto px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <div className="text-xs tracking-[0.3em] uppercase opacity-40">
                About Us
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.1em] uppercase">
                Our Vision
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg leading-relaxed opacity-70 font-light">
              <p>
                Founded in the heart of the underground electronic music scene, our label
                represents a new wave of sonic exploration. We believe in pushing boundaries,
                challenging conventions, and creating spaces where experimental sounds can thrive.
              </p>

              <p>
                Our roster features visionary artists who dare to blend genres, merge traditions
                with innovation, and craft immersive audio experiences that transcend the dance floor.
                From deep techno to ambient soundscapes, from broken beats to hypnotic rhythms,
                we curate a diverse palette of electronic music.
              </p>

              <p>
                More than just a record label, we are a collective of like-minded creators,
                a platform for artistic freedom, and a community dedicated to the evolution
                of electronic music culture. We host intimate events, collaborate with visual
                artists, and foster connections between artists and audiences worldwide.
              </p>

              <p>
                Join us on this journey as we continue to shape the future of electronic music,
                one release at a time.
              </p>
            </div>

            <div className="pt-8">
              <div className="inline-block">
                <div className="text-sm tracking-[0.2em] uppercase font-light border-b border-black pb-1 cursor-pointer hover:opacity-60 transition-opacity duration-300">
                  Discover Our Story
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-[500px] lg:h-[700px]">
            <div className="relative w-full h-full overflow-hidden rounded-3xl">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={image}
                    alt={`About ${index + 1}`}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-20" />
            </div>

            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-black opacity-20" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-8">
        <div className="flex gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-px transition-all duration-500 ${
                index === currentImageIndex ? 'w-12 bg-black' : 'w-6 bg-black opacity-20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

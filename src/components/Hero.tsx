interface HeroProps {
  isLoaded: boolean;
}

const Hero = ({ isLoaded }: HeroProps) => {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-on-a-turntable-in-a-nightclub-34534-large.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />

      <div className="relative h-full flex items-center justify-center">
        <div className="text-center px-6">
          <h1
            className={`text-white font-light tracking-[0.3em] uppercase transition-all duration-1200 delay-700 ${
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="block text-6xl md:text-8xl lg:text-9xl mb-4">
              Cowboy Supper
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl opacity-80">
              By the people, for the people
            </span>
          </h1>

        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0">
        <div
          className={`text-center text-white text-xs tracking-[0.3em] uppercase font-light transition-all duration-1500 delay-1500 ${
            isLoaded
              ? 'opacity-60 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="animate-pulse">Scroll to explore</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

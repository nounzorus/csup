import { Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen bg-white text-black relative">
      <div className="container mx-auto px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-12">
            <div className="space-y-2">
              <div className="text-xs tracking-[0.3em] uppercase opacity-40">
                Get In Touch
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.1em] uppercase">
                Contact
              </h2>
            </div>

            <div className="space-y-8 pt-8">
              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Mail className="w-5 h-5 opacity-40" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs tracking-[0.3em] uppercase opacity-40">
                      Email
                    </div>
                    <a
                      href="mailto:info@recordlabel.com"
                      className="text-lg tracking-[0.1em] uppercase font-light transition-all duration-300 group-hover:translate-x-1 inline-block"
                    >
                      info@recordlabel.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <MapPin className="w-5 h-5 opacity-40" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs tracking-[0.3em] uppercase opacity-40">
                      Location
                    </div>
                    <div className="text-lg tracking-[0.1em] uppercase font-light space-y-1">
                      <div>Warehouse District</div>
                      <div className="opacity-60">Berlin, Germany</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div className="text-xs tracking-[0.3em] uppercase opacity-40 mb-6">
                  Follow Us
                </div>
                <div className="flex gap-6">
                  <a
                    href="#"
                    className="group/social"
                  >
                    <div className="w-12 h-12 border border-black/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover/social:border-black group-hover/social:bg-black">
                      <Instagram className="w-5 h-5 transition-colors duration-300 group-hover/social:text-white" />
                    </div>
                  </a>
                  <a
                    href="#"
                    className="group/social"
                  >
                    <div className="w-12 h-12 border border-black/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover/social:border-black group-hover/social:bg-black">
                      <Facebook className="w-5 h-5 transition-colors duration-300 group-hover/social:text-white" />
                    </div>
                  </a>
                  <a
                    href="#"
                    className="group/social"
                  >
                    <div className="w-12 h-12 border border-black/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover/social:border-black group-hover/social:bg-black">
                      <Twitter className="w-5 h-5 transition-colors duration-300 group-hover/social:text-white" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pt-16">
            <form className="space-y-8">
              <div className="space-y-6">
                <div className="group">
                  <label className="text-xs tracking-[0.3em] uppercase opacity-40 mb-3 block">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-black/20 pb-3 text-lg font-light tracking-wider transition-colors duration-300 focus:outline-none focus:border-black placeholder:opacity-30"
                    placeholder="Your name"
                  />
                </div>

                <div className="group">
                  <label className="text-xs tracking-[0.3em] uppercase opacity-40 mb-3 block">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-black/20 pb-3 text-lg font-light tracking-wider transition-colors duration-300 focus:outline-none focus:border-black placeholder:opacity-30"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="group">
                  <label className="text-xs tracking-[0.3em] uppercase opacity-40 mb-3 block">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-black/20 pb-3 text-lg font-light tracking-wider transition-colors duration-300 focus:outline-none focus:border-black placeholder:opacity-30"
                    placeholder="What is this about?"
                  />
                </div>

                <div className="group">
                  <label className="text-xs tracking-[0.3em] uppercase opacity-40 mb-3 block">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="w-full bg-transparent border-b border-black/20 pb-3 text-lg font-light tracking-wider transition-colors duration-300 focus:outline-none focus:border-black placeholder:opacity-30 resize-none"
                    placeholder="Your message..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group relative overflow-hidden bg-black text-white px-12 py-4 rounded-full text-sm tracking-[0.2em] uppercase font-light transition-all duration-300 hover:bg-red-600"
              >
                <span className="relative z-10">Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="border-t border-black/10 mt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-light tracking-[0.2em] uppercase mb-4">
                Label
              </div>
              <p className="text-sm opacity-60 leading-relaxed">
                Electronic music label based in Berlin, pushing boundaries since 2020.
              </p>
            </div>

            <div>
              <div className="text-xs tracking-[0.3em] uppercase opacity-40 mb-4">
                Quick Links
              </div>
              <div className="space-y-2">
                {['About', 'Artists', 'Events', 'Shop', 'Contact'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="block text-sm opacity-60 hover:opacity-100 transition-opacity duration-300"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs tracking-[0.3em] uppercase opacity-40 mb-4">
                Newsletter
              </div>
              <p className="text-sm opacity-60 mb-4">
                Stay updated with our latest releases and events.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 bg-transparent border border-black/20 px-4 py-2 text-sm focus:outline-none focus:border-black transition-colors duration-300"
                />
                <button className="bg-black text-white px-6 py-2 text-sm tracking-wider uppercase hover:bg-red-600 transition-colors duration-300 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs opacity-40">
              © 2025 Record Label. All rights reserved.
            </div>
            <div className="flex gap-6 text-xs opacity-40">
              <a href="#" className="hover:opacity-100 transition-opacity duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Contact;

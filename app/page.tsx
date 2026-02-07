import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { Footer } from '@/components/footer';
import { ProductMarquee } from '@/components/product-marquee';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Featured Collections Preview */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-body tracking-widest text-muted-foreground uppercase mb-4">
              Featured Collection
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary text-balance">
              Latest Arrivals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Product Image Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-muted to-secondary flex items-center justify-center overflow-hidden">
                  <div className="text-6xl opacity-30">✨</div>
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs font-body tracking-widest text-muted-foreground uppercase">
                      Premium Collection
                    </p>
                    <h3 className="font-display text-xl font-bold text-primary group-hover:text-accent transition-colors">
                      Statement Necklace {item}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-lg font-bold text-primary">$49.99</span>
                    <button className="text-sm font-body font-medium text-primary hover:text-accent transition-colors">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-body font-medium hover:bg-primary/90 transition-colors"
            >
              View All Collections
            </a>
          </div>
        </div>
      </section>

      <Features />

      {/* Why Choose Zeaver Section */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        {/* Faded background images */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <p className="text-sm font-body tracking-widest text-muted-foreground uppercase mb-4">
              What Sets Us Apart
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary text-balance">
              The Zeaver Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="space-y-8 animate-slide-in-left">
              {[
                {
                  icon: '✓',
                  title: 'Premium Quality Materials',
                  description: 'Sourced from trusted suppliers worldwide, every material meets our strict quality standards.'
                },
                {
                  icon: '✓',
                  title: 'Expert Artisan Craftsmanship',
                  description: 'Handcrafted by skilled artisans with decades of jewelry-making experience.'
                },
                {
                  icon: '✓',
                  title: 'Lifetime Customer Support',
                  description: 'We stand behind our pieces with hassle-free returns and lifetime customer care.'
                },
                {
                  icon: '✓',
                  title: 'Sustainable & Ethical',
                  description: 'We believe in responsible luxury that respects people and the planet.'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/20 text-accent font-bold text-lg group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-primary group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right side - Visual showcase */}
            <div className="relative h-96 animate-slide-in-right">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/5 rounded-lg"></div>
              <div className="absolute top-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float"></div>
              <div className="relative h-full flex flex-col items-center justify-center space-y-6">
                <div className="text-6xl animate-float">💎</div>
                <div className="text-center space-y-2">
                  <p className="font-display text-2xl font-bold text-primary">Luxury Redefined</p>
                  <p className="font-body text-muted-foreground">Where elegance meets affordability</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop By Categories Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-secondary to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-sm font-body tracking-widest text-muted-foreground uppercase mb-4">
              Browse With Purpose
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary text-balance">
              Shop By Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                category: 'Necklaces', 
                count: '142 pieces',
                gradient: 'from-blue-50 to-blue-100/50'
              },
              { 
                category: 'Bracelets', 
                count: '98 pieces',
                gradient: 'from-rose-50 to-rose-100/50'
              },
              { 
                category: 'Earrings', 
                count: '185 pieces',
                gradient: 'from-purple-50 to-purple-100/50'
              },
              { 
                category: 'Rings', 
                count: '76 pieces',
                gradient: 'from-emerald-50 to-emerald-100/50'
              }
            ].map((collection, idx) => (
              <div key={idx} className="animate-fade-in-up group relative overflow-hidden rounded-xl" style={{ animationDelay: `${idx * 0.1}s` }}>
                {/* Faded background image */}
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative p-12 h-80 flex flex-col justify-between cursor-pointer hover:shadow-2xl transition-all duration-300 border border-border/50 group-hover:border-accent/50">
                  <div className="space-y-2">
                    <h3 className="font-display text-4xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                      {collection.category}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {collection.count}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-body font-medium text-primary group-hover:text-accent group-hover:translate-x-1 transition-all duration-300">
                    Explore
                    <span>→</span>
                  </div>
                </div>

                {/* Icon background */}
                <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  ✨
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <a
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-body font-medium hover:bg-primary/90 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              Explore All Categories
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products Marquee */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center animate-fade-in-up">
            <p className="text-sm font-body tracking-widest text-muted-foreground uppercase mb-4">
              Customer Favorites
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary text-balance">
              Trending Pieces
            </h2>
            <p className="font-body text-muted-foreground mt-4">Scroll to pause and explore</p>
          </div>
        </div>

        <ProductMarquee />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 bg-accent text-primary px-8 py-4 font-body font-medium hover:bg-accent/90 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              View Full Catalog
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-sm font-body tracking-widest text-primary-foreground/80 uppercase mb-4">
              Loved By Our Customers
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-balance">
              Real Stories From Real People
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Mitchell',
                role: 'Fashion Enthusiast',
                quote: 'The quality is exceptional. I receive compliments on every piece I wear from Zeaver.',
                rating: 5
              },
              {
                name: 'Emma Johnson',
                role: 'Wedding Planner',
                quote: 'Perfect for gift giving. Elegant, affordable, and absolutely stunning pieces.',
                rating: 5
              },
              {
                name: 'Jessica Chen',
                role: 'Jewelry Collector',
                quote: 'I am impressed by the attention to detail. These pieces rival much more expensive jewelry.',
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="animate-fade-in-up group" style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 p-8 rounded-lg hover:bg-primary-foreground/15 hover:border-accent transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-4 flex-1">
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i} className="text-accent text-lg">★</span>
                      ))}
                    </div>
                    <p className="font-body italic text-primary-foreground/90 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="pt-4 border-t border-primary-foreground/20">
                    <p className="font-display font-bold text-primary-foreground">
                      {testimonial.name}
                    </p>
                    <p className="font-body text-sm text-primary-foreground/70">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary via-primary/95 to-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <p className="text-sm font-body tracking-widest text-primary-foreground/80 uppercase">
                Limited Time Offer
              </p>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-primary-foreground text-balance">
                Discover Your Perfect Piece
              </h2>
              <p className="font-body text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                Elevate your style with our handpicked collection of luxury imitation jewelry. Each piece tells a story of elegance and craftsmanship.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/catalog"
                className="inline-flex items-center justify-center gap-2 bg-accent text-primary px-8 py-4 font-body font-medium hover:bg-accent/90 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                Start Shopping
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground text-primary-foreground px-8 py-4 font-body font-medium hover:bg-primary-foreground/10 hover:shadow-lg transition-all duration-300"
              >
                Learn Our Story
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

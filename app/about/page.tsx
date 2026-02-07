import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-balance">About Zeaver</h1>
          <p className="font-body text-xl max-w-2xl mx-auto text-primary-foreground/90">
            Crafting elegance and luxury for the modern aesthete since 2020
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        {/* Our Story */}
        <section className="mb-20 md:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-primary">Our Story</h2>
              <p className="font-body text-lg text-foreground leading-relaxed mb-4">
                Zeaver was born from a simple yet powerful vision: to make luxury jewelry accessible to everyone. We believe that exceptional craftsmanship and elegant design should not be limited by price.
              </p>
              <p className="font-body text-lg text-foreground leading-relaxed">
                Our founders, passionate about jewelry design and sustainability, began creating exquisite imitation pieces that capture the essence of luxury without the premium price tag. Today, Zeaver stands as a testament to innovation, quality, and inclusive elegance.
              </p>
            </div>
            <div className="bg-gradient-to-br from-muted to-secondary rounded-lg h-96 flex items-center justify-center">
              <div className="text-6xl opacity-30">✨</div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20 md:mb-32">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16 text-primary">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '💎',
                title: 'Quality',
                description: 'Every piece is meticulously crafted using the finest materials and techniques to ensure lasting beauty.',
              },
              {
                icon: '🌍',
                title: 'Sustainability',
                description: 'We are committed to sustainable practices and ethical sourcing in all our operations.',
              },
              {
                icon: '❤️',
                title: 'Accessibility',
                description: 'We believe luxury should be accessible to all, making premium jewelry achievable for everyone.',
              },
            ].map((value, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-border p-8 text-center">
                <p className="text-5xl mb-4">{value.icon}</p>
                <h3 className="font-display text-xl font-bold mb-3 text-primary">{value.title}</h3>
                <p className="font-body text-foreground text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* By The Numbers */}
        <section className="mb-20 md:mb-32 bg-secondary rounded-lg p-12 md:p-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16 text-primary">By The Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '50K+', label: 'Happy Customers' },
              { number: '500+', label: 'Products' },
              { number: '4.9★', label: 'Average Rating' },
              { number: '24/7', label: 'Customer Support' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="font-body text-foreground text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-20 md:mb-32">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16 text-primary">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Jessica Lee', role: 'Founder & Creative Director' },
              { name: 'Marcus Chen', role: 'Co-Founder & Operations Lead' },
              { name: 'Sofia Rossi', role: 'Head of Design' },
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-border overflow-hidden">
                <div className="bg-gradient-to-br from-muted to-secondary h-48 flex items-center justify-center">
                  <div className="text-5xl opacity-30">👤</div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-primary mb-1">{member.name}</h3>
                  <p className="font-body text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-primary">Ready to Shine?</h2>
          <p className="font-body text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore our full collection and find the perfect piece to express your unique style.
          </p>
          <a
            href="/catalog"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-body font-medium hover:bg-primary/90 transition-colors"
          >
            Shop Now
          </a>
        </section>
      </div>

      <Footer />
    </main>
  );
}

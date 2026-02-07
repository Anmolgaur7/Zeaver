'use client';

import { Sparkles, Shield, Truck, RotateCw } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Exquisite Craftsmanship',
    description:
      'Each piece is carefully designed and crafted to perfection, capturing the essence of luxury jewelry.',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description:
      'All our imitation jewelry undergoes rigorous quality checks to ensure durability and longevity.',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description:
      'We ship your orders promptly with secure packaging to ensure your pieces arrive in perfect condition.',
  },
  {
    icon: RotateCw,
    title: 'Easy Returns',
    description:
      'Not satisfied? We offer hassle-free returns within 30 days for your complete peace of mind.',
  },
];

export function Features() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-body tracking-widest text-muted-foreground uppercase mb-4">
            Why Choose Zeaver
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary text-balance">
            Uncompromising Quality & Service
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="space-y-4 group animate-fade-in-up hover:shadow-lg p-6 rounded-lg transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center group-hover:bg-accent group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-8 h-8 text-primary group-hover:text-primary transition-colors duration-300" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

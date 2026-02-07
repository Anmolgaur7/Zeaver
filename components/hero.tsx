'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-20 pb-20 md:pt-32 md:pb-32 bg-gradient-to-b from-white to-secondary relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4 animate-fade-in-up">
              <p className="text-sm font-body tracking-widest text-muted-foreground uppercase opacity-80 hover:opacity-100 transition-opacity">
                Luxury Reimagined
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-primary leading-tight">
                Elegance in Every Detail
              </h1>
              <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-lg">
                Discover our curated collection of imitation jewelry that captures the essence of timeless luxury. Each piece is meticulously crafted to bring sophistication to your everyday moments.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-body font-medium hover:bg-primary/90 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                Explore Collections
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 font-body font-medium hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 md:h-full min-h-96 animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary rounded-lg"></div>
            <div className="absolute top-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="text-6xl font-display text-primary/20 animate-float inline-block">✨</div>
                <p className="font-body text-muted-foreground text-sm">
                  Premium Imitation Jewelry
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 mt-20 pt-20 border-t border-border">
          {[
            { value: '1000+', label: 'Pieces in Collection', delay: '0s' },
            { value: '10K+', label: 'Happy Customers', delay: '0.2s' },
            { value: '100%', label: 'Satisfaction Guaranteed', delay: '0.4s' }
          ].map((stat, idx) => (
            <div key={idx} className="text-center group animate-fade-in-up" style={{ animationDelay: stat.delay }}>
              <div className="text-3xl md:text-4xl font-bold text-primary font-display group-hover:text-accent transition-colors duration-300">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground mt-2 font-body group-hover:text-foreground transition-colors duration-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React from "react"

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-balance">Get In Touch</h1>
          <p className="font-body text-xl max-w-2xl mx-auto text-primary-foreground/90">
            We'd love to hear from you. Reach out to us with any questions or feedback.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            {[
              {
                icon: '📧',
                title: 'Email',
                content: 'support@zeaver.com',
                description: 'For general inquiries and support',
              },
              {
                icon: '📱',
                title: 'Phone',
                content: '+1 (800) ZEAVER-1',
                description: 'Monday to Friday, 9 AM - 6 PM EST',
              },
              {
                icon: '📍',
                title: 'Address',
                content: 'Zeaver Jewelry',
                description: '123 Fashion Avenue, New York, NY 10018',
              },
              {
                icon: '⏰',
                title: 'Hours',
                content: 'We\'re always online',
                description: '24/7 chat support available',
              },
            ].map((info, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-border p-6">
                <p className="text-3xl mb-3">{info.icon}</p>
                <h3 className="font-display font-bold text-lg mb-2 text-primary">{info.title}</h3>
                <p className="font-body font-medium text-foreground mb-1">{info.content}</p>
                <p className="font-body text-sm text-muted-foreground">{info.description}</p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-border p-8 md:p-12">
              <h2 className="font-display text-3xl font-bold mb-8 text-primary">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-body font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-body font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-body font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="shipping">Shipping & Returns</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-body font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows={6}
                    className="w-full px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-primary-foreground font-body font-medium hover:bg-primary/90 transition-colors rounded"
                >
                  Send Message
                </button>
              </form>

              <p className="text-sm text-muted-foreground font-body mt-6 text-center">
                We typically respond within 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20 md:mt-32">
          <h2 className="font-display text-4xl font-bold text-center mb-12 text-primary">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'What is your return policy?',
                answer: 'We offer a 30-day return guarantee on all items. Items must be in original condition with tags attached.',
              },
              {
                question: 'Do you ship internationally?',
                answer: 'Yes, we ship to select international destinations. Shipping costs and delivery times vary by location.',
              },
              {
                question: 'How do I track my order?',
                answer: 'You will receive a tracking number via email once your order ships. You can use it to track your package in real-time.',
              },
              {
                question: 'Are your items real jewelry?',
                answer: 'We specialize in high-quality imitation jewelry. Our pieces are crafted to look luxurious while remaining affordable.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-border p-6">
                <h3 className="font-display font-bold text-lg mb-3 text-primary">{faq.question}</h3>
                <p className="font-body text-foreground text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

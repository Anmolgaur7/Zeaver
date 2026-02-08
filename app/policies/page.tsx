'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

type PolicyType = 'privacy' | 'terms' | 'shipping' | 'returns' | 'contact';

export default function PoliciesPage() {
  const [activePolicy, setActivePolicy] = useState<PolicyType>('privacy');

  const policies = {
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'February 2024',
      content: [
        {
          heading: 'Introduction',
          text: 'Zeaver is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.',
        },
        {
          heading: 'Information We Collect',
          text: 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This includes your name, email address, postal address, phone number, payment information, and any other information you choose to provide.',
        },
        {
          heading: 'How We Use Your Information',
          text: 'We use the information we collect to process your orders, send you marketing communications (with your consent), improve our services, and comply with legal obligations. Your payment information is encrypted and handled securely by our payment processors.',
        },
        {
          heading: 'Data Security',
          text: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.',
        },
        {
          heading: 'Third-Party Links',
          text: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.',
        },
        {
          heading: 'Changes to This Policy',
          text: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.',
        },
      ],
    },
    terms: {
      title: 'Terms of Service',
      lastUpdated: 'February 2024',
      content: [
        {
          heading: 'Agreement to Terms',
          text: 'By accessing and using the Zeaver website, you accept and agree to be bound by and comply with these Terms of Service. If you do not agree to abide by the above, please do not use this service.',
        },
        {
          heading: 'Use License',
          text: 'Permission is granted to temporarily download one copy of the materials (information or software) on Zeaver\'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to decompile or reverse engineer any software contained on the website; remove any copyright or other proprietary notations from the materials.',
        },
        {
          heading: 'Disclaimer',
          text: 'The materials on Zeaver\'s website are provided on an \'as is\' basis. Zeaver makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
        },
        {
          heading: 'Limitations',
          text: 'In no event shall Zeaver or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Zeaver\'s website.',
        },
        {
          heading: 'Accuracy of Materials',
          text: 'The materials appearing on Zeaver\'s website could include technical, typographical, or photographic errors. Zeaver does not warrant that any of the materials on its website are accurate, complete, or current.',
        },
        {
          heading: 'Modifications',
          text: 'Zeaver may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.',
        },
      ],
    },
    shipping: {
      title: 'Shipping Information',
      lastUpdated: 'February 2024',
      content: [
        {
          heading: 'Shipping Methods',
          text: 'We offer standard shipping (5-7 business days) and express shipping (2-3 business days) for orders within the United States. International shipping is available for select countries.',
        },
        {
          heading: 'Shipping Costs',
          text: 'Shipping costs are calculated based on your location and order weight. Free standard shipping is available on orders over ₹1000. Express shipping rates are displayed at checkout before you complete your purchase.',
        },
        {
          heading: 'Processing Time',
          text: 'Orders are typically processed within 1-2 business days. Processing time does not include weekends or holidays. Once your order ships, you will receive a tracking number via email.',
        },
        {
          heading: 'Delivery Times',
          text: 'Standard shipping: 5-7 business days. Express shipping: 2-3 business days. These timeframes are from the date your order ships, not from the date of purchase. Delivery times are estimates and are not guaranteed.',
        },
        {
          heading: 'International Shipping',
          text: 'We ship to select international destinations. International orders may be subject to customs duties and taxes. These fees are the responsibility of the recipient. Delivery times for international orders typically range from 2-3 weeks.',
        },
        {
          heading: 'Tracking Your Order',
          text: 'Once your order ships, you will receive an email with a tracking number. You can use this number to track your package in real-time. For questions about your shipment, please contact our customer service team.',
        },
      ],
    },
    returns: {
      title: 'Return & Exchange Policy',
      lastUpdated: 'February 2024',
      content: [
        {
          heading: '30-Day Return Guarantee',
          text: 'We offer a 30-day return guarantee on all items. If you are not completely satisfied with your purchase, you can return it within 30 days of delivery for a full refund or exchange.',
        },
        {
          heading: 'Condition Requirements',
          text: 'Items must be in their original condition, unworn, unwashed, and with all tags attached. Items showing signs of wear, damage, or alteration will not be accepted for return.',
        },
        {
          heading: 'How to Initiate a Return',
          text: 'To start a return, log into your account and navigate to your order history. Select the item you wish to return and follow the prompts. You will receive a pre-paid shipping label via email.',
        },
        {
          heading: 'Processing Returns',
          text: 'Once we receive and inspect your return, we will process your refund within 5-7 business days. The refund will be issued to your original payment method.',
        },
        {
          heading: 'Exchanges',
          text: 'If you need a different size or color, we offer free exchanges within 30 days. Simply select "Exchange" during the return process and choose your replacement item.',
        },
        {
          heading: 'Non-Returnable Items',
          text: 'Custom orders, items purchased on final sale, and items damaged due to customer mishandling are not eligible for return or exchange.',
        },
      ],
    },
    contact: {
      title: 'Contact Us',
      lastUpdated: 'February 2024',
      content: [
        {
          heading: 'Customer Service',
          text: 'Have questions? Our customer service team is here to help! We aim to respond to all inquiries within 24 business hours.',
        },
        {
          heading: 'Email',
          text: 'support@zeaver.com - For general inquiries, orders, and product questions.',
        },
        {
          heading: 'Phone',
          text: '+1 (800) ZEAVER-1 - Monday to Friday, 9 AM - 6 PM EST',
        },
        {
          heading: 'Live Chat',
          text: 'Available on our website during business hours for immediate assistance.',
        },
        {
          heading: 'Mailing Address',
          text: 'Zeaver Jewelry\n123 Fashion Avenue\nNew York, NY 10018\nUSA',
        },
        {
          heading: 'Social Media',
          text: 'Connect with us on Instagram, Facebook, and TikTok for the latest updates, promotions, and style inspiration.',
        },
      ],
    },
  };

  const currentPolicy = policies[activePolicy];

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-balance">Policies & Information</h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
          Find answers to common questions and learn about our policies regarding privacy, shipping, returns, and more.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-lg border border-border p-6">
              <h3 className="font-display text-lg font-bold mb-4">Quick Links</h3>
              <nav className="space-y-3">
                {(['privacy', 'terms', 'shipping', 'returns', 'contact'] as const).map((policy) => (
                  <button
                    key={policy}
                    onClick={() => setActivePolicy(policy)}
                    className={`w-full text-left px-4 py-3 rounded transition-colors font-body text-sm ${
                      activePolicy === policy
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    {policy === 'privacy' && 'Privacy Policy'}
                    {policy === 'terms' && 'Terms of Service'}
                    {policy === 'shipping' && 'Shipping Info'}
                    {policy === 'returns' && 'Returns & Exchanges'}
                    {policy === 'contact' && 'Contact Us'}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-border p-8 md:p-12">
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold mb-2">{currentPolicy.title}</h2>
                <p className="text-sm text-muted-foreground">Last updated: {currentPolicy.lastUpdated}</p>
              </div>

              <div className="space-y-8">
                {currentPolicy.content.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="font-display text-xl font-bold text-primary">{section.heading}</h3>
                    <p className="font-body text-foreground leading-relaxed whitespace-pre-line">{section.text}</p>
                  </div>
                ))}
              </div>

              {/* Contact CTA */}
              {activePolicy !== 'contact' && (
                <div className="mt-12 pt-8 border-t border-border">
                  <p className="font-body text-muted-foreground mb-4">Still have questions?</p>
                  <button
                    onClick={() => setActivePolicy('contact')}
                    className="inline-flex items-center gap-2 text-accent font-body font-medium hover:text-accent/80 transition-colors"
                  >
                    Contact our support team →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

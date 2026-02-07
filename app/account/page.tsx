'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';

type TabType = 'overview' | 'orders' | 'profile' | 'addresses' | 'settings';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isEditing, setIsEditing] = useState(false);

  const userInfo = {
    name: 'Sarah Anderson',
    email: 'sarah.anderson@example.com',
    phone: '+1 (555) 123-4567',
  };

  const orders = [
    {
      id: '#ZEA-001',
      date: 'February 1, 2024',
      total: '$139.98',
      status: 'Delivered',
      items: 'Statement Necklace, Diamond Earrings',
    },
    {
      id: '#ZEA-002',
      date: 'January 15, 2024',
      total: '$89.99',
      status: 'Delivered',
      items: 'Gold Bracelet',
    },
    {
      id: '#ZEA-003',
      date: 'January 8, 2024',
      total: '$49.99',
      status: 'Delivered',
      items: 'Pearl Necklace',
    },
  ];

  const addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'Sarah Anderson',
      street: '123 Main Street',
      city: 'New York, NY 10001',
      phone: '+1 (555) 123-4567',
      default: true,
    },
    {
      id: 2,
      type: 'Office',
      name: 'Sarah Anderson',
      street: '456 Business Ave',
      city: 'New York, NY 10005',
      phone: '+1 (555) 123-4567',
      default: false,
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2 text-balance">My Account</h1>
          <p className="text-lg text-muted-foreground">Manage your profile, orders, and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
              <nav className="space-y-2">
                {(['overview', 'orders', 'profile', 'addresses', 'settings'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left px-4 py-3 rounded transition-colors font-body text-sm ${
                      activeTab === tab
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    {tab === 'overview' && 'Overview'}
                    {tab === 'orders' && 'Order History'}
                    {tab === 'profile' && 'Profile Info'}
                    {tab === 'addresses' && 'Addresses'}
                    {tab === 'settings' && 'Settings'}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-border">
                <button className="w-full px-4 py-2 border border-border text-foreground font-body font-medium hover:bg-secondary transition-colors rounded">
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-8">
                  <h2 className="font-display text-2xl font-bold mb-2">Welcome back, Sarah!</h2>
                  <p className="font-body text-primary-foreground/80">
                    You've been a valued member since January 2024. Keep exploring our latest collections!
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg border border-border p-6">
                    <p className="text-sm text-muted-foreground font-body uppercase tracking-widest mb-2">Total Orders</p>
                    <p className="font-display text-3xl font-bold">3</p>
                  </div>
                  <div className="bg-white rounded-lg border border-border p-6">
                    <p className="text-sm text-muted-foreground font-body uppercase tracking-widest mb-2">Total Spent</p>
                    <p className="font-display text-3xl font-bold">$279.96</p>
                  </div>
                  <div className="bg-white rounded-lg border border-border p-6">
                    <p className="text-sm text-muted-foreground font-body uppercase tracking-widest mb-2">Loyalty Points</p>
                    <p className="font-display text-3xl font-bold">280</p>
                  </div>
                </div>

                {/* Recent Orders Preview */}
                <div className="bg-white rounded-lg border border-border p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-xl font-bold">Recent Orders</h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-sm text-accent font-body font-medium hover:text-accent/80 transition-colors"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="space-y-4">
                    {orders.slice(0, 2).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded hover:bg-secondary transition-colors">
                        <div className="flex-1">
                          <p className="font-body font-medium text-foreground">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-body font-bold text-foreground">{order.total}</p>
                          <p className="text-sm text-accent">{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-border overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h3 className="font-display text-xl font-bold">Order History</h3>
                  </div>

                  <div className="divide-y divide-border">
                    {orders.map((order) => (
                      <div key={order.id} className="p-6 hover:bg-secondary transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-body font-bold text-foreground text-lg">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold font-body ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-foreground mb-4">{order.items}</p>
                        <div className="flex items-center justify-between">
                          <p className="font-display text-lg font-bold">{order.total}</p>
                          <button className="text-sm text-accent font-body font-medium hover:text-accent/80 transition-colors">
                            View Details →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg border border-border p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-display text-xl font-bold">Personal Information</h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-sm text-accent font-body font-medium hover:text-accent/80 transition-colors"
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-body font-medium text-muted-foreground mb-2 uppercase tracking-widest">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        defaultValue={userInfo.name}
                        className="w-full px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                      />
                    ) : (
                      <p className="text-lg font-body text-foreground">{userInfo.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-body font-medium text-muted-foreground mb-2 uppercase tracking-widest">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        defaultValue={userInfo.email}
                        className="w-full px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                      />
                    ) : (
                      <p className="text-lg font-body text-foreground">{userInfo.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-body font-medium text-muted-foreground mb-2 uppercase tracking-widest">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        defaultValue={userInfo.phone}
                        className="w-full px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                      />
                    ) : (
                      <p className="text-lg font-body text-foreground">{userInfo.phone}</p>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex gap-4 pt-4">
                      <button className="flex-1 px-6 py-3 bg-primary text-primary-foreground font-body font-medium hover:bg-primary/90 transition-colors rounded">
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 px-6 py-3 border border-border text-foreground font-body font-medium hover:bg-secondary transition-colors rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <button className="w-full px-6 py-4 border-2 border-dashed border-border text-foreground font-body font-medium hover:border-primary hover:bg-secondary transition-colors rounded">
                  + Add New Address
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div key={address.id} className="bg-white border border-border rounded-lg p-6 relative">
                      {address.default && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-primary text-xs font-bold rounded">
                          DEFAULT
                        </div>
                      )}
                      <p className="font-display font-bold text-lg mb-2">{address.type}</p>
                      <div className="space-y-1 mb-4">
                        <p className="font-body text-foreground">{address.name}</p>
                        <p className="font-body text-foreground">{address.street}</p>
                        <p className="font-body text-foreground">{address.city}</p>
                        <p className="font-body text-foreground">{address.phone}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-sm text-accent font-body font-medium hover:text-accent/80 transition-colors">
                          Edit
                        </button>
                        <button className="text-sm text-muted-foreground font-body font-medium hover:text-foreground transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg border border-border p-8 space-y-8">
                <div>
                  <h3 className="font-display text-xl font-bold mb-4">Email Preferences</h3>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="font-body text-foreground">
                        Receive order updates and shipping notifications
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="font-body text-foreground">
                        Subscribe to our newsletter for exclusive offers
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="font-body text-foreground">
                        New product announcements and promotions
                      </span>
                    </label>
                  </div>
                </div>

                <div className="border-t border-border pt-8">
                  <h3 className="font-display text-xl font-bold mb-4">Password & Security</h3>
                  <button className="px-6 py-3 bg-primary text-primary-foreground font-body font-medium hover:bg-primary/90 transition-colors rounded">
                    Change Password
                  </button>
                </div>

                <div className="border-t border-border pt-8">
                  <h3 className="font-display text-xl font-bold mb-4 text-red-600">Danger Zone</h3>
                  <button className="px-6 py-3 border-2 border-red-600 text-red-600 font-body font-medium hover:bg-red-50 transition-colors rounded">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

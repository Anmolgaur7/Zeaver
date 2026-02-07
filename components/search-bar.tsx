'use client';

import React from "react"

import { useState } from 'react';

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 text-foreground hover:text-accent transition-colors"
        aria-label="Search"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {isOpen && (
        <form
          onSubmit={handleSearch}
          className="absolute right-0 top-full mt-2 w-80 bg-white border border-border rounded-lg shadow-lg p-4 z-50"
        >
          <input
            type="text"
            placeholder="Search for jewelry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary transition-colors"
            autoFocus
          />
          <button
            type="submit"
            className="w-full mt-3 px-4 py-2 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors rounded"
          >
            Search
          </button>
        </form>
      )}
    </div>
  );
}

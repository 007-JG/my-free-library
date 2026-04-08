"use client";

import React, { useState, useEffect } from 'react';

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en'); // Default English
  const [selectedBook, setSelectedBook] = useState(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'ar', name: 'Arabic' }
  ];

  const searchBooks = async (e) => {
    if (e) e.preventDefault();
    if (!query) return;
    setLoading(true);

    try {
      // langRestrict filter add kiya hai language ke liye
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=${lang}&maxResults=12`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-10 text-black font-sans">
      {/* Header */}
      <header className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-6xl font-black mb-4 tracking-tighter">
          BRIGHTWAY <span className="text-blue-600">LIBRARY</span>
        </h1>
        
        <form onSubmit={searchBooks} className="flex flex-col md:flex-row gap-3 mt-8 bg-gray-100 p-3 rounded-3xl shadow-inner">
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className="bg-white p-3 rounded-2xl border-none outline-none font-bold text-gray-700 cursor-pointer"
          >
            {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
          </select>
          <input 
            type="text" 
            placeholder="Search any book..." 
            className="flex-1 p-4 bg-transparent outline-none text-xl"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 hover:bg-black text-white px-10 py-4 rounded-2xl font-black transition-all">
            {loading ? '...' : 'SEARCH'}
          </button>
        </form>
      </header>

      {/* Results */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <div key={book.id} className="group bg-white border border-gray-100 rounded-3xl p-4 hover:shadow-2xl transition-all">
            <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-2xl shadow-md">
              <img 
                src={book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150'} 
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <button 
                onClick={() => setSelectedBook(book.id)}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold transition-all"
              >
                READ PREVIEW 📖
              </button>
            </div>
            <h2 className="font-bold text-lg line-clamp-1">{book.volumeInfo.title}</h2>
            <p className="text-blue-600 text-sm mb-4">{book.volumeInfo.authors?.[0]}</p>
            <div className="flex gap-2">
               <button 
                onClick={() => setSelectedBook(book.id)}
                className="flex-1 bg-gray-900 text-white text-xs py-3 rounded-xl font-bold"
               >
                 READ NOW
               </button>
               <a href={`https://www.amazon.com/s?k=${book.volumeInfo.title}`} target="_blank" className="bg-yellow-400 p-3 rounded-xl text-xs font-bold">🛒</a>
            </div>
          </div>
        ))}
      </main>

      {/* Preview Modal (Reader Overlay) */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/90 z-50 p-4 flex flex-col items-center">
          <button 
            onClick={() => setSelectedBook(null)}
            className="self-end text-white text-4xl mb-4 font-light hover:rotate-90 transition-all"
          >
            &times;
          </button>
          <div className="w-full max-w-5xl h-[80vh] bg-white rounded-3xl overflow-hidden shadow-2xl">
            <iframe 
              src={`https://books.google.com/books?id=${selectedBook}&lpg=PP1&pg=PP1&output=embed`} 
              className="w-full h-full border-none"
              title="Book Preview"
            />
          </div>
          <p className="text-gray-400 mt-4 italic text-sm text-center">
            Note: Google provides limited preview for free. Full access depends on book availability.
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from 'react';

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en');
  const [selectedBook, setSelectedBook] = useState(null);

  const searchBooks = async (e) => {
    if (e) e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=${lang}&maxResults=12`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-10 text-black">
      <div className="max-w-5xl mx-auto text-center mb-2">
        <p className="text-blue-600 font-bold tracking-widest uppercase text-sm animate-pulse">
          ✨ Brightway Library Welcomes You ✨
        </p>
      </div>

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
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
          </select>
          <input 
            type="text" 
            placeholder="Search books..." 
            className="flex-1 p-4 bg-transparent outline-none text-xl text-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg">
            {loading ? '...' : 'SEARCH'}
          </button>
        </form>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <div key={book.id} className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm">
            <div className="aspect-[3/4] mb-4 overflow-hidden rounded-2xl">
              <img 
                src={book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150'} 
                className="w-full h-full object-cover"
                alt="book cover"
              />
            </div>
            <h2 className="font-bold text-lg line-clamp-1">{book.volumeInfo.title}</h2>
            
            <div className="mt-4 space-y-2">
              {/* Force Open in New Tab */}
              <button 
                onClick={() => setSelectedBook(book.id)}
                className="w-full bg-blue-600 text-white text-xs py-3 rounded-xl font-bold"
              >
                READ FIRST CHAPTER
              </button>
              
              <a 
                href={`https://www.amazon.com/s?k=${encodeURIComponent(book.volumeInfo.title)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-center bg-yellow-400 text-black text-xs py-3 rounded-xl font-bold shadow-sm"
              >
                BUY ON AMAZON 🛒
              </a>
            </div>
          </div>
        ))}
      </main>

      {/* Reader Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/95 z-[9999] p-4 flex flex-col">
          <button 
            onClick={() => setSelectedBook(null)}
            className="self-end text-white text-5xl p-4"
          >
            &times;
          </button>
          <div className="flex-1 bg-white rounded-t-3xl overflow-hidden shadow-2xl">
            <iframe 
              src={`https://books.google.com/books?id=${selectedBook}&printsec=frontcover&output=embed`} 
              className="w-full h-full border-none"
              title="reader"
            />
          </div>
        </div>
      )}
    </div>
  );
}

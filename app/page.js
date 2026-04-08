"use client";

import React, { useState } from 'react';

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);

    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header with New Name */}
      <header className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-black text-black mb-2 tracking-tight">
          BRIGHTWAY <span className="text-blue-600">LIBRARY</span>
        </h1>
        <p className="text-gray-500 text-lg">Duniya ki har kitaab, ab aapki pohanch mein.</p>
        
        <form onSubmit={searchBooks} className="mt-8 flex gap-2 p-2 bg-gray-100 rounded-2xl shadow-inner">
          <input 
            type="text" 
            placeholder="Book, Author ya Topic search karein..." 
            className="flex-1 p-4 bg-transparent border-none outline-none text-black text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit" 
            className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg"
          >
            {loading ? 'Searching...' : 'Dhoondein'}
          </button>
        </form>
      </header>

      {/* Results Section */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <div key={book.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300">
            <div className="aspect-[2/3] overflow-hidden bg-gray-200">
              {book.volumeInfo.imageLinks?.thumbnail ? (
                <img 
                  src={book.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:')} 
                  alt={book.volumeInfo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 italic">No Cover</div>
              )}
            </div>
            
            <div className="p-5">
              <h2 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1">{book.volumeInfo.title}</h2>
              <p className="text-sm text-blue-600 font-medium mb-3 line-clamp-1">{book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
              <p className="text-gray-500 text-xs line-clamp-3 mb-5 leading-relaxed">
                {book.volumeInfo.description || "Is book ki summary filhal available nahi hai."}
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href={book.volumeInfo.infoLink} 
                  target="_blank" 
                  className="text-center bg-gray-50 hover:bg-gray-100 text-gray-900 py-2.5 rounded-lg text-xs font-bold border border-gray-200 transition"
                >
                  Details
                </a>
                <a 
                  href={`https://www.amazon.com/s?k=${book.volumeInfo.title}`} 
                  target="_blank" 
                  className="text-center bg-yellow-400 hover:bg-yellow-500 text-black py-2.5 rounded-lg text-xs font-bold transition shadow-sm"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </main>

      {books.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center mt-20 opacity-20">
          <div className="text-8xl mb-4">📚</div>
          <p className="text-2xl font-bold">Brightway Library mein aapka swagat hai</p>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from 'react';

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en');
  const [selectedBookId, setSelectedBookId] = useState(null);

  const searchBooks = async (e) => {
    if (e) e.preventDefault();
    if (!query) return;
    setLoading(true);
    setSelectedBookId(null); // Purani book band karne ke liye
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
      {/* Welcome Line */}
      <div className="max-w-5xl mx-auto text-center mb-2">
        <p className="text-blue-600 font-bold tracking-widest uppercase text-sm animate-pulse">
          ✨ Brightway Library Welcomes You ✨
        </p>
      </div>

      <header className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-6xl font-black mb-4 tracking-tighter">
          BRIGHTWAY <span className="text-blue-600">LIBRARY</span>
        </h1>
        
        <form onSubmit={searchBooks} className="flex flex-col md:flex-row gap-3 mt-8 bg-gray-100 p-3 rounded-3xl shadow-inner border border-gray-200">
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
          <button type="submit" className="bg-blue-600 hover:bg-black text-white px-10 py-4 rounded-2xl font-black transition-all shadow-lg">
            {loading ? '...' : 'SEARCH'}
          </button>
        </form>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <div key={book.id} className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="aspect-[3/4] mb-4 overflow-hidden rounded-2xl bg-gray-50 shadow-inner">
                <img 
                  src={book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150'} 
                  className="w-full h-full object-cover"
                  alt="book cover"
                />
              </div>
              <h2 className="font-bold text-lg line-clamp-2">{book.volumeInfo.title}</h2>
              <p className="text-blue-500 text-sm mb-4 italic">{book.volumeInfo.authors?.[0] || 'Unknown Author'}</p>
            </div>
            
            <div className="mt-auto space-y-2">
              {/* Is button se Modal khulega */}
              <button 
                onClick={() => setSelectedBookId(book.id)}
                className="w-full bg-blue-600 text-white text-xs py-4 rounded-xl font-bold hover:bg-black transition-colors"
              >
                READ INSIDE WEBSITE 📖
              </button>
              
              <a 
                href={`https://www.amazon.com/s?k=${encodeURIComponent(book.volumeInfo.title)}`} 
                target="_blank" 
                className="block text-center bg-yellow-400 text-black text-xs py-4 rounded-xl font-bold hover:bg-yellow-500"
              >
                BUY ON AMAZON 🛒
              </a>
            </div>
          </div>
        ))}
      </main>

      {/* --- READER MODAL (Popup) --- */}
      {selectedBookId && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex flex-col items-center justify-center p-2 md:p-6">
          <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-full">
            {/* Modal Header */}
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <span className="font-bold text-gray-700">Brightway Reader Mode</span>
              <button 
                onClick={() => setSelectedBookId(null)}
                className="bg-red-500 text-white px-4 py-1 rounded-full font-bold hover:bg-red-700 transition"
              >
                CLOSE [X]
              </button>
            </div>
            
            {/* The Book Frame */}
            <div className="flex-1 bg-gray-200 relative">
              <iframe 
                src={`https://books.google.com/books?id=${selectedBookId}&printsec=frontcover&output=embed`} 
                className="w-full h-full border-none"
                title="Google Book Reader"
              />
            </div>
          </div>
        </div>
      )}

      {books.length === 0 && !loading && (
        <div className="text-center mt-20 text-gray-300 font-bold text-xl uppercase tracking-widest">
          Type something to explore the library
        </div>
      )}
    </div>
  );
}

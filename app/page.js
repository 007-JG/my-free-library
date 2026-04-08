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
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4">AI Digital Library</h1>
        <p className="text-gray-600 mb-6">Google se koi bhi book dhundein aur summary padhein.</p>
        
        <form onSubmit={searchBooks} className="flex gap-2">
          <input 
            type="text" 
            placeholder="Book ka naam likhein..." 
            className="flex-1 p-3 border rounded-lg shadow-sm text-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-xl shadow-lg p-5 border flex flex-col justify-between">
            <div>
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img 
                  src={book.volumeInfo.imageLinks.thumbnail} 
                  alt={book.volumeInfo.title}
                  className="w-32 h-48 object-cover rounded mb-4 mx-auto"
                />
              )}
              <h2 className="text-lg font-bold text-gray-800">{book.volumeInfo.title}</h2>
              <p className="text-sm text-blue-500 mb-2">{book.volumeInfo.authors?.join(', ')}</p>
              <p className="text-gray-600 text-xs line-clamp-4">
                {book.volumeInfo.description || "Summary not available."}
              </p>
            </div>
            
            <div className="mt-4 space-y-2">
              <a href={book.volumeInfo.infoLink} target="_blank" className="block text-center bg-gray-100 py-2 rounded text-sm font-semibold text-black">Details</a>
              <a href={`https://www.amazon.com/s?k=${book.volumeInfo.title}`} target="_blank" className="block text-center bg-orange-500 text-white py-2 rounded font-bold text-sm">Buy Now</a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

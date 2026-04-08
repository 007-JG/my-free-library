"use client";

import React, { useState } from 'react';

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en');
  
  // Modal states
  const [activeBook, setActiveBook] = useState(null);
  const [modalType, setModalType] = useState(null); // 'read', 'summary', 'points'

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

  const openModal = (book, type) => {
    setActiveBook(book);
    setModalType(type);
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
        
        <form onSubmit={searchBooks} className="flex flex-col md:flex-row gap-3 mt-8 bg-gray-100 p-3 rounded-3xl shadow-inner border border-gray-200">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-white p-3 rounded-2xl border-none font-bold text-gray-700 outline-none">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
          <input 
            type="text" placeholder="Search books..." className="flex-1 p-4 bg-transparent outline-none text-xl text-black"
            value={query} onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:bg-black transition-all">
            {loading ? '...' : 'SEARCH'}
          </button>
        </form>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <div key={book.id} className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all flex flex-col">
            <div className="aspect-[3/4] mb-4 overflow-hidden rounded-2xl bg-gray-50 shadow-inner">
              <img 
                src={book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150'} 
                className="w-full h-full object-cover" alt="cover"
              />
            </div>
            <h2 className="font-bold text-lg line-clamp-1 mb-4">{book.volumeInfo.title}</h2>
            
            {/* 4 Action Buttons */}
            <div className="grid grid-cols-1 gap-2">
              <button onClick={() => openModal(book, 'read')} className="w-full bg-blue-600 text-white text-[10px] font-bold py-3 rounded-xl hover:bg-blue-700">
                📖 READ THE BOOK
              </button>
              
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => openModal(book, 'summary')} className="bg-gray-800 text-white text-[10px] font-bold py-3 rounded-xl hover:bg-black">
                  📝 SUMMARY
                </button>
                <button onClick={() => openModal(book, 'points')} className="bg-gray-100 text-black text-[10px] font-bold py-3 rounded-xl hover:bg-gray-200 border border-gray-200">
                  💡 KEY POINTS
                </button>
              </div>

              <a 
                href={`https://www.amazon.com/s?k=${encodeURIComponent(book.volumeInfo.title)}`} 
                target="_blank" className="block text-center bg-yellow-400 text-black text-[10px] font-bold py-3 rounded-xl hover:bg-yellow-500"
              >
                🛒 BUY ON AMAZON
              </a>
            </div>
          </div>
        ))}
      </main>

      {/* --- ALL-IN-ONE MODAL --- */}
      {activeBook && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[90vh]">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800 uppercase tracking-tight truncate pr-4">
                {modalType === 'read' && '📖 Preview: ' + activeBook.volumeInfo.title}
                {modalType === 'summary' && '📝 Summary: ' + activeBook.volumeInfo.title}
                {modalType === 'points' && '💡 Key Insights'}
              </h3>
              <button onClick={() => {setActiveBook(null); setModalType(null);}} className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold">CLOSE</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 text-black">
              {modalType === 'read' && (
                <iframe 
                  src={`https://books.google.com/books?id=${activeBook.id}&printsec=frontcover&output=embed`} 
                  className="w-full h-full border-none rounded-xl"
                />
              )}

              {modalType === 'summary' && (
                <div className="prose prose-blue">
                  <p className="text-lg leading-relaxed italic text-gray-700">
                    {activeBook.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "") || "Summary is not available for this specific title."}
                  </p>
                </div>
              )}

              {modalType === 'points' && (
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-blue-600">Main Takeaways:</h4>
                  <ul className="space-y-3">
                    {activeBook.volumeInfo.description 
                      ? activeBook.volumeInfo.description.split('. ').slice(0, 5).map((point, i) => (
                          <li key={i} className="flex items-start gap-3 bg-blue-50 p-4 rounded-2xl border border-blue-100">
                            <span className="text-blue-600 font-bold">0{i+1}.</span>
                            <span>{point.replace(/<\/?[^>]+(>|$)/g, "")}.</span>
                          </li>
                        ))
                      : <li className="text-gray-400 italic">No key points found.</li>
                    }
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from 'react';

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en');
  const [activeBook, setActiveBook] = useState(null);
  const [modalType, setModalType] = useState(null); // Fixed: Defined modalType state

  const searchBooks = async (e) => {
    if (e) e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=${lang}&maxResults=12`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Har book ke liye Deep Insights generator
  const getExpertInsights = (book) => {
    const rawDesc = book.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "") || "";
    
    if (rawDesc.length < 50) {
      return [{ head: "Overview", text: "Is book ke patterns suggest karte hain ki ye vishay ki barikiyon par focus karti hai." }];
    }

    const sentences = rawDesc.split(/[.!?]+\s+/).filter(s => s.length > 40).slice(0, 8);
    const themes = ["Core Philosophy", "Strategic Action", "Critical Insight", "Mindset Shift", "Practical Step", "Golden Rule"];

    return sentences.map((s, i) => ({
      head: themes[i] || `Insight ${i + 1}`,
      text: s.trim() + "."
    }));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', padding: '20px', color: '#000', fontFamily: 'sans-serif' }}>
      
      {/* Search Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: '900' }}>BRIGHTWAY <span style={{ color: '#2563eb' }}>LIBRARY</span></h1>
        <form onSubmit={searchBooks} style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <input 
            type="text" placeholder="Search any book..." 
            value={query} onChange={(e) => setQuery(e.target.value)}
            style={{ padding: '12px', width: '300px', borderRadius: '10px', border: '1px solid #ddd' }}
          />
          <button type="submit" style={{ padding: '12px 25px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
            {loading ? '...' : 'SEARCH'}
          </button>
        </form>
      </div>

      {/* Books Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto' }}>
        {books.map((book) => (
          <div key={book.id} style={{ border: '1px solid #eee', borderRadius: '20px', padding: '15px', textAlign: 'center' }}>
            <img src={book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:')} style={{ width: '100%', borderRadius: '10px' }} alt="book" />
            <h3 style={{ fontSize: '16px', margin: '15px 0' }}>{book.volumeInfo.title}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button onClick={() => { setActiveBook(book); setModalType('read'); }} style={{ padding: '10px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '12px' }}>📖 READ THE BOOK</button>
              <button onClick={() => { setActiveBook(book); setModalType('points'); }} style={{ padding: '10px', backgroundColor: '#f3f4f6', color: '#000', borderRadius: '8px', border: '1px solid #ddd', cursor: 'pointer', fontSize: '12px' }}>💡 DEEP INSIGHTS</button>
              <a href={`https://www.amazon.com/s?k=${encodeURIComponent(book.volumeInfo.title)}`} target="_blank" style={{ padding: '10px', backgroundColor: '#fbbf24', borderRadius: '8px', textDecoration: 'none', color: '#000', fontSize: '12px', fontWeight: 'bold' }}>🛒 AMAZON</a>
            </div>
          </div>
        ))}
      </div>

      {/* Expert Modal */}
      {activeBook && modalType && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', width: '90%', maxWidth: '800px', height: '80vh', borderRadius: '25px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '15px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>{modalType === 'points' ? 'Deep Insights' : 'Reader'}</span>
              <button onClick={() => { setActiveBook(null); setModalType(null); }} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '5px 15px', borderRadius: '8px', cursor: 'pointer' }}>CLOSE</button>
            </div>
            
            <div style={{ flex: 1, padding: '25px', overflowY: 'auto' }}>
              {modalType === 'read' ? (
                <iframe src={`https://books.google.com/books?id=${activeBook.id}&printsec=frontcover&output=embed`} style={{ width: '100%', height: '100%', border: 'none' }} />
              ) : (
                <div style={{ display: 'grid', gap: '15px' }}>
                  {getExpertInsights(activeBook).map((insight, i) => (
                    <div key={i} style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', borderLeft: '5px solid #2563eb' }}>
                      <h4 style={{ margin: '0 0 5px 0', color: '#2563eb', textTransform: 'uppercase', fontSize: '13px' }}>{insight.head}</h4>
                      <p style={{ margin: 0, lineHeight: '1.6' }}>{insight.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from 'react';

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en');
  const [activeBook, setActiveBook] = useState(null);
  const [modalType, setModalType] = useState(null);

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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', padding: '20px', fontFamily: 'sans-serif', color: '#000' }}>
      
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '14px' }}>✨ BRIGHTWAY LIBRARY WELCOMES YOU ✨</p>
        <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '10px 0' }}>BRIGHTWAY <span style={{ color: '#2563eb' }}>LIBRARY</span></h1>
        
        <form onSubmit={searchBooks} style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
          <input 
            type="text" placeholder="Search any book..." 
            value={query} onChange={(e) => setQuery(e.target.value)}
            style={{ padding: '10px 20px', width: '300px', borderRadius: '8px', border: '1px solid #ddd' }}
          />
          <button type="submit" style={{ padding: '10px 30px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            {loading ? '...' : 'SEARCH'}
          </button>
        </form>
      </div>

      {/* Grid of Books */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        {books.map((book) => (
          <div key={book.id} style={{ border: '1px solid #eee', borderRadius: '15px', padding: '15px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <img 
              src={book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150'} 
              style={{ width: '100%', borderRadius: '10px', marginBottom: '15px' }} 
              alt="book"
            />
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', height: '40px', overflow: 'hidden' }}>{book.volumeInfo.title}</h3>
            
            {/* Buttons Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                onClick={() => { setActiveBook(book); setModalType('read'); }}
                style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
                📖 READ THE BOOK
              </button>
              
              <div style={{ display: 'flex', gap: '5px' }}>
                <button 
                  onClick={() => { setActiveBook(book); setModalType('summary'); }}
                  style={{ flex: 1, backgroundColor: '#1f2937', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px' }}>
                  📝 SUMMARY
                </button>
                <button 
                  onClick={() => { setActiveBook(book); setModalType('points'); }}
                  style={{ flex: 1, backgroundColor: '#f3f4f6', color: '#000', border: '1px solid #ddd', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px' }}>
                  💡 KEY POINTS
                </button>
              </div>

              <a 
                href={`https://www.amazon.com/s?k=${encodeURIComponent(book.volumeInfo.title)}`} 
                target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none', backgroundColor: '#fbbf24', color: '#000', padding: '10px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px' }}>
                🛒 BUY ON AMAZON
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {activeBook && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', width: '90%', maxWidth: '900px', height: '80vh', borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '15px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb' }}>
              <strong style={{ fontSize: '14px' }}>{activeBook.volumeInfo.title}</strong>
              <button onClick={() => { setActiveBook(null); setModalType(null); }} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>CLOSE</button>
            </div>
            
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
              {modalType === 'read' && (
                <iframe 
                  src={`https://books.google.com/books?id=${activeBook.id}&printsec=frontcover&output=embed`} 
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              )}
              {modalType === 'summary' && (
                <p style={{ lineHeight: '1.6', fontSize: '16px', color: '#374151' }}>
                  {activeBook.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "") || "Summary not available."}
                </p>
              )}
              {modalType === 'points' && (
                <ul style={{ paddingLeft: '20px' }}>
                  {(activeBook.volumeInfo.description?.split('. ').slice(0, 5) || ["Points not found"]).map((pt, i) => (
                    <li key={i} style={{ marginBottom: '15px', color: '#1f2937' }}><strong>0{i+1}.</strong> {pt.replace(/<\/?[^>]+(>|$)/g, "")}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import React, { useState, useEffect } from 'react';
import Newsstand from './components/Newsstand'; 

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [lang, setLang] = useState('en');
  const [activeBook, setActiveBook] = useState(null);
  const [modalType, setModalType] = useState(null); // 'dna' or 'read'
  const [contentType, setContentType] = useState('books');

  const getBookDNA = (book) => {
    const desc = book.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "") || "Analyzing deep insights... Knowledge DNA is being extracted.";
    const points = desc.split(/[.!?]+\s+/).filter(s => s.length > 30).slice(0, 4);
    const labels = ["🎯 Core Point", "🚀 Strategy", "⚠️ Warning", "💎 Wisdom"];
    return points.map((p, i) => ({ label: labels[i], text: p }));
  };

  const searchContent = async () => {
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query || 'bestseller'}&langRestrict=${lang}&maxResults=15`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { if(contentType === 'books') searchContent(); }, [lang, contentType]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0f10', color: '#f5ebe0' }}>
      {/* Navbar */}
      <nav style={{ padding: '20px 5%', background: '#261a14', borderBottom: '6px solid #d4a373', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#d4a373', margin: 0 }}>BRIGHTWAY LIBRARY</h1>
        <div style={{ display: 'flex', background: '#1a120b', borderRadius: '30px', padding: '5px' }}>
          <button onClick={() => setContentType('books')} style={{ padding: '8px 20px', borderRadius: '25px', border: 'none', background: contentType === 'books' ? '#d4a373' : 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>BOOKS</button>
          <button onClick={() => setContentType('news')} style={{ padding: '8px 20px', borderRadius: '25px', border: 'none', background: contentType === 'news' ? '#d4a373' : 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>NEWS</button>
        </div>
      </nav>

      <main style={{ padding: '40px 5%' }}>
        {contentType === 'books' ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <input type="text" placeholder="Search Book DNA..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && searchContent()}
                style={{ width: '300px', padding: '12px', borderRadius: '25px 0 0 25px', border: '1px solid #d4a373', background: '#261a14', color: '#fff' }} />
              <button onClick={searchContent} style={{ padding: '12px 25px', borderRadius: '0 25px 25px 0', border: 'none', background: '#d4a373', fontWeight: 'bold', cursor: 'pointer' }}>SEARCH</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '50px' }}>
              {books.map(book => (
                <div key={book.id} style={{ textAlign: 'center' }}>
                  <img src={book.volumeInfo.imageLinks?.thumbnail} style={{ width: '100%', borderRadius: '10px', boxShadow: '10px 10px 20px rgba(0,0,0,0.5)' }} />
                  <h4 style={{ fontSize: '14px', margin: '15px 0' }}>{book.volumeInfo.title}</h4>
                  <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                    <button onClick={() => { setActiveBook(book); setModalType('dna'); }} style={{ padding: '8px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '10px' }}>AI DNA</button>
                    <button onClick={() => { setActiveBook(book); setModalType('read'); }} style={{ padding: '8px', background: '#fff', color: '#000', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '10px' }}>READ</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Newsstand />
        )}
      </main>

      {/* Feature Modal */}
      {activeBook && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', color: '#000', width: '100%', maxWidth: '800px', borderRadius: '15px', padding: '25px', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3>{activeBook.volumeInfo.title}</h3>
              <button onClick={() => setActiveBook(null)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer' }}>CLOSE</button>
            </div>
            {modalType === 'dna' ? (
              <div>
                {getBookDNA(activeBook).map((item, i) => (
                  <div key={i} style={{ padding: '15px', background: '#f0f7ff', marginBottom: '10px', borderLeft: '5px solid #3b82f6' }}>
                    <strong>{item.label}:</strong> {item.text}
                  </div>
                ))}
              </div>
            ) : (
              <iframe src={`https://books.google.com/books?id=${activeBook.id}&printsec=frontcover&output=embed`} style={{ width: '100%', height: '500px', border: 'none' }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

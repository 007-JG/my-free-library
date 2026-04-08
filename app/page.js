"use client";

import React, { useState, useEffect } from 'react';

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en');
  const [activeBook, setActiveBook] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [genre, setGenre] = useState('All');

  // 1. Full Language Support: Indian + International
  const allLanguages = [
    { group: "Common", langs: [{ code: 'en', name: 'English 🇺🇸' }, { code: 'hi', name: 'Hindi 🇮🇳' }] },
    { group: "Indian Regional", langs: [
      { code: 'pa', name: 'Punjabi 🇮🇳' }, { code: 'mr', name: 'Marathi 🇮🇳' }, 
      { code: 'gu', name: 'Gujarati 🇮🇳' }, { code: 'ta', name: 'Tamil 🇮🇳' }, 
      { code: 'bn', name: 'Bengali 🇮🇳' }, { code: 'ur', name: 'Urdu 🇵🇰' }
    ]},
    { group: "International", langs: [
      { code: 'fr', name: 'French 🇫🇷' }, { code: 'es', name: 'Spanish 🇪🇸' }, 
      { code: 'ar', name: 'Arabic 🇸🇦' }, { code: 'ja', name: 'Japanese 🇯🇵' }, 
      { code: 'de', name: 'German 🇩🇪' }, { code: 'ru', name: 'Russian 🇷🇺' }
    ]}
  ];

  const bookGenres = ["All", "Self-Help", "Business", "Psychology", "History", "Science", "Mystery"];

  // AI Book DNA Logic (Bina padhe sab jaanne ke liye)
  const getBookDNA = (book) => {
    const desc = book.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "") || "Detailing deep concepts of the book...";
    const points = desc.split(/[.!?]+\s+/).filter(s => s.length > 30).slice(0, 4);
    const labels = ["🎯 Core Logic", "🚀 Action Plan", "⚠️ Common Mistake", "💎 Final Wisdom"];
    return points.map((p, i) => ({ label: labels[i] || "Insight", text: p }));
  };

  const searchContent = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const q = genre === 'All' ? (query || 'trending') : `${query} subject:${genre}`;
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&langRestrict=${lang}&maxResults=24`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { searchContent(); }, [genre, lang]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0f0f', color: '#f5ebe0', fontFamily: "'Georgia', serif" }}>
      
      {/* Header with Integrated Search & International Langs */}
      <nav style={{ padding: '20px 5%', background: '#261a14', borderBottom: '5px solid #d4a373', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 'bold', color: '#d4a373' }}>BRIGHTWAY <span style={{color: '#fff'}}>LIBRARY</span></h1>
          
          <form onSubmit={searchContent} style={{ display: 'flex', background: '#1a120b', borderRadius: '30px', padding: '5px', border: '1px solid #d4a373', width: '350px' }}>
            <input 
              type="text" placeholder="Search any book DNA..." value={query} onChange={(e) => setQuery(e.target.value)}
              style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', padding: '8px 15px', outline: 'none', fontSize: '13px' }}
            />
            <button type="submit" style={{ background: '#d4a373', border: 'none', borderRadius: '25px', padding: '8px 15px', cursor: 'pointer', fontWeight: 'bold' }}>🔍</button>
          </form>

          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ background: '#1a120b', color: '#fff', border: '1px solid #d4a373', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>
            {allLanguages.map(group => (
              <optgroup label={group.group} key={group.group}>
                {group.langs.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
              </optgroup>
            ))}
          </select>
        </div>
      </nav>

      {/* Genre Filter Shelf */}
      <div style={{ background: '#1a120b', padding: '15px 5%', display: 'flex', gap: '10px', overflowX: 'auto' }}>
        {bookGenres.map(g => (
          <button key={g} onClick={() => setGenre(g)} style={{ padding: '8px 20px', borderRadius: '20px', background: genre === g ? '#d4a373' : 'transparent', color: genre === g ? '#000' : '#d4a373', border: '1px solid #d4a373', cursor: 'pointer', fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '12px' }}>{g}</button>
        ))}
      </div>

      {/* 3D Book Grid */}
      <main style={{ padding: '40px 5%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '50px' }}>
          {books.map((book) => (
            <div key={book.id} style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '100%', aspectRatio: '2/3', position: 'relative', borderRadius: '2px 10px 10px 2px', 
                boxShadow: '8px 8px 20px rgba(0,0,0,0.7)', overflow: 'hidden', cursor: 'pointer', 
                transition: 'transform 0.4s', borderLeft: '4px solid #333' 
              }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <img src={book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="cover" />
              </div>
              <h4 style={{ fontSize: '13px', margin: '15px 0', height: '35px', overflow: 'hidden', fontWeight: 'bold' }}>{book.volumeInfo.title}</h4>
              
              <div style={{ display: 'grid', gap: '5px' }}>
                <button onClick={() => { setActiveBook(book); setModalType('dna'); }} style={{ padding: '10px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px' }}>✨ AI BOOK DNA</button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                  <button onClick={() => { setActiveBook(book); setModalType('read'); }} style={{ padding: '8px', background: '#fff', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '10px' }}>READ</button>
                  <a href={book.accessInfo?.pdf?.downloadLink || `https://www.google.com/search?q=${encodeURIComponent(book.volumeInfo.title + " filetype:pdf")}`} target="_blank" style={{ textDecoration: 'none', background: '#10b981', color: '#fff', padding: '8px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold', textAlign: 'center' }}>PDF</a>
                </div>
                <a href={`https://www.amazon.com/s?k=${encodeURIComponent(book.volumeInfo.title)}`} target="_blank" style={{ textDecoration: 'none', background: '#fbbf24', color: '#000', padding: '8px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold', textAlign: 'center' }}>BUY</a>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* AI DNA Modal */}
      {activeBook && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', color: '#000', width: '100%', maxWidth: '800px', height: '80vh', borderRadius: '15px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', background: '#f8f9fa' }}>
              <h2 style={{ fontSize: '16px', margin: 0 }}>{activeBook.volumeInfo.title}</h2>
              <button onClick={() => { setActiveBook(null); setModalType(null); }} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '5px 15px', borderRadius: '5px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
              {modalType === 'read' ? (
                <iframe src={`https://books.google.com/books?id=${activeBook.id}&printsec=frontcover&output=embed`} style={{ width: '100%', height: '100%', border: 'none' }} />
              ) : (
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div style={{ textAlign: 'center', color: '#3b82f6', fontWeight: 'bold', fontSize: '22px', marginBottom: '10px' }}>💡 AI Knowledge DNA</div>
                  {getBookDNA(activeBook).map((item, i) => (
                    <div key={i} style={{ padding: '20px', background: '#f0f7ff', borderRadius: '12px', borderLeft: '6px solid #3b82f6' }}>
                      <strong style={{ color: '#3b82f6', display: 'block', marginBottom: '5px' }}>{item.label}</strong>
                      <p style={{ margin: 0, lineHeight: '1.6', fontSize: '15px' }}>{item.text}</p>
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

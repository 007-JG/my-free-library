"use client";
import React, { useState, useEffect } from 'react';
import Newsstand from './components/Newsstand'; // Newsstand file ko link kiya

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [lang, setLang] = useState('en');
  const [activeBook, setActiveBook] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [contentType, setContentType] = useState('books'); // 'books' ya 'news' ke liye switch

  // Full Languages (Indian + International)
  const allLanguages = [
    { group: "Global", langs: [
      { code: 'en', name: 'English 🇺🇸' }, { code: 'hi', name: 'Hindi 🇮🇳' }, 
      { code: 'fr', name: 'French 🇫🇷' }, { code: 'es', name: 'Spanish 🇪🇸' }, 
      { code: 'ar', name: 'Arabic 🇸🇦' }, { code: 'ja', name: 'Japanese 🇯🇵' }
    ]},
    { group: "Indian Regional", langs: [
      { code: 'pa', name: 'Punjabi 🇮🇳' }, { code: 'mr', name: 'Marathi 🇮🇳' }, 
      { code: 'gu', name: 'Gujarati 🇮🇳' }, { code: 'ta', name: 'Tamil 🇮🇳' }, 
      { code: 'bn', name: 'Bengali 🇮🇳' }
    ]}
  ];

  // AI Knowledge DNA Extraction Logic
  const getBookDNA = (book) => {
    const desc = book.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "") || "Deep knowledge extraction in progress. Core concepts are being analyzed...";
    const points = desc.split(/[.!?]+\s+/).filter(s => s.length > 25).slice(0, 4);
    const labels = ["🎯 Core Strategy", "🚀 Execution Plan", "⚠️ Common Pitfalls", "💎 Master Wisdom"];
    return points.map((p, i) => ({ label: labels[i] || "Insight", text: p }));
  };

  const searchContent = async () => {
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query || 'bestsellers'}&langRestrict=${lang}&maxResults=20`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) { console.error("Search Error:", err); }
  };

  useEffect(() => { 
    if(contentType === 'books') searchContent(); 
  }, [lang, contentType]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0f10', color: '#f5ebe0', fontFamily: "'Georgia', serif" }}>
      
      {/* 1. Universal Smart Navbar */}
      <nav style={{ padding: '20px 5%', background: '#261a14', borderBottom: '6px solid #d4a373', position: 'sticky', top: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 'bold', color: '#d4a373' }}>BRIGHTWAY <span style={{color: '#fff'}}>LIBRARY</span></h1>
        
        {/* Main Content Switcher */}
        <div style={{ display: 'flex', background: '#1a120b', borderRadius: '30px', padding: '5px', border: '1px solid #3c2a21' }}>
          <button onClick={() => setContentType('books')} style={{ padding: '10px 25px', borderRadius: '25px', border: 'none', background: contentType === 'books' ? '#d4a373' : 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>📚 BOOKS</button>
          <button onClick={() => setContentType('news')} style={{ padding: '10px 25px', borderRadius: '25px', border: 'none', background: contentType === 'news' ? '#d4a373' : 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>📰 NEWSSTAND</button>
        </div>

        <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ background: '#1a120b', color: '#fff', border: '1px solid #d4a373', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>
          {allLanguages.map(group => (
            <optgroup label={group.group} key={group.group}>
              {group.langs.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
            </optgroup>
          ))}
        </select>
      </nav>

      {/* 2. Content Display Logic */}
      <main style={{ padding: '40px 5%' }}>
        {contentType === 'books' ? (
          <div>
            {/* Search Desk */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
              <div style={{ display: 'flex', background: '#261a14', borderRadius: '40px', padding: '6px', border: '1px solid #d4a373', width: '100%', maxWidth: '500px' }}>
                <input type="text" placeholder="Search book DNA..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && searchContent()}
                  style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', padding: '10px 20px', outline: 'none' }} />
                <button onClick={searchContent} style={{ background: '#d4a373', border: 'none', borderRadius: '30px', padding: '10px 25px', fontWeight: 'bold', cursor: 'pointer' }}>SEARCH</button>
              </div>
            </div>

            {/* 3D Physical Book Shelf */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '60px 40px' }}>
              {books.map((book) => (
                <div key={book.id} style={{ textAlign: 'center' }}>
                  <div style={{ 
                    width: '100%', aspectRatio: '2/3', position: 'relative', borderRadius: '2px 12px 12px 2px', 
                    boxShadow: '10px 15px 25px rgba(0,0,0,0.6)', overflow: 'hidden', transition: '0.4s', borderLeft: '5px solid #333' 
                  }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-12px) rotateY(-5deg)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <img src={book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="cover" />
                  </div>
                  <h4 style={{ fontSize: '14px', margin: '20px 0 12px', height: '35px', overflow: 'hidden', color: '#f5ebe0' }}>{book.volumeInfo.title}</h4>
                  
                  {/* Action Buttons */}
                  <div style={{ display: 'grid', gap: '6px' }}>
                    <button onClick={() => { setActiveBook(book); setModalType('dna'); }} style={{ padding: '10px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>✨ AI BOOK DNA</button>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      <button onClick={() => { setActiveBook(book); setModalType('read'); }} style={{ padding: '8px', background: '#fff', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '11px' }}>READ</button>
                      <a href={book.accessInfo?.pdf?.downloadLink || `https://www.google.com/search?q=${encodeURIComponent(book.volumeInfo.title + " filetype:pdf")}`} target="_blank" style={{ textDecoration: 'none', background: '#10b981', color: '#fff', padding: '8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', textAlign: 'center' }}>PDF</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Newsstand Component load ho raha hai */
          <Newsstand /> 
        )}
      </main>

      {/* AI DNA & Reader Modal */}
      {activeBook && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.96)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', color: '#000', width: '100%', maxWidth: '850px', height: '85vh', borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px 30px', background: '#f8f9fa', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '18px', margin: 0, fontWeight: '900' }}>{activeBook.volumeInfo.title}</h2>
              <button onClick={() => { setActiveBook(null); setModalType(null); }} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>✕ CLOSE</button>
            </div>
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto', background: '#fff' }}>
              {modalType === 'read' ? (
                <iframe src={`https://books.google.com/books?id=${activeBook.id}&printsec=frontcover&output=embed`} style={{ width: '100%', height: '100%', border: 'none' }} />
              ) : (
                <div style={{ display: 'grid', gap: '20px' }}>
                  <div style={{ textAlign: 'center', color: '#3b82f6', fontSize: '24px', fontWeight: 'bold', borderBottom: '2px solid #3b82f6', paddingBottom: '10px' }}>💡 AI KNOWLEDGE EXTRACTION</div>
                  {getBookDNA(activeBook).map((item, i) => (
                    <div key={i} style={{ padding: '25px', background: '#f0f7ff', borderRadius: '15px', borderLeft: '8px solid #3b82f6' }}>
                      <strong style={{ color: '#3b82f6', display: 'block', fontSize: '18px', marginBottom: '8px' }}>{item.label}</strong>
                      <p style={{ margin: 0, lineHeight: '1.7', fontSize: '16px', color: '#333' }}>{item.text}</p>
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

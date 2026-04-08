"use client";
import React, { useState, useEffect } from 'react';
// IMPORT FIX: Sahi path aur Capital 'N' ka dhyan rakhein
import Newsstand from './components/Newsstand'; 

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [lang, setLang] = useState('en');
  const [activeBook, setActiveBook] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [contentType, setContentType] = useState('books'); // Default view 'books' hai

  const allLanguages = [
    { group: "Global", langs: [
      { code: 'en', name: 'English 🇺🇸' }, { code: 'hi', name: 'Hindi 🇮🇳' }, 
      { code: 'fr', name: 'French 🇫🇷' }, { code: 'es', name: 'Spanish 🇪🇸' }, 
      { code: 'ar', name: 'Arabic 🇸🇦' }, { code: 'ja', name: 'Japanese 🇯🇵' }
    ]},
    { group: "Indian", langs: [
      { code: 'pa', name: 'Punjabi 🇮🇳' }, { code: 'mr', name: 'Marathi 🇮🇳' }, 
      { code: 'gu', name: 'Gujarati 🇮🇳' }, { code: 'ta', name: 'Tamil 🇮🇳' }, 
      { code: 'bn', name: 'Bengali 🇮🇳' }
    ]}
  ];

  // AI DNA Extraction (Bina padhe book ka nichod)
  const getBookDNA = (book) => {
    const desc = book.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "") || "Analyzing deep concepts... Knowledge DNA extraction in progress.";
    const points = desc.split(/[.!?]+\s+/).filter(s => s.length > 25).slice(0, 4);
    const labels = ["🎯 Core Logic", "🚀 Action Plan", "⚠️ Common Mistake", "💎 Final Wisdom"];
    return points.map((p, i) => ({ label: labels[i], text: p }));
  };

  const searchContent = async () => {
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query || 'trending'}&langRestrict=${lang}&maxResults=16`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { 
    if(contentType === 'books') searchContent(); 
  }, [lang, contentType]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0f10', color: '#f5ebe0', fontFamily: 'serif' }}>
      
      {/* 1. Header with Switcher */}
      <nav style={{ padding: '20px 5%', background: '#261a14', borderBottom: '6px solid #d4a373', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <h1 style={{ color: '#d4a373', margin: 0, fontSize: '28px' }}>BRIGHTWAY LIBRARY</h1>
        
        {/* Books & News Switcher */}
        <div style={{ display: 'flex', background: '#1a120b', borderRadius: '30px', padding: '5px', border: '1px solid #3c2a21' }}>
          <button onClick={() => setContentType('books')} style={{ padding: '10px 25px', borderRadius: '25px', border: 'none', background: contentType === 'books' ? '#d4a373' : 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>BOOKS</button>
          <button onClick={() => setContentType('news')} style={{ padding: '10px 25px', borderRadius: '25px', border: 'none', background: contentType === 'news' ? '#d4a373' : 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>NEWSSTAND</button>
        </div>

        <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ background: '#1a120b', color: '#fff', border: '1px solid #d4a373', padding: '10px', borderRadius: '8px' }}>
          {allLanguages.map(g => (
            <optgroup label={g.group} key={g.group}>{g.langs.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}</optgroup>
          ))}
        </select>
      </nav>

      {/* 2. Content Logic */}
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
                  <div style={{ width: '100%', aspectRatio: '2/3', boxShadow: '10px 10px 20px rgba(0,0,0,0.5)', borderRadius: '2px 10px 10px 2px', overflow: 'hidden', borderLeft: '4px solid #333' }}>
                    <img src={book.volumeInfo.imageLinks?.thumbnail} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h4 style={{ fontSize: '14px', margin: '15px 0', height: '35px', overflow: 'hidden' }}>{book.volumeInfo.title}</h4>
                  <button onClick={() => { setActiveBook(book); setModalType('dna'); }} style={{ width: '100%', padding: '10px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>✨ AI BOOK DNA</button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Agar contentType 'news' hai, toh Newsstand.js load hoga */
          <Newsstand /> 
        )}
      </main>

      {/* 3. AI DNA Modal */}
      {activeBook && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', color: '#000', width: '100%', maxWidth: '700px', borderRadius: '15px', padding: '30px', maxHeight: '80vh', overflowY: 'auto' }}>
            <h2 style={{ color: '#3b82f6', marginBottom: '20px' }}>{activeBook.volumeInfo.title} - AI Knowledge DNA</h2>
            {getBookDNA(activeBook).map((item, i) => (
              <div key={i} style={{ marginBottom: '15px', padding: '15px', background: '#f0f7ff', borderRadius: '10px', borderLeft: '5px solid #3b82f6' }}>
                <strong style={{ color: '#3b82f6' }}>{item.label}:</strong>
                <p style={{ margin: '5px 0 0' }}>{item.text}</p>
              </div>
            ))}
            <button onClick={() => setActiveBook(null)} style={{ background: '#ef4444', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>CLOSE</button>
          </div>
        </div>
      )}
    </div>
  );
}

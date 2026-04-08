"use client";

import React, { useState } from 'react';

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en'); 
  const [activeBook, setActiveBook] = useState(null);
  const [modalType, setModalType] = useState(null);

  // International Languages List
  const languages = [
    { code: 'en', name: 'English 🇺🇸' },
    { code: 'hi', name: 'Hindi 🇮🇳' },
    { code: 'es', name: 'Spanish 🇪🇸' },
    { code: 'fr', name: 'French 🇫🇷' },
    { code: 'de', name: 'German 🇩🇪' },
    { code: 'ar', name: 'Arabic 🇦🇪' },
    { code: 'ja', name: 'Japanese 🇯🇵' },
    { code: 'ru', name: 'Russian 🇷🇺' },
    { code: 'pt', name: 'Portuguese 🇵🇹' },
    { code: 'zh', name: 'Chinese 🇨🇳' },
    { code: 'it', name: 'Italian 🇮🇹' },
    { code: 'ko', name: 'Korean 🇰🇷' }
  ];

  const searchBooks = async (e) => {
    if (e) e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      // langRestrict parameter har language ke liye filter lagata hai
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=${lang}&maxResults=16`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getExpertInsights = (book) => {
    const rawDesc = book.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "") || "";
    if (rawDesc.length < 50) return [{ head: "Global Insight", text: "This book offers a deep dive into its subject matter from a cross-cultural perspective." }];
    
    const sentences = rawDesc.split(/[.!?]+\s+/).filter(s => s.length > 40).slice(0, 8);
    const themes = ["Universal Truth", "Actionable Wisdom", "Cultural Context", "Mastery Path", "Key Strategy", "Life Lesson"];
    
    return sentences.map((s, i) => ({
      head: themes[i] || `Insight ${i + 1}`,
      text: s.trim() + "."
    }));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', color: '#1a1a1a', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Top Banner */}
      <div style={{ backgroundColor: '#2563eb', color: '#fff', padding: '10px', textAlign: 'center', fontSize: '13px', fontWeight: 'bold', letterSpacing: '1px' }}>
        🌍 GLOBAL EDITION: ACCESSING KNOWLEDGE IN {languages.find(l => l.code === lang)?.name.toUpperCase()}
      </div>

      {/* Header */}
      <header style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p style={{ color: '#2563eb', fontWeight: 'bold', marginBottom: '10px' }}>✨ BRIGHTWAY LIBRARY WELCOMES YOU ✨</p>
        <h1 style={{ fontSize: '50px', fontWeight: '900', margin: 0, letterSpacing: '-2px' }}>BRIGHTWAY <span style={{ color: '#2563eb' }}>LIBRARY</span></h1>
        
        <form onSubmit={searchBooks} style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
          <div style={{ position: 'relative' }}>
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              style={{ padding: '15px 40px 15px 20px', borderRadius: '18px', border: '2px solid #eee', appearance: 'none', backgroundColor: '#fff', fontWeight: 'bold', cursor: 'pointer', outline: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
            >
              {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
            </select>
          </div>

          <input 
            type="text" 
            placeholder="Search books, authors..." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            style={{ padding: '15px 25px', width: '100%', maxWidth: '400px', borderRadius: '18px', border: '2px solid #eee', fontSize: '16px', outline: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
          />
          
          <button type="submit" style={{ padding: '15px 40px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '18px', cursor: 'pointer', fontWeight: '900', transition: 'transform 0.2s' }}>
            {loading ? 'LOADING...' : 'EXPLORE'}
          </button>
        </form>
      </header>

      {/* Grid */}
      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', maxWidth: '1300px', margin: '0 auto', padding: '0 20px 60px' }}>
        {books.map((book) => (
          <div key={book.id} style={{ backgroundColor: '#fff', borderRadius: '30px', padding: '20px', border: '1px solid #f0f0f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', transition: 'transform 0.3s' }}>
            <div style={{ position: 'relative', aspectRatio: '2/3', borderRadius: '20px', overflow: 'hidden', marginBottom: '20px', backgroundColor: '#eee' }}>
              <img 
                src={book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150'} 
                style={{ width: '100%', height: '100%', objectCover: 'cover' }} 
                alt="cover" 
              />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 5px 0', height: '45px', overflow: 'hidden' }}>{book.volumeInfo.title}</h3>
            <p style={{ color: '#2563eb', fontSize: '13px', fontWeight: 'bold', marginBottom: '20px' }}>{book.volumeInfo.authors?.[0] || 'International Author'}</p>
            
            <div style={{ display: 'grid', gap: '8px' }}>
              <button onClick={() => { setActiveBook(book); setModalType('read'); }} style={{ padding: '12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>📖 READ CHAPTER</button>
              <button onClick={() => { setActiveBook(book); setModalType('points'); }} style={{ padding: '12px', backgroundColor: '#f1f5f9', color: '#1e293b', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>💡 DEEP INSIGHTS</button>
              <a href={`https://www.amazon.com/s?k=${encodeURIComponent(book.volumeInfo.title)}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', backgroundColor: '#fbbf24', color: '#000', padding: '12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px', textAlign: 'center' }}>🛒 AMAZON</a>
            </div>
          </div>
        ))}
      </main>

      {/* International Modal */}
      {activeBook && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '900px', height: '85vh', borderRadius: '35px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px 30px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: '14px', color: '#666' }}>GLOBAL READER MODE</strong>
              <button onClick={() => { setActiveBook(null); setModalType(null); }} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>CLOSE</button>
            </div>
            
            <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
              {modalType === 'read' ? (
                <iframe src={`https://books.google.com/books?id=${activeBook.id}&printsec=frontcover&output=embed`} style={{ width: '100%', height: '100%', border: 'none' }} />
              ) : (
                <div style={{ display: 'grid', gap: '15px' }}>
                  {getExpertInsights(activeBook).map((insight, i) => (
                    <div key={i} style={{ padding: '25px', backgroundColor: '#f8fafc', borderRadius: '25px', borderLeft: '6px solid #2563eb' }}>
                      <h4 style={{ margin: '0 0 5px 0', color: '#2563eb', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>{insight.head}</h4>
                      <p style={{ margin: 0, lineHeight: '1.6', fontWeight: '500', color: '#334155' }}>{insight.text}</p>
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

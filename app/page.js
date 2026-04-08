"use client";

import React, { useState } from 'react';

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en'); 
  const [activeBook, setActiveBook] = useState(null);
  const [modalType, setModalType] = useState(null); // Fixed the ReferenceError

  const uiLabels = {
    en: { brand: "BRIGHTWAY LIBRARY", welcome: "Welcome to Brightway Library", placeholder: "Search millions of books...", btnSearch: "Search", insightBtn: "💡 KEY POINTS", readBtn: "📖 READ BOOK", downloadBtn: "📥 PDF", buyBtn: "🛒 AMAZON", banner: "Read Free Library Books Online" },
    hi: { brand: "ब्राइटवे लाइब्रेरी", welcome: "ब्राइटवे लाइब्रेरी में आपका स्वागत है", placeholder: "लाखों किताबें खोजें...", btnSearch: "खोजें", insightBtn: "💡 मुख्य बातें", readBtn: "📖 पढ़ें", downloadBtn: "📥 PDF", buyBtn: "🛒 अमेज़न", banner: "मुफ्त किताबें ऑनलाइन पढ़ें" },
    // Yahan baki languages upar wale format me add ho jayengi
  };

  const languages = [
    { code: 'en', name: 'English' }, { code: 'hi', name: 'Hindi' }, { code: 'pa', name: 'Punjabi' },
    { code: 'mr', name: 'Marathi' }, { code: 'gu', name: 'Gujarati' }, { code: 'ta', name: 'Tamil' },
    { code: 'ur', name: 'Urdu' }, { code: 'ar', name: 'Arabic' }
  ];

  const t = uiLabels[lang] || uiLabels['en'];

  const searchBooks = async (e) => {
    if (e) e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=${lang}&maxResults=20`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#efebe1', color: '#333', fontFamily: '"Lucida Grande",Verdana,Geneva,Helvetica,Arial,sans-serif' }}>
      
      {/* Top Bar like Open Library */}
      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #ccc', padding: '10px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#000' }}>BRIGHTWAY <span style={{color: '#2563eb'}}>LIBRARY</span></h1>
          </div>
          
          <form onSubmit={searchBooks} style={{ display: 'flex', flex: 1, maxWidth: '600px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
            <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ padding: '8px', border: 'none', background: '#f9f9f9', borderRight: '1px solid #ccc', cursor: 'pointer', outline: 'none' }}>
              {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
            </select>
            <input 
              type="text" placeholder={t.placeholder} value={query} onChange={(e) => setQuery(e.target.value)}
              style={{ padding: '10px', flex: 1, border: 'none', outline: 'none' }}
            />
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#f9f9f9', border: 'none', cursor: 'pointer', borderLeft: '1px solid #ccc' }}>🔍</button>
          </form>

          <div style={{ display: 'flex', gap: '10px' }}>
             <button style={{ padding: '8px 15px', backgroundColor: '#0074b1', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Sign Up</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div style={{ backgroundColor: '#fff', padding: '40px 20px', borderBottom: '1px solid #ccc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'left' }}>
           <h2 style={{ fontSize: '18px', color: '#0074b1', margin: '0 0 10px 0' }}>{t.banner}</h2>
           <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #eee', maxWidth: '400px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Read Free Library Books Online</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>Millions of books available through Brightway Digital Lending.</p>
           </div>
        </div>
      </div>

      {/* Book Grid */}
      <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <h3 style={{ borderBottom: '2px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>Search Results</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '30px' }}>
          {books.map((book) => (
            <div key={book.id} style={{ textAlign: 'center' }}>
              <div style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '10px', backgroundColor: '#fff' }}>
                <img src={book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150'} style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover' }} alt="cover" />
              </div>
              <h4 style={{ fontSize: '14px', margin: '5px 0', height: '35px', overflow: 'hidden', fontWeight: 'bold' }}>{book.volumeInfo.title}</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <button onClick={() => { setActiveBook(book); setModalType('read'); }} style={{ padding: '8px', backgroundColor: '#0074b1', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {t.readBtn}
                </button>
                <button onClick={() => { setActiveBook(book); setModalType('points'); }} style={{ padding: '6px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>
                  {t.insightBtn}
                </button>
                <div style={{display: 'flex', gap: '5px'}}>
                   <a href={book.accessInfo?.pdf?.downloadLink || `https://www.google.com/search?q=${encodeURIComponent(book.volumeInfo.title + " filetype:pdf")}`} target="_blank" style={{ flex: 1, textDecoration: 'none', backgroundColor: '#eee', color: '#333', padding: '5px', borderRadius: '4px', fontSize: '10px', border: '1px solid #ccc', textAlign: 'center' }}>{t.downloadBtn}</a>
                   <a href={`https://www.amazon.com/s?k=${encodeURIComponent(book.volumeInfo.title)}`} target="_blank" style={{ flex: 1, textDecoration: 'none', backgroundColor: '#eee', color: '#333', padding: '5px', borderRadius: '4px', fontSize: '10px', border: '1px solid #ccc', textAlign: 'center' }}>{t.buyBtn}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal Section */}
      {activeBook && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '900px', height: '85vh', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '15px 20px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9f9f9' }}>
              <h2 style={{ fontSize: '18px', margin: 0 }}>{activeBook.volumeInfo.title}</h2>
              <button onClick={() => { setActiveBook(null); setModalType(null); }} style={{ padding: '5px 15px', cursor: 'pointer' }}>{t.close}</button>
            </div>
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
              {modalType === 'read' ? (
                <iframe src={`https://books.google.com/books?id=${activeBook.id}&printsec=frontcover&output=embed`} style={{ width: '100%', height: '100%', border: 'none' }} />
              ) : (
                <div style={{ padding: '10px' }}>
                  <h3 style={{color: '#0074b1'}}>Book DNA (Key Points)</h3>
                  <p style={{lineHeight: '1.6'}}>{activeBook.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "") || "No description available."}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

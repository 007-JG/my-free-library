"use client";

import React, { useState, useEffect } from 'react';

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en');
  const [activeBook, setActiveBook] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [contentType, setContentType] = useState('books'); 
  const [genre, setGenre] = useState('All');

  // 1. Full Language Support Restored
  const uiLabels = {
    en: { brand: "BRIGHTWAY LIBRARY", welcome: "Future of Smart Reading", placeholder: "Search for book DNA...", btnSearch: "SEARCH", insightBtn: "💡 DNA", readBtn: "📖 READ", downloadBtn: "📥 PDF", buyBtn: "🛒 AMAZON", close: "CLOSE", banner: "GLOBAL EDITION" },
    hi: { brand: "ब्राइटवे लाइब्रेरी", welcome: "स्मार्ट रीडिंग का भविष्य", placeholder: "किताब खोजें...", btnSearch: "खोजें", insightBtn: "💡 सार", readBtn: "📖 पढ़ें", downloadBtn: "📥 PDF", buyBtn: "🛒 अमेज़न", close: "बंद करें", banner: "वैश्विक संस्करण" },
    pa: { brand: "ਬ੍ਰਾਈਟਵੇ ਲਾਇਬ੍ਰੇਰੀ", welcome: "ਸਮਾਰਟ ਰੀਡਿੰਗ ਦਾ ਭਵਿੱਖ", placeholder: "ਖੋਜੋ...", btnSearch: "ਖੋਜ", insightBtn: "💡 ਸਾਰ", readBtn: "📖 ਪੜ੍ਹੋ", downloadBtn: "📥 PDF", buyBtn: "🛒 ਐਮਾਜ਼ਾਨ", close: "ਬੰਦ ਕਰੋ", banner: "ਗਲੋਬਲ ਐਡੀਸ਼ਨ" }
  };

  const languages = [
    { code: 'en', name: 'English 🇺🇸' }, { code: 'hi', name: 'Hindi 🇮🇳' }, { code: 'pa', name: 'Punjabi 🇮🇳' },
    { code: 'mr', name: 'Marathi 🇮🇳' }, { code: 'gu', name: 'Gujarati 🇮🇳' }, { code: 'ta', name: 'Tamil 🇮🇳' },
    { code: 'ur', name: 'Urdu 🇵🇰' }, { code: 'ar', name: 'Arabic 🇸🇦' }, { code: 'fr', name: 'French 🇫🇷' }
  ];

  const genres = ["All", "Self-Help", "Business", "Fiction", "Science", "History", "Biography"];
  
  const newspapers = [
    { id: 1, title: "The Times of India", editor: "Vineet Jain", link: "https://timesofindia.indiatimes.com/", logo: "🇮🇳" },
    { id: 2, title: "The Hindu", editor: "Suresh Nambath", link: "https://www.thehindu.com/", logo: "📰" },
    { id: 3, title: "The New York Times", editor: "Joseph Kahn", link: "https://www.nytimes.com/", logo: "🇺🇸" }
  ];

  const t = uiLabels[lang] || uiLabels['en'];

  const searchContent = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const searchQuery = genre === 'All' ? (query || 'trending') : `${query} subject:${genre}`;
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&langRestrict=${lang}&maxResults=20`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { searchContent(); }, [genre, lang]);

  const getBookDNA = (book) => {
    const rawDesc = book.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "") || "";
    const categories = ["Core Purpose 🎯", "Main Strategy 🚀", "Hidden Trap ⚠️", "Final Wisdom 💎"];
    const sentences = rawDesc.split(/[.!?]+\s+/).filter(s => s.length > 40).slice(0, 4);
    return sentences.map((s, i) => ({ head: categories[i] || "Insight", text: s.trim() + "." }));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'Arial, sans-serif', direction: (lang === 'ar' || lang === 'ur') ? 'rtl' : 'ltr' }}>
      
      {/* Top Banner */}
      <div style={{ backgroundColor: '#2563eb', color: '#fff', padding: '10px', textAlign: 'center', fontSize: '11px', fontWeight: '900', letterSpacing: '2px' }}>
        {t.banner} | {t.brand}
      </div>

      {/* Netflix-Style Navbar */}
      <nav style={{ padding: '20px 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.9)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #222' }}>
        <h1 style={{ color: '#2563eb', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>BRIGHTWAY <span style={{color:'#fff'}}>LIBRARY</span></h1>
        
        <div style={{ display: 'flex', gap: '20px', fontWeight: 'bold' }}>
          <span onClick={() => setContentType('books')} style={{ cursor: 'pointer', color: contentType === 'books' ? '#2563eb' : '#fff' }}>Books</span>
          <span onClick={() => setContentType('news')} style={{ cursor: 'pointer', color: contentType === 'news' ? '#2563eb' : '#fff' }}>Newspapers</span>
        </div>

        <form onSubmit={searchContent} style={{ display: 'flex', gap: '10px' }}>
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ padding: '8px', borderRadius: '5px', background: '#222', color: '#fff', border: '1px solid #444' }}>
            {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
          </select>
          <input 
            type="text" placeholder={t.placeholder} value={query} onChange={(e) => setQuery(e.target.value)}
            style={{ padding: '8px 15px', borderRadius: '5px', border: '1px solid #444', background: '#111', color: '#fff', outline: 'none' }}
          />
        </form>
      </nav>

      {/* Genre Filter */}
      {contentType === 'books' && (
        <div style={{ padding: '20px 5%', display: 'flex', gap: '10px', overflowX: 'auto' }}>
          {genres.map(g => (
            <button key={g} onClick={() => setGenre(g)} style={{ padding: '8px 20px', borderRadius: '20px', background: genre === g ? '#fff' : '#222', color: genre === g ? '#000' : '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>{g}</button>
          ))}
        </div>
      )}

      {/* Main Grid */}
      <main style={{ padding: '20px 5%' }}>
        {contentType === 'books' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '30px' }}>
            {books.map((book) => (
              <div key={book.id} style={{ background: '#111', borderRadius: '15px', padding: '15px', border: '1px solid #222' }}>
                <img src={book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150'} style={{ width: '100%', borderRadius: '10px', aspectRatio: '3/4', objectFit: 'cover' }} alt="cover" />
                <h4 style={{ fontSize: '15px', margin: '15px 0', height: '40px', overflow: 'hidden' }}>{book.volumeInfo.title}</h4>
                
                <div style={{ display: 'grid', gap: '8px' }}>
                  <button onClick={() => { setActiveBook(book); setModalType('points'); }} style={{ padding: '10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>{t.insightBtn}</button>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button onClick={() => { setActiveBook(book); setModalType('read'); }} style={{ padding: '8px', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '10px', cursor: 'pointer' }}>{t.readBtn}</button>
                    <a href={book.accessInfo?.pdf?.downloadLink || `https://www.google.com/search?q=${encodeURIComponent(book.volumeInfo.title + " filetype:pdf")}`} target="_blank" style={{ textDecoration: 'none', background: '#10b981', color: '#fff', padding: '8px', borderRadius: '8px', fontWeight: 'bold', fontSize: '10px', textAlign: 'center' }}>{t.downloadBtn}</a>
                  </div>
                  <a href={`https://www.amazon.com/s?k=${encodeURIComponent(book.volumeInfo.title)}`} target="_blank" style={{ textDecoration: 'none', background: '#fbbf24', color: '#000', padding: '8px', borderRadius: '8px', fontWeight: 'bold', fontSize: '10px', textAlign: 'center' }}>{t.buyBtn}</a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {newspapers.map((paper) => (
              <div key={paper.id} style={{ background: '#111', padding: '25px', borderRadius: '15px', border: '1px solid #222', textAlign: 'center' }}>
                <div style={{ fontSize: '40px' }}>{paper.logo}</div>
                <h3>{paper.title}</h3>
                <p style={{ color: '#888' }}>Editor: {paper.editor}</p>
                <a href={paper.link} target="_blank" style={{ display: 'block', marginTop: '15px', padding: '12px', background: '#fff', color: '#000', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>READ NOW</a>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal - DNA & Read Restored */}
      {activeBook && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', color: '#000', width: '100%', maxWidth: '850px', height: '85vh', borderRadius: '30px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{activeBook.volumeInfo.title}</h2>
              <button onClick={() => { setActiveBook(null); setModalType(null); }} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '10px', cursor: 'pointer' }}>{t.close}</button>
            </div>
            <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
              {modalType === 'read' ? (
                <iframe src={`https://books.google.com/books?id=${activeBook.id}&printsec=frontcover&output=embed`} style={{ width: '100%', height: '100%', border: 'none' }} />
              ) : (
                <div style={{ display: 'grid', gap: '15px' }}>
                  {getBookDNA(activeBook).map((dna, i) => (
                    <div key={i} style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', borderLeft: '6px solid #2563eb' }}>
                      <h4 style={{ color: '#2563eb', margin: '0 0 5px 0' }}>{dna.head}</h4>
                      <p style={{ margin: 0, lineHeight: '1.6' }}>{dna.text}</p>
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

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
  const [newsFilter, setNewsFilter] = useState('National');
  const [regionalLang, setRegionalLang] = useState('All');

  const uiLabels = {
    en: { brand: "BRIGHTWAY LIBRARY", welcome: "Step Into Your Future", placeholder: "Find your next obsession...", btnSearch: "SEARCH", insightBtn: "💡 BOOK DNA", readBtn: "📖 READ", downloadBtn: "📥 PDF", buyBtn: "🛒 AMAZON", close: "CLOSE" },
    hi: { brand: "ब्राइटवे लाइब्रेरी", welcome: "अपने भविष्य में कदम रखें", placeholder: "अपनी अगली किताब खोजें...", btnSearch: "खोजें", insightBtn: "💡 मुख्य सार", readBtn: "📖 पढ़ें", downloadBtn: "📥 PDF", buyBtn: "🛒 अमेज़न", close: "बंद करें" }
  };

  const languages = [
    { code: 'en', name: 'English' }, { code: 'hi', name: 'Hindi' }, { code: 'pa', name: 'Punjabi' },
    { code: 'mr', name: 'Marathi' }, { code: 'gu', name: 'Gujarati' }, { code: 'ta', name: 'Tamil' },
    { code: 'ur', name: 'Urdu' }, { code: 'ar', name: 'Arabic' }, { code: 'fr', name: 'French' }
  ];

  const bookGenres = ["All", "Self-Help", "Business", "Psychology", "Sci-Fi", "Mystery", "History"];

  const newspaperData = [
    { title: "The Times of India", cat: "National", lang: "English", link: "https://timesofindia.indiatimes.com/", logo: "🇮🇳" },
    { title: "The Hindu", cat: "National", lang: "English", link: "https://www.thehindu.com/", logo: "📰" },
    { title: "NY Times", cat: "International", lang: "English", link: "https://www.nytimes.com/", logo: "🇺🇸" },
    { title: "The Guardian", cat: "International", lang: "English", link: "https://www.theguardian.com/", logo: "🇬🇧" },
    { title: "Lokmat", cat: "Regional", lang: "Marathi", link: "https://www.lokmat.com/", logo: "🚩" },
    { title: "Ajit", cat: "Regional", lang: "Punjabi", link: "https://www.ajitjalandhar.com/", logo: "🌾" },
    { title: "Anandabazar", cat: "Regional", lang: "Bengali", link: "https://www.anandabazar.com/", logo: "🎨" },
    { title: "Dina Thanthi", cat: "Regional", lang: "Tamil", link: "https://www.dailythanthi.com/", logo: "⚓" },
    { title: "Dainik Jagran", cat: "National", lang: "Hindi", link: "https://www.jagran.com/", logo: "🇮🇳" }
  ];

  const t = uiLabels[lang] || uiLabels['en'];

  const searchContent = async () => {
    setLoading(true);
    try {
      const q = genre === 'All' ? (query || 'bestsellers') : `${query} subject:${genre}`;
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&langRestrict=${lang}&maxResults=24`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { if(contentType === 'books') searchContent(); }, [genre, lang]);

  const filteredNews = newspaperData.filter(paper => {
    if (newsFilter === 'Regional' && regionalLang !== 'All') return paper.lang === regionalLang;
    return paper.cat === newsFilter;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0b', color: '#e2e8f0', fontFamily: "'Playfair Display', serif" }}>
      
      {/* Immersive Header */}
      <nav style={{ padding: '25px 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: '900', letterSpacing: '-1px', color: '#fff', margin: 0 }}>BRIGHTWAY <span style={{color: '#3b82f6'}}>LIBRARY</span></h1>
        </div>

        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <div style={{ display: 'flex', background: '#1a1b1e', borderRadius: '30px', padding: '5px' }}>
            <button onClick={() => setContentType('books')} style={{ padding: '10px 25px', borderRadius: '25px', border: 'none', background: contentType === 'books' ? '#3b82f6' : 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>Books</button>
            <button onClick={() => setContentType('news')} style={{ padding: '10px 25px', borderRadius: '25px', border: 'none', background: contentType === 'news' ? '#3b82f6' : 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>Newsstand</button>
          </div>
          
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ background: 'transparent', color: '#fff', border: '1px solid #333', padding: '8px', borderRadius: '10px', outline: 'none' }}>
            {languages.map(l => <option key={l.code} value={l.code} style={{color:'#000'}}>{l.name}</option>)}
          </select>
        </div>
      </nav>

      {/* Dynamic Filter Section */}
      <section style={{ padding: '20px 5%', borderBottom: '1px solid #1a1b1e' }}>
        {contentType === 'books' ? (
          <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
            {bookGenres.map(g => (
              <button key={g} onClick={() => setGenre(g)} style={{ padding: '10px 25px', borderRadius: '12px', background: genre === g ? 'rgba(59, 130, 246, 0.1)' : 'transparent', color: genre === g ? '#3b82f6' : '#888', border: genre === g ? '1px solid #3b82f6' : '1px solid #333', cursor: 'pointer', whiteSpace: 'nowrap' }}>{g}</button>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {['National', 'International', 'Regional'].map(cat => (
              <button key={cat} onClick={() => setNewsFilter(cat)} style={{ padding: '10px 20px', background: 'none', border: 'none', borderBottom: newsFilter === cat ? '2px solid #3b82f6' : 'none', color: newsFilter === cat ? '#3b82f6' : '#888', cursor: 'pointer', fontWeight: 'bold' }}>{cat.toUpperCase()}</button>
            ))}
            {newsFilter === 'Regional' && (
              <select value={regionalLang} onChange={(e) => setRegionalLang(e.target.value)} style={{ padding: '8px', borderRadius: '8px', background: '#1a1b1e', color: '#fff', border: '1px solid #333' }}>
                <option value="All">All Regional</option>
                <option value="Marathi">Marathi</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Tamil">Tamil</option>
                <option value="Bengali">Bengali</option>
              </select>
            )}
          </div>
        )}
      </section>

      {/* Main Content Showcase */}
      <main style={{ padding: '40px 5%' }}>
        {contentType === 'books' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '50px' }}>
            {books.map((book) => (
              <div key={book.id} style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', transition: 'transform 0.4s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-15px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <img src={book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150'} style={{ width: '100%', borderRadius: '5px 15px 15px 5px', boxShadow: '-10px 10px 20px rgba(0,0,0,0.5)', borderLeft: '4px solid #1a1a1a' }} alt="book" />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '20px 0 10px', height: '40px', overflow: 'hidden' }}>{book.volumeInfo.title}</h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <button onClick={() => { setActiveBook(book); setModalType('points'); }} style={{ padding: '10px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '11px' }}>{t.insightBtn}</button>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button onClick={() => { setActiveBook(book); setModalType('read'); }} style={{ padding: '8px', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '10px' }}>{t.readBtn}</button>
                    <a href={book.accessInfo?.pdf?.downloadLink || `https://www.google.com/search?q=${encodeURIComponent(book.volumeInfo.title + " filetype:pdf")}`} target="_blank" style={{ textDecoration: 'none', background: '#10b981', color: '#fff', padding: '8px', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold', textAlign: 'center' }}>{t.downloadBtn}</a>
                  </div>
                  <a href={`https://www.amazon.com/s?k=${encodeURIComponent(book.volumeInfo.title)}`} target="_blank" style={{ textDecoration: 'none', background: '#fbbf24', color: '#000', padding: '8px', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold', textAlign: 'center' }}>{t.buyBtn}</a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {filteredNews.map((paper, idx) => (
              <div key={idx} style={{ background: '#1a1b1e', padding: '30px', borderRadius: '20px', border: '1px solid #333', textAlign: 'center', transition: '0.3s' }}>
                <div style={{ fontSize: '50px', marginBottom: '15px' }}>{paper.logo}</div>
                <h3 style={{ margin: '0 0 5px 0' }}>{paper.title}</h3>
                <p style={{ color: '#3b82f6', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>{paper.lang} Edition</p>
                <a href={paper.link} target="_blank" style={{ display: 'block', marginTop: '20px', padding: '12px', background: '#fff', color: '#000', textDecoration: 'none', borderRadius: '12px', fontWeight: 'bold' }}>OPEN NEWSPAPER</a>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Reader Modal */}
      {activeBook && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.98)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', color: '#000', width: '100%', maxWidth: '900px', height: '90vh', borderRadius: '25px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px 40px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '20px', margin: 0 }}>{activeBook.volumeInfo.title}</h2>
              <button onClick={() => { setActiveBook(null); setModalType(null); }} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>{t.close}</button>
            </div>
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
              {modalType === 'read' ? (
                <iframe src={`https://books.google.com/books?id=${activeBook.id}&printsec=frontcover&output=embed`} style={{ width: '100%', height: '100%', border: 'none' }} />
              ) : (
                <div>
                  <h3 style={{ color: '#3b82f6', fontSize: '24px' }}>Deep Insights (DNA)</h3>
                  <p style={{ lineHeight: '1.8', fontSize: '18px', color: '#444' }}>{activeBook.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "") || "Content is being analyzed..."}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

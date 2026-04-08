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
  const [newsFilter, setNewsFilter] = useState('National');
  const [regionalLang, setRegionalLang] = useState('All');

  // 1. All Indian Regional Languages Included
  const indianLanguages = [
    { code: 'hi', name: 'Hindi (हिंदी)' }, { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)' },
    { code: 'mr', name: 'Marathi (मराठी)' }, { code: 'gu', name: 'Gujarati (ગુજરાતી)' },
    { code: 'ta', name: 'Tamil (தமிழ்)' }, { code: 'te', name: 'Telugu (తెలుగు)' },
    { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' }, { code: 'ml', name: 'Malayalam (മലയാളം)' },
    { code: 'bn', name: 'Bengali (বাংলা)' }, { code: 'as', name: 'Assamese (অসমীয়া)' },
    { code: 'or', name: 'Odia (ଓଡ଼ିଆ)' }, { code: 'ur', name: 'Urdu (اردو)' }
  ];

  const bookGenres = ["All", "Self-Help", "Business", "History", "Psychology", "Science"];

  const newspaperData = [
    { title: "The Times of India", cat: "National", lang: "English", link: "https://timesofindia.indiatimes.com/", logo: "🇮🇳" },
    { title: "The Hindu", cat: "National", lang: "English", link: "https://www.thehindu.com/", logo: "📰" },
    { title: "Dainik Jagran", cat: "National", lang: "Hindi", link: "https://www.jagran.com/", logo: "🇮🇳" },
    { title: "Lokmat", cat: "Regional", lang: "Marathi", link: "https://www.lokmat.com/", logo: "🚩" },
    { title: "Ajit", cat: "Regional", lang: "Punjabi", link: "https://www.ajitjalandhar.com/", logo: "🌾" },
    { title: "Daily Thanthi", cat: "Regional", lang: "Tamil", link: "https://www.dailythanthi.com/", logo: "⚓" },
    { title: "Anandabazar Patrika", cat: "Regional", lang: "Bengali", link: "https://www.anandabazar.com/", logo: "🎨" },
    { title: "NY Times", cat: "International", lang: "English", link: "https://www.nytimes.com/", logo: "🇺🇸" }
  ];

  const searchContent = async () => {
    setLoading(true);
    try {
      const q = (query || 'trending');
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&langRestrict=${lang}&maxResults=20`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { if(contentType === 'books') searchContent(); }, [lang]);

  const filteredNews = newspaperData.filter(paper => {
    if (newsFilter === 'Regional' && regionalLang !== 'All') return paper.lang === regionalLang;
    return paper.cat === newsFilter;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a120b', color: '#f5ebe0', fontFamily: "'Georgia', serif" }}>
      
      {/* Wooden Shelf Header */}
      <nav style={{ padding: '30px 5%', background: '#3c2a21', borderBottom: '10px solid #261a14', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', letterSpacing: '2px', color: '#e5e5e5', textShadow: '2px 2px #000' }}>
          BRIGHTWAY <span style={{color: '#d4a373'}}>LIBRARY</span>
        </h1>

        <div style={{ display: 'flex', gap: '20px' }}>
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ padding: '10px', borderRadius: '5px', background: '#1a120b', color: '#fff', border: '1px solid #d4a373' }}>
            <option value="en">English</option>
            {indianLanguages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
          </select>
          <div style={{ display: 'flex', background: '#261a14', borderRadius: '10px', padding: '5px' }}>
            <button onClick={() => setContentType('books')} style={{ padding: '10px 20px', background: contentType === 'books' ? '#d4a373' : 'transparent', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>BOOKS</button>
            <button onClick={() => setContentType('news')} style={{ padding: '10px 20px', background: contentType === 'news' ? '#d4a373' : 'transparent', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>NEWSSTAND</button>
          </div>
        </div>
      </nav>

      {/* Main Content View */}
      <main style={{ padding: '50px 5%' }}>
        {contentType === 'books' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '60px 40px' }}>
            {books.map((book) => (
              <div key={book.id} style={{ perspective: '1000px' }}>
                {/* 3D Book Visual */}
                <div style={{ 
                  width: '100%', aspectRatio: '2/3', position: 'relative', 
                  transformStyle: 'preserve-3d', transition: 'transform 0.5s',
                  boxShadow: '10px 10px 20px rgba(0,0,0,0.6)',
                  borderRadius: '2px 10px 10px 2px',
                  background: '#333'
                }} 
                onMouseEnter={e => e.currentTarget.style.transform = 'rotateY(-25deg)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'rotateY(0deg)'}
                >
                  <img src={book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150'} style={{ width: '100%', height: '100%', borderRadius: '2px 10px 10px 2px', objectFit: 'cover' }} alt="cover" />
                  {/* Book Spine Detail */}
                  <div style={{ position: 'absolute', left: 0, top: 0, width: '15px', height: '100%', background: 'linear-gradient(to right, rgba(0,0,0,0.5), transparent)', borderLeft: '2px solid rgba(255,255,255,0.2)' }}></div>
                </div>

                <h4 style={{ fontSize: '14px', textAlign: 'center', margin: '15px 0', height: '35px', overflow: 'hidden', color: '#f5ebe0' }}>{book.volumeInfo.title}</h4>
                
                {/* Features Restored */}
                <div style={{ display: 'grid', gap: '5px' }}>
                   <button onClick={() => { setActiveBook(book); setModalType('points'); }} style={{ padding: '8px', background: '#d4a373', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '3px' }}>💡 DNA</button>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                      <button onClick={() => { setActiveBook(book); setModalType('read'); }} style={{ padding: '6px', background: '#fff', border: 'none', fontWeight: 'bold', fontSize: '10px' }}>READ</button>
                      <a href={book.accessInfo?.pdf?.downloadLink || `https://www.google.com/search?q=${encodeURIComponent(book.volumeInfo.title + " filetype:pdf")}`} target="_blank" style={{ textDecoration: 'none', background: '#10b981', color: '#fff', padding: '6px', fontSize: '10px', textAlign: 'center', fontWeight: 'bold' }}>PDF</a>
                   </div>
                   <a href={`https://www.amazon.com/s?k=${encodeURIComponent(book.volumeInfo.title)}`} target="_blank" style={{ textDecoration: 'none', background: '#fbbf24', color: '#000', padding: '6px', fontSize: '10px', textAlign: 'center', fontWeight: 'bold' }}>AMAZON</a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', borderBottom: '2px solid #3c2a21', paddingBottom: '10px' }}>
              {['National', 'International', 'Regional'].map(f => (
                <button key={f} onClick={() => setNewsFilter(f)} style={{ background: 'none', border: 'none', color: newsFilter === f ? '#d4a373' : '#888', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px' }}>{f.toUpperCase()}</button>
              ))}
              {newsFilter === 'Regional' && (
                <select value={regionalLang} onChange={(e) => setRegionalLang(e.target.value)} style={{ padding: '5px', background: '#3c2a21', color: '#fff', border: '1px solid #d4a373' }}>
                  <option value="All">Select Language</option>
                  {indianLanguages.map(l => <option key={l.code} value={l.name.split(' ')[0]}>{l.name}</option>)}
                </select>
              )}
            </div>

            {/* Newspaper Table Interface */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '40px' }}>
              {filteredNews.map((paper, idx) => (
                <div key={idx} style={{ 
                  background: '#fff', color: '#000', padding: '20px', 
                  boxShadow: '5px 5px 15px rgba(0,0,0,0.3)',
                  border: '1px solid #ddd',
                  transform: `rotate(${idx % 2 === 0 ? '-1' : '1'}deg)`,
                  position: 'relative'
                }}>
                  <div style={{ borderBottom: '4px double #000', textAlign: 'center', paddingBottom: '10px', marginBottom: '15px' }}>
                    <h2 style={{ fontSize: '28px', margin: 0, fontFamily: "'Old Standard TT', serif", textTransform: 'uppercase' }}>{paper.title}</h2>
                    <span style={{ fontSize: '10px' }}>ESTABLISHED 2026 | DAILY EDITION | {paper.lang}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ flex: 1, fontSize: '12px', textAlign: 'justify', columnCount: 2, columnGap: '10px' }}>
                      LATEST NEWS: Breaking headlines from across the nation. Read the full digital replica of today's newspaper with all columns and editorials included...
                    </div>
                  </div>
                  <a href={paper.link} target="_blank" style={{ display: 'block', marginTop: '15px', padding: '10px', background: '#000', color: '#fff', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', fontSize: '12px' }}>READ FULL NEWSPAPER</a>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modal View */}
      {activeBook && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', color: '#000', width: '100%', maxWidth: '900px', height: '90vh', borderRadius: '5px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '15px 30px', background: '#f8f8f8', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
              <h2 style={{ margin: 0, fontSize: '18px' }}>{activeBook.volumeInfo.title}</h2>
              <button onClick={() => { setActiveBook(null); setModalType(null); }} style={{ background: '#000', color: '#fff', border: 'none', padding: '5px 20px', cursor: 'pointer' }}>CLOSE</button>
            </div>
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
              {modalType === 'read' ? (
                <iframe src={`https://books.google.com/books?id=${activeBook.id}&printsec=frontcover&output=embed`} style={{ width: '100%', height: '100%', border: 'none' }} />
              ) : (
                <div>
                  <h3 style={{ borderBottom: '2px solid #d4a373', paddingBottom: '10px' }}>Knowledge DNA</h3>
                  <p style={{ lineHeight: '1.8', fontSize: '17px' }}>{activeBook.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "") || "Analyzing text..."}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

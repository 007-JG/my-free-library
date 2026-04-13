"use client";
import React, { useState, useEffect } from 'react';
import Newsstand from './components/Newsstand'; 

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [lang, setLang] = useState('en');
  const [activeBook, setActiveBook] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [contentType, setContentType] = useState('books');

  const genres = ['Bestsellers', 'Fiction', 'Business', 'Technology', 'Science', 'History', 'Self-Help'];
  
  const allLanguages = [
    { group: "Global", langs: [
      { code: 'en', name: 'English 🇺🇸' }, { code: 'hi', name: 'Hindi 🇮🇳' }, 
      { code: 'fr', name: 'French 🇫🇷' }, { code: 'es', name: 'Spanish 🇪🇸' }, 
      { code: 'ja', name: 'Japanese 🇯🇵' }, { code: 'ar', name: 'Arabic 🇸🇦' }
    ]},
    { group: "Indian", langs: [
      { code: 'pa', name: 'Punjabi 🇮🇳' }, { code: 'mr', name: 'Marathi 🇮🇳' }, 
      { code: 'bn', name: 'Bengali 🇮🇳' }, { code: 'ta', name: 'Tamil 🇮🇳' }
    ]}
  ];

  const handleShare = async (book) => {
    const shareData = {
      title: book.volumeInfo.title,
      text: `Check out this book on The Brightway Library: ${book.volumeInfo.title}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
        alert('Link copied to clipboard!');
      }
    } catch (err) { console.log('Error sharing:', err); }
  };

  const getBookDNA = (book) => {
    const desc = book.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "") || "Detailed knowledge extraction in progress...";
    const points = desc.split(/[.!?]+\s+/).filter(s => s.length > 35).slice(0, 4);
    const labels = ["🎯 Core Logic", "🚀 Action Plan", "⚠️ Common Pitfall", "💎 Master Wisdom"];
    return points.map((p, i) => ({ label: labels[i] || "Insight", text: p }));
  };

  const searchContent = async (genreQuery = '') => {
    const finalQuery = genreQuery || query || 'trending';
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${finalQuery}&langRestrict=${lang}&maxResults=20`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { if(contentType === 'books') searchContent(); }, [lang, contentType]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0f10', color: '#f5ebe0', fontFamily: 'serif', position: 'relative' }}>
      
      {/* NAVIGATION */}
      <nav style={{ padding: '20px 5%', background: '#261a14', borderBottom: '5px solid #d4a373', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '30px' }}>📖</span>
          <h1 style={{ color: '#d4a373', margin: 0, fontSize: '24px', letterSpacing: '1px' }}>BRIGHTWAY <span style={{color:'#fff'}}>LIBRARY</span></h1>
        </div>
        
        <div style={{ display: 'flex', background: '#1a120b', borderRadius: '30px', padding: '5px', border: '1px solid #3c2a21' }}>
          <button onClick={() => setContentType('books')} style={{ padding: '10px 25px', borderRadius: '25px', border: 'none', background: contentType === 'books' ? '#d4a373' : 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>📚 BOOKS</button>
          <button onClick={() => setContentType('news')} style={{ padding: '10px 25px', borderRadius: '25px', border: 'none', background: contentType === 'news' ? '#d4a373' : 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>📰 NEWS</button>
        </div>

        <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ background: '#1a120b', color: '#fff', border: '1px solid #d4a373', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
          {allLanguages.map(g => (
            <optgroup label={g.group} key={g.group}>{g.langs.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}</optgroup>
          ))}
        </select>
      </nav>

      {/* MAIN CONTENT */}
      <main style={{ padding: '30px 5%', position: 'relative', zIndex: 10 }}>
        {contentType === 'books' ? (
          <div>
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '25px' }}>
                {genres.map(g => (
                  <button key={g} onClick={() => searchContent(g)} style={{ padding: '8px 15px', borderRadius: '20px', border: '1px solid #3c2a21', background: '#261a14', color: '#d4a373', cursor: 'pointer', fontSize: '13px' }}>{g}</button>
                ))}
              </div>
              <div style={{ display: 'inline-flex', background: '#261a14', borderRadius: '30px', padding: '5px', border: '1px solid #d4a373' }}>
                <input type="text" placeholder="Search Masterpieces..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && searchContent()}
                  style={{ background: 'transparent', border: 'none', color: '#fff', padding: '10px 20px', outline: 'none', width: '250px' }} />
                <button onClick={() => searchContent()} style={{ background: '#d4a373', border: 'none', borderRadius: '25px', padding: '10px 25px', fontWeight: 'bold', cursor: 'pointer' }}>SEARCH</button>
              </div>
              <div style={{ marginTop: '20px', fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                Trending: Free AI Book DNA • Digital Newsstand • Hindi & English E-Papers • Global Knowledge Hub
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '40px 25px' }}>
              {books.map(book => (
                <div key={book.id} style={{ textAlign: 'center' }}>
                  <div style={{ width: '100%', aspectRatio: '2/3', position: 'relative', boxShadow: '0 15px 35px rgba(0,0,0,0.7)', borderRadius: '2px 10px 10px 2px', overflow: 'hidden', borderLeft: '5px solid #333' }}>
                    <img src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="book" />
                  </div>
                  <h4 style={{ fontSize: '14px', margin: '15px 0 10px', height: '40px', overflow: 'hidden' }}>{book.volumeInfo.title}</h4>
                  
                  {/* BUTTON GRID */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                    <button onClick={() => { setActiveBook(book); setModalType('dna'); }} style={{ padding: '8px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', fontSize: '10px' }}>✨ DNA</button>
                    <button onClick={() => { setActiveBook(book); setModalType('read'); }} style={{ padding: '8px', background: '#fff', color: '#000', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', fontSize: '10px' }}>📖 READ</button>
                    
                    {/* AMAZON AFFILIATE LINK */}
                    <a href={`https://www.amazon.in/s?k=${encodeURIComponent(book.volumeInfo.title)}&tag=thebrightway0-21`} target="_blank" style={{ textDecoration: 'none', padding: '8px', background: '#ff9900', color: '#000', borderRadius: '5px', fontWeight: 'bold', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🛒 BUY</a>
                    
                    <a href={`https://www.google.com/search?q=${encodeURIComponent(book.volumeInfo.title + " filetype:pdf")}`} target="_blank" style={{ textDecoration: 'none', padding: '8px', background: '#10b981', color: '#fff', borderRadius: '5px', fontWeight: 'bold', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📄 PDF</a>
                    
                    <button onClick={() => handleShare(book)} style={{ gridColumn: 'span 2', padding: '8px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', fontSize: '10px' }}>🔗 SHARE WITH FRIENDS</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Newsstand />
        )}
      </main>

      {/* FOOTER WITH ABOUT & PRIVACY LINKS */}
      <footer style={{ padding: '50px 5%', background: '#1a120b', borderTop: '1px solid #3c2a21', marginTop: '50px', textAlign: 'center', position: 'relative', zIndex: 5 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '30px', textAlign: 'left' }}>
          <div>
            <h3 style={{ color: '#d4a373' }}>About The Brightway</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#aaa' }}>The Brightway is a next-generation digital library providing AI-powered book insights and a global newsstand.</p>
          </div>
          <div>
            <h3 style={{ color: '#d4a373' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', color: '#aaa' }}>
              <li style={{ marginBottom: '10px' }}>✓ AI Knowledge Extraction</li>
              <li style={{ marginBottom: '10px' }}>✓ International Newspapers</li>
              <li style={{ marginBottom: '10px' }}>
                <a href="/about" style={{ color: '#aaa', textDecoration: 'none' }}>✓ About Us</a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="/privacy" style={{ color: '#aaa', textDecoration: 'none' }}>✓ Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 style={{ color: '#d4a373' }}>Contact & Support</h3>
            <p style={{ fontSize: '14px', color: '#aaa' }}>Reach out: <strong>support@thebrightway.vercel.app</strong></p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #261a14', paddingTop: '20px', fontSize: '12px', color: '#555' }}>
          © 2026 THE BRIGHTWAY LIBRARY | ALL RIGHTS RESERVED
        </div>
      </footer>

      {/* MODAL SYSTEM */}
      {activeBook && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.96)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ background: '#fff', color: '#000', width: '100%', maxWidth: '850px', height: '85vh', borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', background: '#f8f9fa', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '18px', margin: 0 }}>{activeBook.volumeInfo.title}</h2>
              <button onClick={() => { setActiveBook(null); setModalType(null); }} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>✕ CLOSE</button>
            </div>
            <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
              {modalType === 'dna' ? (
                <div style={{ display: 'grid', gap: '20px' }}>
                  <div style={{ textAlign: 'center', color: '#3b82f6', fontSize: '20px', fontWeight: 'bold' }}>💡 AI KNOWLEDGE EXTRACTION</div>
                  {getBookDNA(activeBook).map((item, i) => (
                    <div key={i} style={{ padding: '20px', background: '#f0f7ff', borderRadius: '12px', borderLeft: '6px solid #3b82f6' }}>
                      <strong style={{ color: '#3b82f6', display: 'block', marginBottom: '5px' }}>{item.label}</strong>
                      <p style={{ margin: 0, lineHeight: '1.6' }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <iframe src={`https://books.google.com/books?id=${activeBook.id}&printsec=frontcover&output=embed`} style={{ width: '100%', height: '100%', border: 'none' }} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

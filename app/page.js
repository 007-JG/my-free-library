"use client";

import React, { useState, useEffect } from 'react';

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en');
  const [activeBook, setActiveBook] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [contentType, setContentType] = useState('books'); // 'books' or 'news'
  const [genre, setGenre] = useState('All');

  const genres = ["All", "Self-Help", "Fiction", "Business", "Science", "History", "Biography"];
  
  const newspapers = [
    { id: 1, title: "The Times of India", editor: "Vineet Jain", link: "https://timesofindia.indiatimes.com/", logo: "🇮🇳" },
    { id: 2, title: "The Hindu", editor: "Suresh Nambath", link: "https://www.thehindu.com/", logo: "📰" },
    { id: 3, title: "The New York Times", editor: "Joseph Kahn", link: "https://www.nytimes.com/", logo: "🇺🇸" },
    { id: 4, title: "Dainik Jagran", editor: "Sanjay Gupta", link: "https://www.jagran.com/", logo: "🇮🇳" },
    { id: 5, title: "The Guardian", editor: "Katharine Viner", link: "https://www.theguardian.com/", logo: "🇬🇧" }
  ];

  const languages = [
    { code: 'en', name: 'English' }, { code: 'hi', name: 'Hindi' }, { code: 'pa', name: 'Punjabi' },
    { code: 'ur', name: 'Urdu' }
  ];

  const searchContent = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const searchQuery = genre === 'All' ? query : `${query} subject:${genre}`;
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery || 'trending'}&langRestrict=${lang}&maxResults=20`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  // Initial load
  useEffect(() => { searchContent(); }, [genre, lang]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0f0f', color: '#fff', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      
      {/* Movie-Style Navbar */}
      <nav style={{ padding: '20px 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.8)', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 style={{ color: '#E50914', fontSize: '28px', fontWeight: 'bold', margin: 0 }}>BRIGHTWAY <span style={{color:'#fff'}}>LIBRARY</span></h1>
        
        <div style={{ display: 'flex', gap: '20px', fontWeight: 'bold' }}>
          <span onClick={() => setContentType('books')} style={{ cursor: 'pointer', color: contentType === 'books' ? '#E50914' : '#fff' }}>Books</span>
          <span onClick={() => setContentType('news')} style={{ cursor: 'pointer', color: contentType === 'news' ? '#E50914' : '#fff' }}>Newspapers</span>
        </div>

        <form onSubmit={searchContent} style={{ display: 'flex', background: '#333', borderRadius: '4px', overflow: 'hidden' }}>
          <input 
            type="text" placeholder="Search title..." value={query} onChange={(e) => setQuery(e.target.value)}
            style={{ padding: '8px 15px', border: 'none', background: 'transparent', color: '#fff', outline: 'none' }}
          />
          <button style={{ padding: '8px 15px', background: 'transparent', border: 'none', cursor: 'pointer' }}>🔍</button>
        </form>
      </nav>

      {/* Genre Selector (Like Movie Categories) */}
      {contentType === 'books' && (
        <div style={{ padding: '20px 5%', display: 'flex', gap: '10px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {genres.map(g => (
            <button 
              key={g} onClick={() => setGenre(g)}
              style={{ padding: '8px 20px', borderRadius: '20px', border: '1px solid #444', background: genre === g ? '#fff' : '#000', color: genre === g ? '#000' : '#fff', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {g}
            </button>
          ))}
        </div>
      )}

      {/* Content Sections */}
      <main style={{ padding: '20px 5%' }}>
        {contentType === 'books' ? (
          <>
            <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>{genre} Books for You</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '25px' }}>
              {books.map((book) => (
                <div key={book.id} style={{ transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                  <img 
                    src={book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150'} 
                    style={{ width: '100%', borderRadius: '8px', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }} 
                    alt="cover" 
                  />
                  <h4 style={{ fontSize: '14px', marginTop: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{book.volumeInfo.title}</h4>
                  <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                    <button onClick={() => { setActiveBook(book); setModalType('points'); }} style={{ flex: 1, fontSize: '10px', padding: '5px', background: '#E50914', color: '#fff', border: 'none', borderRadius: '3px', fontWeight: 'bold' }}>DNA</button>
                    <button onClick={() => { setActiveBook(book); setModalType('read'); }} style={{ flex: 1, fontSize: '10px', padding: '5px', background: '#fff', color: '#000', border: 'none', borderRadius: '3px', fontWeight: 'bold' }}>READ</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>World's Leading Newspapers</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {newspapers.map((paper) => (
                <div key={paper.id} style={{ background: '#1a1a1a', padding: '20px', borderRadius: '10px', border: '1px solid #333' }}>
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>{paper.logo}</div>
                  <h3 style={{ margin: '0 0 5px 0' }}>{paper.title}</h3>
                  <p style={{ fontSize: '12px', color: '#aaa', margin: '0 0 15px 0' }}>Editor: <strong>{paper.editor}</strong></p>
                  <a href={paper.link} target="_blank" style={{ display: 'block', textAlign: 'center', padding: '10px', background: '#fff', color: '#000', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>READ TODAY'S EDITION</a>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Movie-Style Modal */}
      {activeBook && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#181818', width: '90%', maxWidth: '800px', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between' }}>
              <h2 style={{ margin: 0 }}>{activeBook.volumeInfo.title}</h2>
              <button onClick={() => { setActiveBook(null); setModalType(null); }} style={{ background: 'none', color: '#fff', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ padding: '30px', maxHeight: '70vh', overflowY: 'auto' }}>
              {modalType === 'read' ? (
                <iframe src={`https://books.google.com/books?id=${activeBook.id}&printsec=frontcover&output=embed`} style={{ width: '100%', height: '500px', border: 'none' }} />
              ) : (
                <div>
                  <h3 style={{color: '#E50914'}}>Book Insights</h3>
                  <p style={{ lineHeight: '1.8', fontSize: '16px' }}>{activeBook.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "") || "Summary loading..."}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

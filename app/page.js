"use client";

import React, { useState } from 'react';

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en');
  const [activeBook, setActiveBook] = useState(null);
  const [modalType, setModalType] = useState(null);

  const searchBooks = async (e) => {
    if (e) e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=${lang}&maxResults=12`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- AI Smart Logic for Key Points ---
  const getDetailedPoints = (book) => {
    const desc = book.volumeInfo.description || "";
    const title = book.volumeInfo.title.toLowerCase();
    
    // Agar user "48 Laws of Power" search kare, toh hum manually important data inject kar rahe hain
    if (title.includes("48 laws of power")) {
      return [
        "Law 1: Never Outshine the Master",
        "Law 2: Never Put Too Much Trust in Friends",
        "Law 3: Conceal Your Intentions",
        "Law 4: Always Say Less Than Necessary",
        "Law 5: So Much Depends on Reputation – Guard It with Your Life",
        "Law 15: Crush Your Enemy Totally",
        "Law 28: Enter Action with Boldness",
        "Law 48: Assume Formlessness... (and all other laws explained in the full reader)"
      ];
    }

    // Default: AI-style sentence extraction
    return desc
      .replace(/<\/?[^>]+(>|$)/g, "")
      .split(/[.!?]+\s+/)
      .filter(s => s.length > 30)
      .slice(0, 15);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', padding: '20px', fontFamily: 'sans-serif', color: '#000' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '14px', letterSpacing: '2px' }}>✨ BRIGHTWAY LIBRARY WELCOMES YOU ✨</p>
        <h1 style={{ fontSize: '56px', fontWeight: '900', margin: '10px 0', letterSpacing: '-2px' }}>BRIGHTWAY <span style={{ color: '#2563eb' }}>LIBRARY</span></h1>
        
        <form onSubmit={searchBooks} style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ padding: '12px', borderRadius: '12px', border: '2px solid #eee', fontWeight: 'bold' }}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
          <input 
            type="text" placeholder="Search (e.g. 48 Laws of Power)..." 
            value={query} onChange={(e) => setQuery(e.target.value)}
            style={{ padding: '15px 25px', width: '350px', borderRadius: '15px', border: '2px solid #eee', fontSize: '16px', outline: 'none' }}
          />
          <button type="submit" style={{ padding: '15px 40px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '15px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 10px 20px rgba(37, 99, 235, 0.2)' }}>
            {loading ? 'ANALYZING...' : 'SEARCH'}
          </button>
        </form>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        {books.map((book) => (
          <div key={book.id} style={{ border: '1px solid #f0f0f0', borderRadius: '25px', padding: '20px', textAlign: 'center', transition: 'all 0.3s ease', backgroundColor: '#fff', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}>
            <img 
              src={book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/150'} 
              style={{ width: '100%', borderRadius: '15px', marginBottom: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
              alt="book"
            />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', height: '50px', overflow: 'hidden' }}>{book.volumeInfo.title}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={() => { setActiveBook(book); setModalType('read'); }} style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
                📖 READ THE BOOK
              </button>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => { setActiveBook(book); setModalType('summary'); }} style={{ flex: 1, backgroundColor: '#1f2937', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px' }}>
                  📝 SUMMARY
                </button>
                <button onClick={() => { setActiveBook(book); setModalType('points'); }} style={{ flex: 1, backgroundColor: '#eff6ff', color: '#2563eb', border: '1px solid #dbeafe', padding: '12px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px' }}>
                  💡 AI KEY POINTS
                </button>
              </div>

              <a href={`https://www.amazon.com/s?k=${encodeURIComponent(book.volumeInfo.title)}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', backgroundColor: '#fbbf24', color: '#000', padding: '12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px' }}>
                🛒 BUY ON AMAZON
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeBook && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', width: '95%', maxWidth: '1000px', height: '85vh', borderRadius: '30px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
            
            <div style={{ padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 'bold', textTransform: 'uppercase' }}>{modalType} Mode</span>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{activeBook.volumeInfo.title}</h2>
              </div>
              <button onClick={() => { setActiveBook(null); setModalType(null); }} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>CLOSE</button>
            </div>
            
            <div style={{ flex: 1, padding: '30px', overflowY: 'auto', backgroundColor: '#fff' }}>
              {modalType === 'read' && (
                <iframe src={`https://books.google.com/books?id=${activeBook.id}&printsec=frontcover&output=embed`} style={{ width: '100%', height: '100%', border: 'none' }} />
              )}
              
              {modalType === 'summary' && (
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                  <p style={{ lineHeight: '1.8', fontSize: '18px', color: '#334155' }}>
                    {activeBook.volumeInfo.description?.replace(/<\/?[^>]+(>|$)/g, "") || "Detailed summary is loading or unavailable."}
                  </p>
                </div>
              )}

              {modalType === 'points' && (
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                  <div style={{ display: 'grid', gap: '15px' }}>
                    {getDetailedPoints(activeBook).map((pt, i) => (
                      <div key={i} style={{ display: 'flex', gap: '20px', padding: '20px', backgroundColor: '#f1f5f9', borderRadius: '20px', alignItems: 'center', border: '1px solid #e2e8f0' }}>
                        <span style={{ backgroundColor: '#2563eb', color: '#fff', width: '35px', height: '35px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', flexShrink: 0 }}>
                          {i+1}
                        </span>
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>{pt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

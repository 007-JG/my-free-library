"use client";
import React, { useState, useEffect } from 'react';
// SAFE PATH: ./ use karne se error nahi aayega
import Newsstand from './components/Newsstand'; 

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [lang, setLang] = useState('en');
  const [contentType, setContentType] = useState('books');

  const searchContent = async () => {
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query || 'trending'}&langRestrict=${lang}&maxResults=12`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { if(contentType === 'books') searchContent(); }, [lang, contentType]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0f10', color: '#f5ebe0' }}>
      <nav style={{ padding: '20px 5%', background: '#261a14', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid #d4a373' }}>
        <h1 style={{ color: '#d4a373', margin: 0 }}>BRIGHTWAY LIBRARY</h1>
        
        <div style={{ display: 'flex', background: '#1a120b', borderRadius: '30px', padding: '5px', border: '1px solid #3c2a21' }}>
          <button onClick={() => setContentType('books')} style={{ padding: '8px 20px', borderRadius: '25px', border: 'none', background: contentType === 'books' ? '#d4a373' : 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>BOOKS</button>
          <button onClick={() => setContentType('news')} style={{ padding: '8px 20px', borderRadius: '25px', border: 'none', background: contentType === 'news' ? '#d4a373' : 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>NEWS</button>
        </div>
      </nav>

      <main style={{ padding: '40px 5%' }}>
        {contentType === 'books' ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <input type="text" placeholder="Search books..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && searchContent()}
                style={{ width: '250px', padding: '10px', borderRadius: '20px 0 0 20px', border: '1px solid #d4a373', background: '#261a14', color: '#fff' }} />
              <button onClick={searchContent} style={{ padding: '10px 20px', borderRadius: '0 20px 20px 0', border: 'none', background: '#d4a373', fontWeight: 'bold', cursor: 'pointer' }}>GO</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '40px' }}>
              {books.map(book => (
                <div key={book.id} style={{ textAlign: 'center' }}>
                  <img src={book.volumeInfo.imageLinks?.thumbnail} style={{ width: '100%', borderRadius: '10px', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }} />
                  <h4 style={{ fontSize: '14px', marginTop: '15px' }}>{book.volumeInfo.title}</h4>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Newsstand />
        )}
      </main>
    </div>
  );
}

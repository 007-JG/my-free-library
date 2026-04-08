"use client";
import React, { useState, useEffect } from 'react';
// @ path use karne se Vercel ko file dhoondne mein aasani hoti hai
import Newsstand from '@/app/components/Newsstand'; 

export default function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [lang, setLang] = useState('en');
  const [activeBook, setActiveBook] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [contentType, setContentType] = useState('books');

  const allLanguages = [
    { group: "Global", langs: [{ code: 'en', name: 'English 🇺🇸' }, { code: 'hi', name: 'Hindi 🇮🇳' }, { code: 'fr', name: 'French 🇫🇷' }, { code: 'es', name: 'Spanish 🇪🇸' }] },
    { group: "Indian", langs: [{ code: 'pa', name: 'Punjabi 🇮🇳' }, { code: 'mr', name: 'Marathi 🇮🇳' }, { code: 'bn', name: 'Bengali 🇮🇳' }] }
  ];

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
      <nav style={{ padding: '20px 5%', background: '#261a14', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#d4a373', margin: 0 }}>BRIGHTWAY LIBRARY</h1>
        <div style={{ display: 'flex', gap: '10px', background: '#1a120b', padding: '5px', borderRadius: '30px' }}>
          <button onClick={() => setContentType('books')} style={{ padding: '8px 20px', borderRadius: '25px', border: 'none', background: contentType === 'books' ? '#d4a373' : 'transparent', color: '#fff', cursor: 'pointer' }}>BOOKS</button>
          <button onClick={() => setContentType('news')} style={{ padding: '8px 20px', borderRadius: '25px', border: 'none', background: contentType === 'news' ? '#d4a373' : 'transparent', color: '#fff', cursor: 'pointer' }}>NEWSSTAND</button>
        </div>
        <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ background: '#1a120b', color: '#fff', padding: '8px', borderRadius: '5px' }}>
          {allLanguages.map(g => (
            <optgroup label={g.group} key={g.group}>{g.langs.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}</optgroup>
          ))}
        </select>
      </nav>

      <main style={{ padding: '40px 5%' }}>
        {contentType === 'books' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '40px' }}>
            {books.map(book => (
              <div key={book.id} style={{ textAlign: 'center' }}>
                <img src={book.volumeInfo.imageLinks?.thumbnail} style={{ width: '100%', borderRadius: '10px', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }} />
                <h4 style={{ fontSize: '14px', marginTop: '15px' }}>{book.volumeInfo.title}</h4>
              </div>
            ))}
          </div>
        ) : (
          <Newsstand />
        )}
      </main>
    </div>
  );
}

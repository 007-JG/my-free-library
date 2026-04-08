"use client";
import React, { useState } from 'react';

const indianLanguages = [
  { code: 'hi', name: 'Hindi' }, { code: 'pa', name: 'Punjabi' },
  { code: 'mr', name: 'Marathi' }, { code: 'gu', name: 'Gujarati' },
  { code: 'ta', name: 'Tamil' }, { code: 'bn', name: 'Bengali' }
];

const newspaperData = [
  { title: "The Times of India", cat: "National", lang: "English", link: "https://timesofindia.indiatimes.com/" },
  { title: "The Hindu", cat: "National", lang: "English", link: "https://www.thehindu.com/" },
  { title: "Dainik Jagran", cat: "National", lang: "Hindi", link: "https://www.jagran.com/" },
  { title: "Lokmat", cat: "Regional", lang: "Marathi", link: "https://www.lokmat.com/" },
  { title: "Ajit", cat: "Regional", lang: "Punjabi", link: "https://www.ajitjalandhar.com/" }
];

export default function Newsstand() {
  const [newsFilter, setNewsFilter] = useState('National');
  const [regionalLang, setRegionalLang] = useState('All');

  const filteredNews = newspaperData.filter(paper => {
    if (newsFilter === 'Regional' && regionalLang !== 'All') return paper.lang === regionalLang;
    return paper.cat === newsFilter;
  });

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', borderBottom: '1px solid #444', paddingBottom: '10px' }}>
        {['National', 'International', 'Regional'].map(f => (
          <button key={f} onClick={() => setNewsFilter(f)} style={{ background: 'none', border: 'none', color: newsFilter === f ? '#d4a373' : '#888', cursor: 'pointer', fontWeight: 'bold' }}>
            {f}
          </button>
        ))}
        {newsFilter === 'Regional' && (
          <select onChange={(e) => setRegionalLang(e.target.value)} style={{ background: '#261a14', color: '#fff', border: '1px solid #d4a373' }}>
            <option value="All">All Regional</option>
            {indianLanguages.map(l => <option key={l.code} value={l.name}>{l.name}</option>)}
          </select>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {filteredNews.map((paper, i) => (
          <div key={i} style={{ background: '#1a120b', padding: '20px', borderRadius: '10px', border: '1px solid #3c2a21', textAlign: 'center' }}>
            <h3 style={{ color: '#d4a373' }}>{paper.title}</h3>
            <p style={{ fontSize: '12px' }}>{paper.lang} Edition</p>
            <a href={paper.link} target="_blank" style={{ display: 'block', marginTop: '10px', padding: '10px', background: '#fff', color: '#000', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>OPEN NEWSPAPER</a>
          </div>
        ))}
      </div>
    </div>
  );
}

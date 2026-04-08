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
  { title: "Ajit", cat: "Regional", lang: "Punjabi", link: "https://www.ajitjalandhar.com/" },
  { title: "NY Times", cat: "International", lang: "English", link: "https://www.nytimes.com/" }
];

export default function Newsstand() {
  const [newsFilter, setNewsFilter] = useState('National');
  const [regionalLang, setRegionalLang] = useState('All');

  const filteredNews = newspaperData.filter(paper => {
    if (newsFilter === 'Regional' && regionalLang !== 'All') return paper.lang === regionalLang;
    return paper.cat === newsFilter;
  });

  return (
    <section>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '2px solid #3c2a21', paddingBottom: '10px' }}>
        {['National', 'International', 'Regional'].map(f => (
          <button key={f} onClick={() => setNewsFilter(f)} 
            style={{ background: 'none', border: 'none', color: newsFilter === f ? '#d4a373' : '#888', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px' }}>
            {f.toUpperCase()}
          </button>
        ))}
        {newsFilter === 'Regional' && (
          <select value={regionalLang} onChange={(e) => setRegionalLang(e.target.value)} 
            style={{ padding: '5px', background: '#3c2a21', color: '#fff', border: '1px solid #d4a373', borderRadius: '5px' }}>
            <option value="All">All Languages</option>
            {indianLanguages.map(l => <option key={l.code} value={l.name}>{l.name}</option>)}
          </select>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
        {filteredNews.map((paper, idx) => (
          <div key={idx} style={{ background: '#fff', color: '#000', padding: '20px', boxShadow: '5px 10px 20px rgba(0,0,0,0.3)', border: '1px solid #ddd' }}>
            <h2 style={{ fontSize: '22px', borderBottom: '2px solid #000', paddingBottom: '5px', fontFamily: 'serif' }}>{paper.title}</h2>
            <p style={{ fontSize: '12px', color: '#666' }}>LATEST EDITION | {paper.lang}</p>
            <a href={paper.link} target="_blank" style={{ display: 'block', marginTop: '15px', padding: '10px', background: '#000', color: '#fff', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>READ NOW</a>
          </div>
        ))}
      </div>
    </section>
  );
}

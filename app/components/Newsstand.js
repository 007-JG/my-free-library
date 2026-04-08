"use client";
import React, { useState } from 'react';

const newspaperData = [
  { title: "The Times of India", cat: "National", lang: "English", link: "https://timesofindia.indiatimes.com/" },
  { title: "The Hindu", cat: "National", lang: "English", link: "https://www.thehindu.com/" },
  { title: "Dainik Jagran", cat: "National", lang: "Hindi", link: "https://www.jagran.com/" },
  { title: "Lokmat", cat: "Regional", lang: "Marathi", link: "https://www.lokmat.com/" },
  { title: "Ajit", cat: "Regional", lang: "Punjabi", link: "https://www.ajitjalandhar.com/" }
];

export default function Newsstand() {
  const [filter, setFilter] = useState('National');

  const filtered = newspaperData.filter(p => p.cat === filter);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', borderBottom: '2px solid #3c2a21' }}>
        {['National', 'Regional'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ background: 'none', border: 'none', color: filter === f ? '#d4a373' : '#888', cursor: 'pointer', fontWeight: 'bold', fontSize: '18px', paddingBottom: '10px' }}>
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filtered.map((paper, i) => (
          <div key={i} style={{ background: '#fff', color: '#000', padding: '20px', boxShadow: '5px 5px 15px rgba(0,0,0,0.3)', border: '1px solid #ddd' }}>
            <h3 style={{ margin: '0 0 10px 0', fontFamily: 'serif' }}>{paper.title}</h3>
            <p style={{ fontSize: '12px', color: '#555' }}>{paper.lang} Edition</p>
            <a href={paper.link} target="_blank" style={{ display: 'inline-block', marginTop: '15px', padding: '8px 15px', background: '#000', color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px' }}>READ E-PAPER</a>
          </div>
        ))}
      </div>
    </div>
  );
}
